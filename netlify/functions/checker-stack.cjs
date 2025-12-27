const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Severity order for sorting (worst first)
const SEVERITY_ORDER = { 'avoid': 0, 'caution': 1, 'monitor': 2, 'info': 3, 'none': 4 };

// Normalize pair to ensure consistent ordering
function normalizePair(a, b) {
  return a < b ? [a, b] : [b, a];
}

// Generate all unique pairs from an array
function generatePairs(items) {
  const pairs = [];
  const unique = [...new Set(items)]; // Remove duplicates

  for (let i = 0; i < unique.length; i++) {
    for (let j = i + 1; j < unique.length; j++) {
      const [a, b] = normalizePair(unique[i], unique[j]);
      pairs.push({ a, b });
    }
  }

  return pairs;
}

// Determine pair type based on substance types
function getPairType(aType, bType) {
  if (aType === 'supplement' && bType === 'supplement') {
    return 'supplement-supplement';
  } else if ((aType === 'supplement' && bType === 'drug') || (aType === 'drug' && bType === 'supplement')) {
    return 'supplement-drug';
  } else if (aType === 'drug' && bType === 'drug') {
    return 'drug-drug';
  }
  return 'unknown';
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const items = body.items || [];
    const mode = body.mode || 'supplements-drugs'; // Default to supplements-drugs mode

    if (!Array.isArray(items) || items.length < 2) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Please provide at least 2 substance IDs in the items array' })
      };
    }

    console.log('[CheckStack] Mode:', mode);
    console.log('[CheckStack] Checking', items.length, 'substances');

    // Fetch substance types for all items
    const { data: substances, error: substanceError } = await supabase
      .from('checker_substances')
      .select('substance_id, type')
      .in('substance_id', items);

    if (substanceError) {
      console.error('[CheckStack] Error fetching substances:', substanceError);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to fetch substance types' })
      };
    }

    // Create type map
    const typeMap = {};
    substances.forEach(sub => {
      typeMap[sub.substance_id] = sub.type;
    });

    // Generate all pairs
    const allPairs = generatePairs(items);
    console.log('[CheckStack] Generated', allPairs.length, 'total pairs');

    // Filter pairs based on mode
    const filteredPairs = allPairs.filter(pair => {
      const aType = typeMap[pair.a];
      const bType = typeMap[pair.b];
      const pairType = getPairType(aType, bType);

      // Never check drug-drug pairs
      if (pairType === 'drug-drug') {
        return false;
      }

      // Filter based on mode
      if (mode === 'supplements-drugs') {
        return pairType === 'supplement-drug';
      } else if (mode === 'supplements-supplements') {
        return pairType === 'supplement-supplement';
      }

      return false;
    });

    console.log('[CheckStack] Filtered to', filteredPairs.length, 'pairs for mode:', mode);

    if (filteredPairs.length === 0) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: { total_pairs: 0, by_severity: {}, worst_severity: 'none' },
          results: []
        })
      };
    }

    // Query all interactions for these pairs
    const results = [];
    const severityCounts = { avoid: 0, caution: 0, monitor: 0, info: 0, none: 0 };
    let worstSeverity = 'none';

    for (const pair of filteredPairs) {
      const { data, error } = await supabase
        .from('checker_interactions')
        .select('*')
        .eq('a_substance_id', pair.a)
        .eq('b_substance_id', pair.b)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('[CheckStack] Query error for pair', pair, ':', error);
        continue;
      }

      const aType = typeMap[pair.a];
      const bType = typeMap[pair.b];

      if (data) {
        // Found interaction
        results.push({
          a_substance_id: pair.a,
          b_substance_id: pair.b,
          found: true,
          interaction: data,
          a_type: aType,
          b_type: bType
        });

        severityCounts[data.severity]++;

        // Update worst severity
        if (SEVERITY_ORDER[data.severity] < SEVERITY_ORDER[worstSeverity]) {
          worstSeverity = data.severity;
        }
      } else {
        // No interaction found
        results.push({
          a_substance_id: pair.a,
          b_substance_id: pair.b,
          found: false,
          interaction: null,
          a_type: aType,
          b_type: bType
        });

        severityCounts.none++;
      }
    }

    // Sort results by severity (worst first)
    results.sort((a, b) => {
      const aSev = a.found ? a.interaction.severity : 'none';
      const bSev = b.found ? b.interaction.severity : 'none';
      return SEVERITY_ORDER[aSev] - SEVERITY_ORDER[bSev];
    });

    console.log('[CheckStack] Results:', {
      total_pairs: filteredPairs.length,
      worst_severity: worstSeverity,
      by_severity: severityCounts
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: {
          total_pairs: filteredPairs.length,
          worst_severity: worstSeverity,
          by_severity: severityCounts
        },
        results
      })
    };
  } catch (err) {
    console.error('[CheckStack] Error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: err.message })
    };
  }
};
