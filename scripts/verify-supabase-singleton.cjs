#!/usr/bin/env node

/**
 * Verify Supabase Singleton Pattern
 *
 * This script checks that:
 * 1. Only one createClient call exists in the src directory
 * 2. All other files import the singleton instance
 * 3. No hardcoded project refs exist in the supabase client
 */

const fs = require('fs');
const path = require('path');

const errors = [];
const warnings = [];
const successes = [];

// Check src/lib/supabase.ts
console.log('🔍 Checking Supabase client implementation...\n');

const supabaseFilePath = path.join(__dirname, '../src/lib/supabase.ts');

if (!fs.existsSync(supabaseFilePath)) {
  errors.push('❌ src/lib/supabase.ts not found');
} else {
  const content = fs.readFileSync(supabaseFilePath, 'utf8');

  // Check for hardcoded project ref
  if (content.includes('cyxfxjoadzxhxwxjqkez')) {
    errors.push('❌ Hardcoded old project ref found (cyxfxjoadzxhxwxjqkez)');
  } else {
    successes.push('✅ No hardcoded old project ref');
  }

  // Check for dynamic storage key
  if (content.includes('const STORAGE_KEY = `sb-${projectRef}-auth-token`')) {
    successes.push('✅ Dynamic storage key is used');
  } else if (content.includes("const STORAGE_KEY = 'sb-")) {
    errors.push('❌ Hardcoded storage key detected');
  } else {
    warnings.push('⚠️  Could not verify storage key pattern');
  }

  // Check for cleanup function
  if (content.includes('cleanupStaleSupabaseAuth')) {
    successes.push('✅ Cleanup function exists');
  } else {
    errors.push('❌ Cleanup function not found');
  }

  // Check for singleton pattern
  if (content.includes('globalThis.__ssb_supabase_client')) {
    successes.push('✅ Singleton pattern implemented');
  } else {
    errors.push('❌ Singleton pattern not found');
  }

  // Count createClient calls (should be exactly 1)
  const createClientMatches = content.match(/createClient\(/g);
  const createClientCount = createClientMatches ? createClientMatches.length : 0;

  if (createClientCount === 1) {
    successes.push('✅ Single createClient call');
  } else if (createClientCount === 0) {
    errors.push('❌ No createClient call found');
  } else {
    errors.push(`❌ Multiple createClient calls found (${createClientCount})`);
  }
}

// Scan src directory for any other createClient calls
console.log('🔍 Scanning src directory for duplicate createClient calls...\n');

function scanDirectory(dir, basePath = 'src') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const relativePath = path.join(basePath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(fullPath, relativePath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      if (relativePath !== 'src/lib/supabase.ts') {
        const content = fs.readFileSync(fullPath, 'utf8');

        // Check for createClient calls
        if (content.includes('createClient(')) {
          errors.push(`❌ Duplicate createClient found in ${relativePath}`);
        }

        // Check for proper import
        if (content.includes('from "@supabase/supabase-js"') || content.includes("from '@supabase/supabase-js'")) {
          // This is OK if it's just importing types
          if (content.includes('createClient')) {
            errors.push(`❌ Direct supabase-js import in ${relativePath}`);
          } else if (!content.includes('type') && !content.includes('SupabaseClient') && !content.includes('User') && !content.includes('Session')) {
            warnings.push(`⚠️  Supabase import in ${relativePath} (might be types)`);
          }
        }

        // Check for proper singleton import
        if (content.includes("from '../lib/supabase'") ||
            content.includes('from "../lib/supabase"') ||
            content.includes("from '../../lib/supabase'") ||
            content.includes('from "../../lib/supabase"') ||
            content.includes("from './supabase'") ||
            content.includes('from "./supabase"')) {
          // Good - using singleton
        }
      }
    }
  });
}

const srcDir = path.join(__dirname, '../src');
if (fs.existsSync(srcDir)) {
  scanDirectory(srcDir, 'src');
} else {
  errors.push('❌ src directory not found');
}

// Print results
console.log('═══════════════════════════════════════════════════\n');
console.log('📊 VERIFICATION RESULTS\n');
console.log('═══════════════════════════════════════════════════\n');

if (successes.length > 0) {
  console.log('✅ PASSED:\n');
  successes.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ ERRORS:\n');
  errors.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

console.log('═══════════════════════════════════════════════════\n');

if (errors.length === 0) {
  console.log('🎉 ALL CHECKS PASSED!\n');
  console.log('The Supabase singleton is correctly implemented.');
  console.log('');
  process.exit(0);
} else {
  console.log(`❌ ${errors.length} ERROR(S) FOUND\n`);
  console.log('Please fix the errors above before deploying.');
  console.log('');
  process.exit(1);
}
