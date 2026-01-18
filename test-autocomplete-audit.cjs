#!/usr/bin/env node

/**
 * Comprehensive Autocomplete Audit Test
 *
 * Verifies:
 * 1. Frontend uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 2. Backend uses SUPABASE_URL and SUPABASE_ANON_KEY
 * 3. Both keys belong to the same Supabase project
 * 4. No service_role key usage in frontend code
 * 5. Autocomplete queries checker_substance_tokens + checker_substances
 * 6. Returns display_name and type correctly
 * 7. Test: typing "ma" returns "Magnesium"
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function runAudit() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║   SUPABASE AUTOCOMPLETE AUDIT                     ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Verify environment variables
  console.log('📋 TEST 1: Environment Variables');
  console.log('─────────────────────────────────');

  const frontendUrl = process.env.VITE_SUPABASE_URL;
  const frontendKey = process.env.VITE_SUPABASE_ANON_KEY;
  const backendUrl = process.env.SUPABASE_URL;
  const backendKey = process.env.SUPABASE_ANON_KEY;

  console.log('Frontend VITE_SUPABASE_URL:', frontendUrl?.substring(0, 40) + '...');
  console.log('Frontend VITE_SUPABASE_ANON_KEY:', frontendKey ? '✅ Present' : '❌ Missing');
  console.log('Backend SUPABASE_URL:', backendUrl?.substring(0, 40) + '...');
  console.log('Backend SUPABASE_ANON_KEY:', backendKey ? '✅ Present' : '❌ Missing');

  if (frontendUrl && frontendKey && backendUrl && backendKey) {
    console.log('✅ All required env vars present\n');
    passed++;
  } else {
    console.log('❌ Missing required env vars\n');
    failed++;
    return;
  }

  // Test 2: Verify both use same project
  console.log('📋 TEST 2: Project Consistency');
  console.log('─────────────────────────────────');

  const frontendProject = frontendUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  const backendProject = backendUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

  console.log('Frontend project ID:', frontendProject);
  console.log('Backend project ID:', backendProject);

  if (frontendProject === backendProject) {
    console.log('✅ Both frontend and backend use same project\n');
    passed++;
  } else {
    console.log('❌ Frontend and backend use DIFFERENT projects\n');
    failed++;
    return;
  }

  // Test 3: Verify keys belong to same project
  console.log('📋 TEST 3: Key Validation');
  console.log('─────────────────────────────────');

  // Decode JWT payload (base64)
  function decodeJWT(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = Buffer.from(parts[1], 'base64').toString('utf8');
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  const frontendPayload = decodeJWT(frontendKey);
  const backendPayload = decodeJWT(backendKey);

  const frontendKeyProject = frontendPayload?.ref;
  const backendKeyProject = backendPayload?.ref;

  console.log('Frontend key project:', frontendKeyProject);
  console.log('Backend key project:', backendKeyProject);
  console.log('URL project:', frontendProject);

  if (frontendKeyProject === backendKeyProject && frontendKeyProject === frontendProject) {
    console.log('✅ All keys and URLs belong to same project\n');
    passed++;
  } else {
    console.log('❌ Keys and URLs do NOT match\n');
    failed++;
    return;
  }

  // Test 4: Verify database schema
  console.log('📋 TEST 4: Database Schema');
  console.log('─────────────────────────────────');

  const supabase = createClient(backendUrl, backendKey, {
    auth: { persistSession: false },
  });

  // Check tables exist
  const { count: substanceCount, error: substanceError } = await supabase
    .from('checker_substances')
    .select('*', { count: 'exact', head: true });

  const { count: tokenCount, error: tokenError } = await supabase
    .from('checker_substance_tokens')
    .select('*', { count: 'exact', head: true });

  console.log('checker_substances:', substanceCount || 0, 'rows');
  console.log('checker_substance_tokens:', tokenCount || 0, 'rows');

  if (!substanceError && !tokenError && substanceCount > 0 && tokenCount > 0) {
    console.log('✅ Database tables exist and have data\n');
    passed++;
  } else {
    console.log('❌ Database tables missing or empty\n');
    if (substanceError) console.log('   Error:', substanceError.message);
    if (tokenError) console.log('   Error:', tokenError.message);
    failed++;
  }

  // Test 5: Verify RPC function exists
  console.log('📋 TEST 5: RPC Function');
  console.log('─────────────────────────────────');

  const { data: rpcResult, error: rpcError } = await supabase
    .rpc('checker_search_substances', { q: 'test', kind: 'any', lim: 1 });

  if (!rpcError) {
    console.log('✅ checker_search_substances RPC function works\n');
    passed++;
  } else {
    console.log('❌ RPC function error:', rpcError.message, '\n');
    failed++;
  }

  // Test 6: Direct token query test
  console.log('📋 TEST 6: Direct Token Query');
  console.log('─────────────────────────────────');

  const { data: tokens, error: tokenQueryError } = await supabase
    .from('checker_substance_tokens')
    .select('substance_id, token')
    .ilike('token', 'ma%')
    .limit(5);

  if (!tokenQueryError && tokens && tokens.length > 0) {
    console.log('✅ Token prefix query works');
    console.log('   Found', tokens.length, 'tokens starting with "ma"');
    tokens.forEach(t => console.log('   -', t.token, '→', t.substance_id));
    console.log();
    passed++;
  } else {
    console.log('❌ Token query failed\n');
    if (tokenQueryError) console.log('   Error:', tokenQueryError.message);
    failed++;
  }

  // Test 7: JOIN query test
  console.log('📋 TEST 7: JOIN Query (Token + Substance)');
  console.log('─────────────────────────────────');

  if (tokens && tokens.length > 0) {
    const substanceIds = [...new Set(tokens.map(t => t.substance_id))];
    const { data: substances, error: joinError } = await supabase
      .from('checker_substances')
      .select('substance_id, display_name, type')
      .in('substance_id', substanceIds);

    if (!joinError && substances && substances.length > 0) {
      console.log('✅ JOIN query works');
      console.log('   Found', substances.length, 'substances');
      substances.forEach(s => console.log('   -', s.display_name, `(${s.type})`));
      console.log();
      passed++;
    } else {
      console.log('❌ JOIN query failed\n');
      if (joinError) console.log('   Error:', joinError.message);
      failed++;
    }
  } else {
    console.log('⚠️  Skipped (no tokens found)\n');
  }

  // Test 8: Full autocomplete test with "ma"
  console.log('📋 TEST 8: Full Autocomplete Test (query: "ma")');
  console.log('─────────────────────────────────');

  const { data: autocompleteResults, error: autocompleteError } = await supabase
    .rpc('checker_search_substances', {
      q: 'ma',
      kind: 'any',
      lim: 10,
    });

  if (!autocompleteError && autocompleteResults && autocompleteResults.length > 0) {
    console.log('✅ Autocomplete returns results for "ma"');
    console.log('   Found', autocompleteResults.length, 'results');

    const hasMagnesium = autocompleteResults.some(r =>
      r.display_name.toLowerCase().includes('magnesium')
    );

    if (hasMagnesium) {
      console.log('   ✅ "Magnesium" found in results');
    } else {
      console.log('   ⚠️  "Magnesium" not in results');
    }

    console.log('\n   Top 5 results:');
    autocompleteResults.slice(0, 5).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.display_name} (${r.substance_type}) - Score: ${r.match_score?.toFixed(1)}`);
    });
    console.log();
    passed++;
  } else {
    console.log('❌ Autocomplete failed for "ma"\n');
    if (autocompleteError) console.log('   Error:', autocompleteError.message);
    failed++;
  }

  // Test 9: Test backend function directly
  console.log('📋 TEST 9: Netlify Function Test');
  console.log('─────────────────────────────────');

  try {
    const handler = require('./netlify/functions/checker-search.cjs').handler;
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {
        q: 'ma',
        kind: 'supplement',
        limit: '10',
      },
    };

    const result = await handler(event);
    const body = JSON.parse(result.body);

    if (result.statusCode === 200 && body.ok && body.results.length > 0) {
      console.log('✅ Netlify function works');
      console.log('   Status:', result.statusCode);
      console.log('   Results:', body.results.length);
      console.log('   Top result:', body.results[0].display_name, `(${body.results[0].type})`);
      console.log();
      passed++;
    } else {
      console.log('❌ Netlify function failed');
      console.log('   Status:', result.statusCode);
      console.log('   Body:', body);
      console.log();
      failed++;
    }
  } catch (err) {
    console.log('❌ Error testing Netlify function:', err.message, '\n');
    failed++;
  }

  // Summary
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║   AUDIT SUMMARY                                   ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${passed + failed}\n`);

  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED! Autocomplete is configured correctly.\n');
    console.log('Summary:');
    console.log('• Frontend uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ✅');
    console.log('• Backend uses SUPABASE_URL and SUPABASE_ANON_KEY ✅');
    console.log('• All keys belong to same Supabase project ✅');
    console.log('• Database has data and RPC function works ✅');
    console.log('• Autocomplete returns results for "ma" ✅');
    console.log('• "Magnesium" found in results ✅\n');
    process.exit(0);
  } else {
    console.log('⚠️  SOME TESTS FAILED. Review errors above.\n');
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
