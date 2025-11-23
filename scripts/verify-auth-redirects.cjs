#!/usr/bin/env node

/**
 * Verification Script: Auth Redirect Safety Check
 *
 * This script verifies that no hardcoded localhost redirects exist in the codebase.
 * Run this before deploying to ensure production-safe auth flows.
 */

const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║              Auth Redirect Safety Verification Script                       ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const CHECKS = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function pass(message) {
  console.log(`✅ PASS: ${message}`);
  CHECKS.passed++;
}

function fail(message) {
  console.log(`❌ FAIL: ${message}`);
  CHECKS.failed++;
}

function warn(message) {
  console.log(`⚠️  WARN: ${message}`);
  CHECKS.warnings++;
}

function info(message) {
  console.log(`ℹ️  INFO: ${message}`);
}

// Check 1: Verify Auth.tsx uses dynamic origin
console.log('\n[CHECK 1] Verifying Auth.tsx uses dynamic redirectTo...');
const authFile = path.join(__dirname, '../src/pages/Auth.tsx');
if (fs.existsSync(authFile)) {
  const content = fs.readFileSync(authFile, 'utf-8');

  if (content.includes('window.location.origin')) {
    pass('Auth.tsx uses dynamic window.location.origin');
  } else {
    fail('Auth.tsx does not use window.location.origin');
  }

  if (content.includes('localhost:3000') || content.includes('localhost:5173')) {
    fail('Auth.tsx contains hardcoded localhost URL');
  } else {
    pass('Auth.tsx has no hardcoded localhost URLs');
  }

  if (content.includes('emailRedirectTo:')) {
    if (content.match(/emailRedirectTo:\s*[`"']https?:\/\//)) {
      fail('Auth.tsx has hardcoded redirect URL');
    } else {
      pass('Auth.tsx redirectTo is dynamically constructed');
    }
  }
} else {
  fail('Auth.tsx not found');
}

// Check 2: Verify Netlify functions use dynamic origin
console.log('\n[CHECK 2] Verifying Netlify functions use dynamic origin...');
const functionsDir = path.join(__dirname, '../netlify/functions');
const functionFiles = [
  'create-checkout-session.js',
  'create-portal-session.js'
];

functionFiles.forEach(file => {
  const filePath = path.join(functionsDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes('event.headers.origin')) {
      pass(`${file} uses dynamic event.headers.origin`);
    } else {
      warn(`${file} does not use event.headers.origin`);
    }

    if (content.includes('localhost:8888') || content.includes('localhost:3000')) {
      fail(`${file} contains hardcoded localhost URL`);
    } else {
      pass(`${file} has no hardcoded localhost URLs`);
    }
  } else {
    warn(`${file} not found (may not be required)`);
  }
});

// Check 3: Verify no localhost in environment example
console.log('\n[CHECK 3] Verifying .env.example has no localhost...');
const envExample = path.join(__dirname, '../.env.example');
if (fs.existsSync(envExample)) {
  const content = fs.readFileSync(envExample, 'utf-8');

  if (content.includes('localhost')) {
    fail('.env.example contains localhost references');
  } else {
    pass('.env.example has no localhost references');
  }
} else {
  warn('.env.example not found');
}

// Check 4: Search all source files for localhost
console.log('\n[CHECK 4] Scanning all source files for localhost...');
function scanDirectory(dir, excludeDirs = ['node_modules', '.git', 'dist']) {
  let localhostFound = false;

  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!excludeDirs.includes(item)) {
          scan(fullPath);
        }
      } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.jsx'))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('localhost') && !fullPath.includes('node_modules')) {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.includes('localhost') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
              fail(`Found localhost in ${fullPath.replace(dir, '')}:${index + 1}`);
              localhostFound = true;
            }
          });
        }
      }
    }
  }

  scan(dir);
  return localhostFound;
}

const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const netlifyDir = path.join(projectRoot, 'netlify');

let localhostFoundInSrc = false;
let localhostFoundInNetlify = false;

if (fs.existsSync(srcDir)) {
  localhostFoundInSrc = scanDirectory(srcDir);
}

if (fs.existsSync(netlifyDir)) {
  localhostFoundInNetlify = scanDirectory(netlifyDir);
}

if (!localhostFoundInSrc && !localhostFoundInNetlify) {
  pass('No localhost references found in source code');
}

// Summary
console.log('\n╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║                          VERIFICATION SUMMARY                                ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

console.log(`✅ Passed:   ${CHECKS.passed}`);
console.log(`❌ Failed:   ${CHECKS.failed}`);
console.log(`⚠️  Warnings: ${CHECKS.warnings}`);

console.log('\n' + '═'.repeat(80));

if (CHECKS.failed === 0) {
  console.log('\n✅ ALL CHECKS PASSED - Codebase is production-safe!');
  console.log('\nNext Steps:');
  console.log('1. Verify Supabase Site URL in dashboard');
  console.log('2. Deploy to Netlify');
  console.log('3. Test magic link flow in production');
  process.exit(0);
} else {
  console.log('\n❌ SOME CHECKS FAILED - Please fix the issues above before deploying');
  process.exit(1);
}
