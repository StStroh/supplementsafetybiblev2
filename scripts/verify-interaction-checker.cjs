#!/usr/bin/env node

const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = 8888;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_FILE = "artifacts/verify_interaction_checker.md";

let netlifyProcess = null;
const results = [];

async function main() {
  console.log("🧪 INTERACTION CHECKER VERIFICATION\n");

  console.log("Starting netlify dev...");
  netlifyProcess = spawn("npx", ["netlify", "dev", "--port", PORT], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  await waitForServer(BASE_URL, 30000);
  console.log("✅ Server ready\n");

  console.log("Running tests...\n");

  await testHealth();
  await testSearch();
  await testCheck();

  console.log("\nGenerating report...");
  generateReport();

  console.log("\nStopping server...");
  if (netlifyProcess) {
    netlifyProcess.kill();
  }

  const allPassed = results.every(r => r.passed);
  console.log(`\n${allPassed ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED"}\n`);

  process.exit(allPassed ? 0 : 1);
}

async function waitForServer(url, timeout) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await fetch(`${url}/.netlify/functions/health`);
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error("Server did not start in time");
}

async function testHealth() {
  console.log("TEST: Health endpoint");
  try {
    const res = await fetch(`${BASE_URL}/.netlify/functions/health`);
    const json = await res.json();

    const passed = res.status === 200 && json.ok === true;
    results.push({
      test: "Health endpoint",
      passed,
      status: res.status,
      response: json,
    });

    console.log(passed ? "  ✅ PASS" : "  ❌ FAIL");
  } catch (err) {
    results.push({ test: "Health endpoint", passed: false, error: err.message });
    console.log("  ❌ FAIL:", err.message);
  }
}

async function testSearch() {
  console.log("TEST: Search endpoint");
  try {
    const res = await fetch(`${BASE_URL}/.netlify/functions/interactions-search?query=niacin`);
    const json = await res.json();

    const passed = res.status === 200 && json.ok === true && Array.isArray(json.matches);
    results.push({
      test: "Search endpoint (query=niacin)",
      passed,
      status: res.status,
      response: json,
    });

    console.log(passed ? "  ✅ PASS" : "  ❌ FAIL");
    if (passed) {
      console.log(`  Found ${json.matches.length} matches`);
    }
  } catch (err) {
    results.push({ test: "Search endpoint", passed: false, error: err.message });
    console.log("  ❌ FAIL:", err.message);
  }
}

async function testCheck() {
  console.log("TEST: Check endpoint");
  try {
    const res = await fetch(`${BASE_URL}/.netlify/functions/interactions-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplement: "Niacin", medication: "Simvastatin" }),
    });

    const json = await res.json();

    const passed =
      (res.status === 200 || res.status === 404) &&
      json.hasOwnProperty("ok") &&
      json.hasOwnProperty("pair");

    results.push({
      test: "Check endpoint (Niacin + Simvastatin)",
      passed,
      status: res.status,
      response: json,
    });

    console.log(passed ? "  ✅ PASS" : "  ❌ FAIL");
    if (json.ok) {
      console.log(`  Severity: ${json.severity}`);
    } else {
      console.log(`  Reason: ${json.reason}`);
    }
  } catch (err) {
    results.push({ test: "Check endpoint", passed: false, error: err.message });
    console.log("  ❌ FAIL:", err.message);
  }
}

function generateReport() {
  const allPassed = results.every(r => r.passed);
  const passCount = results.filter(r => r.passed).length;

  let report = `# Interaction Checker Verification Report\n\n`;
  report += `**Date:** ${new Date().toISOString()}\n`;
  report += `**Status:** ${allPassed ? "✅ ALL PASS" : "❌ SOME FAILED"}\n`;
  report += `**Pass Rate:** ${passCount}/${results.length}\n\n`;
  report += `---\n\n`;

  results.forEach((result) => {
    report += `## ${result.test}\n\n`;
    report += `**Status:** ${result.passed ? "✅ PASS" : "❌ FAIL"}\n`;
    if (result.status) report += `**HTTP Status:** ${result.status}\n`;
    if (result.error) report += `**Error:** ${result.error}\n`;
    if (result.response) {
      report += `\n**Response:**\n\`\`\`json\n${JSON.stringify(result.response, null, 2)}\n\`\`\`\n`;
    }
    report += `\n---\n\n`;
  });

  fs.writeFileSync(path.resolve(process.cwd(), OUTPUT_FILE), report);
  console.log(`Report saved to: ${OUTPUT_FILE}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

process.on("SIGINT", () => {
  if (netlifyProcess) netlifyProcess.kill();
  process.exit(1);
});

main().catch((err) => {
  console.error("Fatal error:", err);
  if (netlifyProcess) netlifyProcess.kill();
  process.exit(1);
});
