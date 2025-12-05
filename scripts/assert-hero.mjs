#!/usr/bin/env node

/**
 * Anti-regression guard for landing page Hero and HowItWorks components
 *
 * Ensures required components and testids are present before build
 * Fails build if legacy hero returns or required elements are missing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const REQUIRED_COMPONENTS = {
  'src/components/LandingCheckerHero.tsx': [
    'data-testid="landing-hero-headline"',
    'data-testid="landing-hero-checker"',
    'data-testid="landing-hero-check-btn"',
    'data-testid="landing-hero-pdf-btn"',
    'Don\'t Mix Blind',
    'Check interactions in seconds',
  ],
  'src/components/HowItWorks.tsx': [
    'data-testid="how-title"',
    'data-testid="how-step-1"',
    'data-testid="how-step-2"',
    'data-testid="how-step-3"',
    'How it works',
  ],
  'src/pages/Home.tsx': [
    '<LandingCheckerHero />',
    '<HowItWorks />',
    'import LandingCheckerHero from',
    'import HowItWorks from',
  ],
};

const FORBIDDEN_PATTERNS = [
  {
    file: 'src/components/DontMixBlindHero.tsx',
    reason: 'Legacy DontMixBlindHero component should be archived, not in components/',
  },
  {
    pattern: /id="old-hero"|class.*old[-_]hero/i,
    reason: 'Legacy hero markup detected',
  },
  {
    pattern: /<Hero\s+\/>/,
    reason: 'Old Hero component should not be used on landing - use LandingCheckerHero',
  },
];

console.log('🔍 Running anti-regression checks...\n');

let hasErrors = false;

// Check required components exist and contain required elements
for (const [filePath, requiredTokens] of Object.entries(REQUIRED_COMPONENTS)) {
  const fullPath = path.join(projectRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ FAIL: Required file missing: ${filePath}`);
    hasErrors = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  for (const token of requiredTokens) {
    if (!content.includes(token)) {
      console.error(`❌ FAIL: Missing required token in ${filePath}:`);
      console.error(`   Expected: ${token}`);
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log(`✅ ${filePath} - All required elements present`);
  }
}

console.log('');

// Check for forbidden patterns
for (const forbidden of FORBIDDEN_PATTERNS) {
  if (forbidden.file) {
    const fullPath = path.join(projectRoot, forbidden.file);
    if (fs.existsSync(fullPath)) {
      console.error(`❌ FAIL: ${forbidden.reason}`);
      console.error(`   Found: ${forbidden.file}`);
      hasErrors = true;
    }
  }

  if (forbidden.pattern) {
    const homePath = path.join(projectRoot, 'src/pages/Home.tsx');
    if (fs.existsSync(homePath)) {
      const homeContent = fs.readFileSync(homePath, 'utf8');
      if (forbidden.pattern.test(homeContent)) {
        console.error(`❌ FAIL: ${forbidden.reason}`);
        console.error(`   Pattern: ${forbidden.pattern}`);
        hasErrors = true;
      }
    }
  }
}

if (!hasErrors) {
  console.log('✅ No forbidden patterns detected\n');
}

// Summary
if (hasErrors) {
  console.error('\n❌ ASSERTION FAILED: Landing page components invalid');
  console.error('   Fix the above issues before deploying');
  process.exit(1);
} else {
  console.log('✅ All assertions passed - Hero components valid\n');
  process.exit(0);
}
