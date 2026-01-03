#!/usr/bin/env node

/**
 * Test script for Request Review submission
 * Tests direct insertion into interaction_requests table
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

async function testRequestReview() {
  console.log('🧪 Testing Request Review Submission\n');

  // Test 1: Single substance submission
  console.log('Test 1: Single substance submission');
  const test1 = await supabase
    .from('interaction_requests')
    .insert({
      substance_name: 'Test Omega-3',
      interaction_with: null,
      notes: 'Submitted from no-results state',
      status: 'pending'
    });

  if (test1.error) {
    if (test1.error.code === '23505') {
      console.log('✅ Duplicate detected (expected behavior)');
    } else {
      console.log('❌ Error:', test1.error.message);
    }
  } else {
    console.log('✅ Single substance submitted successfully');
  }

  // Test 2: Multiple substances submission
  console.log('\nTest 2: Multiple substances submission');
  const test2 = await supabase
    .from('interaction_requests')
    .insert({
      substance_name: 'Test Vitamin D',
      interaction_with: 'Test Calcium + Test Magnesium',
      notes: 'Submitted from no-results state',
      status: 'pending'
    });

  if (test2.error) {
    if (test2.error.code === '23505') {
      console.log('✅ Duplicate detected (expected behavior)');
    } else {
      console.log('❌ Error:', test2.error.message);
    }
  } else {
    console.log('✅ Multiple substances submitted successfully');
  }

  // Test 3: Query recent submissions
  console.log('\nTest 3: Query recent submissions');
  const { data: recent, error: queryError } = await supabase
    .from('interaction_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (queryError) {
    console.log('❌ Query error:', queryError.message);
    console.log('   (This is expected if not authenticated or not admin)');
  } else {
    console.log('✅ Query successful:');
    recent?.forEach((req, i) => {
      console.log(`   ${i + 1}. ${req.substance_name} ${req.interaction_with ? '+ ' + req.interaction_with : ''}`);
      console.log(`      Status: ${req.status}, Created: ${new Date(req.created_at).toLocaleString()}`);
    });
  }

  console.log('\n✅ Request Review tests complete!');
}

testRequestReview().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
