const { createClient } = require('@supabase/supabase-js');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const { import_batch, dry_run = false } = JSON.parse(event.body || '{}');

    if (!import_batch) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'import_batch is required' })
      };
    }

    // Fetch unprocessed stage records
    const { data: stageRecords, error: stageError } = await supabase
      .from('stage_interactions')
      .select('*')
      .eq('import_batch', import_batch)
      .eq('processed', false);

    if (stageError) {
      console.error('Stage fetch error:', stageError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to fetch staged records' })
      };
    }

    if (!stageRecords || stageRecords.length === 0) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          message: 'No unprocessed records found',
          matched: 0,
          unmatched_drugs: [],
          unmatched_supplements: []
        })
      };
    }

    // Get all unique substance names
    const drugNames = [...new Set(stageRecords.map(r => r.med_name.toLowerCase().trim()))];
    const suppNames = [...new Set(stageRecords.map(r => r.supplement_name.toLowerCase().trim()))];

    // Fetch substances from checker_substances
    const { data: allSubstances, error: substError } = await supabase
      .from('checker_substances')
      .select('substance_id, type, display_name, canonical_name, aliases')
      .eq('is_active', true);

    if (substError) {
      console.error('Substance fetch error:', substError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to fetch substances' })
      };
    }

    // Build lookup maps
    const drugMap = new Map();
    const suppMap = new Map();

    allSubstances.forEach(sub => {
      const namesToCheck = [
        sub.display_name.toLowerCase().trim(),
        ...(sub.aliases || []).map(a => a.toLowerCase().trim())
      ];
      if (sub.canonical_name) {
        namesToCheck.push(sub.canonical_name.toLowerCase().trim());
      }

      namesToCheck.forEach(name => {
        if (sub.type === 'drug') {
          drugMap.set(name, sub.substance_id);
        } else if (sub.type === 'supplement') {
          suppMap.set(name, sub.substance_id);
        }
      });
    });

    // Find unmatched
    const unmatchedDrugs = drugNames.filter(name => !drugMap.has(name));
    const unmatchedSupps = suppNames.filter(name => !suppMap.has(name));

    if (unmatchedDrugs.length > 0 || unmatchedSupps.length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Unmatched substances found. Cannot proceed with import.',
          unmatched_drugs: unmatchedDrugs,
          unmatched_supplements: unmatchedSupps
        })
      };
    }

    // All matched, proceed to upsert
    const interactionsToUpsert = [];
    const processed = [];

    for (const record of stageRecords) {
      const drugId = drugMap.get(record.med_name.toLowerCase().trim());
      const suppId = suppMap.get(record.supplement_name.toLowerCase().trim());

      if (!drugId || !suppId) continue;

      // Ensure ordered pair
      const [aId, bId] = drugId < suppId ? [drugId, suppId] : [suppId, drugId];
      const interactionId = `${aId}_${bId}`;

      // Parse citations from pipe-separated string to jsonb array
      const citationUrls = record.citations.split('|').map(url => url.trim()).filter(Boolean);
      const citationsJson = citationUrls.map(url => ({ url }));

      interactionsToUpsert.push({
        interaction_id: interactionId,
        a_substance_id: aId,
        b_substance_id: bId,
        interaction_type: 'drug_supplement',
        severity: record.severity,
        summary_short: record.summary_short,
        clinical_effect: record.clinical_effect,
        mechanism: record.mechanism,
        management: record.management,
        evidence_grade: record.evidence_grade,
        confidence: record.confidence.toString(),
        citations: citationsJson,
        updated_at: new Date().toISOString()
      });

      processed.push(record.stage_id);
    }

    if (dry_run) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          dry_run: true,
          would_upsert: interactionsToUpsert.length,
          unmatched_drugs: [],
          unmatched_supplements: [],
          preview: interactionsToUpsert.slice(0, 5)
        })
      };
    }

    // Dedupe and upsert with priority logic
    // Group by interaction_id and pick best record
    const grouped = new Map();
    for (const interaction of interactionsToUpsert) {
      const key = interaction.interaction_id;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(interaction);
    }

    const severityRank = { avoid: 3, caution: 2, monitor: 1 };
    const evidenceRank = { A: 4, B: 3, C: 2, D: 1 };

    const deduped = [];
    for (const [key, records] of grouped.entries()) {
      if (records.length === 1) {
        deduped.push(records[0]);
      } else {
        // Sort by priority
        records.sort((a, b) => {
          const sevDiff = (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0);
          if (sevDiff !== 0) return sevDiff;

          const evDiff = (evidenceRank[b.evidence_grade] || 0) - (evidenceRank[a.evidence_grade] || 0);
          if (evDiff !== 0) return evDiff;

          return parseInt(b.confidence) - parseInt(a.confidence);
        });
        deduped.push(records[0]);
      }
    }

    // Upsert into checker_interactions
    const { error: upsertError } = await supabase
      .from('checker_interactions')
      .upsert(deduped, { onConflict: 'interaction_id' });

    if (upsertError) {
      console.error('Upsert error:', upsertError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to upsert interactions', details: upsertError.message })
      };
    }

    // Mark stage records as processed
    const { error: updateError } = await supabase
      .from('stage_interactions')
      .update({ processed: true })
      .in('stage_id', processed);

    if (updateError) {
      console.error('Update error:', updateError);
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        imported: deduped.length,
        processed: processed.length,
        unmatched_drugs: [],
        unmatched_supplements: []
      })
    };

  } catch (err) {
    console.error('Process error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
};
