#!/usr/bin/env node
// Gauntlet local-pass runner. Executes static scanners sequentially.
// Network-bound dimensions (1 HTTP, 2 click-through, 5 console, 11 viewport, 13 perf, 17 dead-link)
// are run against `next start` + Playwright — use scripts/gauntlet/run-networked.mjs for those.

import { spawn } from "node:child_process";

const steps = [
  { id: "content", cmd: "node", args: ["scripts/gauntlet/content-scan.mjs"] },
  { id: "aup", cmd: "node", args: ["scripts/gauntlet/aup-scan.mjs"] },
  { id: "exif", cmd: "node", args: ["scripts/gauntlet/exif-leak-scan.mjs"] },
  { id: "media", cmd: "node", args: ["scripts/gauntlet/media-tier-probe.mjs"] },
];

async function run(step) {
  return new Promise((resolve) => {
    const child = spawn(step.cmd, step.args, { stdio: "inherit" });
    child.on("close", (code) => resolve({ id: step.id, code }));
  });
}

async function main() {
  const results = [];
  for (const s of steps) {
    console.log(`\n== ${s.id} ==`);
    results.push(await run(s));
  }
  const failures = results.filter((r) => r.code !== 0);
  console.log("\n== summary ==");
  console.log(JSON.stringify(results, null, 2));
  process.exit(failures.length > 0 ? 1 : 0);
}

main();
