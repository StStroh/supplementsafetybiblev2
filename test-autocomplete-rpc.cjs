#!/usr/bin/env node

/**
 * Test script for autocomplete RPC function
 * Tests the new rpc_suggest_tokens function
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAutocomplete() {
  console.log('🧪 Testing Autocomplete RPC Function\n');

  // Test 1: Search for "vit" (should return vitamin-related substances)
  console.log('Test 1: Search for "vit"');
  const { data: tokens1, error: error1 } = await supabase
    .rpc('rpc_suggest_tokens', {
      prefix: 'vit',
      limit_n: 5
    });

  if (error1) {
    console.log('❌ Error:', error1.message);
  } else {
    console.log(`✅ Found ${tokens1?.length || 0} suggestions:`);
    tokens1?.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.token} (${t.substance_id})`);
    });
  }

  // Test 2: Search for "mag" (should return magnesium)
  console.log('\nTest 2: Search for "mag"');
  const { data: tokens2, error: error2 } = await supabase
    .rpc('rpc_suggest_tokens', {
      prefix: 'mag',
      limit_n: 10
    });

  if (error2) {
    console.log('❌ Error:', error2.message);
  } else {
    console.log(`✅ Found ${tokens2?.length || 0} suggestions:`);
    tokens2?.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.token} (${t.substance_id})`);
    });
  }

  // Test 3: Search for "xyz" (should return no results)
  console.log('\nTest 3: Search for "xyz" (should return no results)');
  const { data: tokens3, error: error3 } = await supabase
    .rpc('rpc_suggest_tokens', {
      prefix: 'xyz',
      limit_n: 10
    });

  if (error3) {
    console.log('❌ Error:', error3.message);
  } else if (tokens3?.length === 0) {
    console.log('✅ No results (as expected)');
  } else {
    console.log(`⚠️ Unexpected results: ${tokens3?.length}`);
  }

  // Test 4: Get substance details to build complete suggestions
  console.log('\nTest 4: Get substance details for display');
  const { data: tokens4, error: error4 } = await supabase
    .rpc('rpc_suggest_tokens', {
      prefix: 'omega',
      limit_n: 5
    });

  if (error4) {
    console.log('❌ Error:', error4.message);
  } else if (tokens4 && tokens4.length > 0) {
    const substanceIds = [...new Set(tokens4.map(t => t.substance_id))];

    const { data: substances, error: substanceError } = await supabase
      .from('checker_substances')
      .select('substance_id, display_name, type')
      .in('substance_id', substanceIds);

    if (substanceError) {
      console.log('❌ Substance lookup error:', substanceError.message);
    } else {
      console.log('✅ Complete suggestions with display names:');
      const substanceMap = new Map(substances.map(s => [s.substance_id, s]));

      tokens4.forEach((t, i) => {
        const substance = substanceMap.get(t.substance_id);
        if (substance) {
          const displayType = substance.type === 'drug' ? 'medication' : 'supplement';
          console.log(`   ${i + 1}. ${substance.display_name} (${displayType})`);
        }
      });
    }
  }

  console.log('\n✅ Autocomplete RPC tests complete!');
}

testAutocomplete().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
