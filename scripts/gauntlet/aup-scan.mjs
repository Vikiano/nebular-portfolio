#!/usr/bin/env node
// Gauntlet dim 15 — Anthropic + OpenAI AUP compliance scan
// Greps the app source for forbidden user-facing copy patterns.

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOTS = ["app", "components", "lib", "data", "public/placeholders"];
const BANNED_PATTERNS = [
  { label: "stealth-interview-assistance", re: /stealth.*(interview|assessment)/i },
  { label: "undisclosed-AI-agent", re: /undisclosed\s+AI/i },
  { label: "bypass-platform-tos", re: /bypass.{0,30}(tos|terms)/i },
  { label: "covert-scrape", re: /scrape\s+[^\n]{0,30}platform/i },
  { label: "evade-detection", re: /evade\s+detection/i },
];

async function walk(dir) {
  const out = [];
  try {
    await stat(dir);
  } catch {
    return out;
  }
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.(tsx?|mdx?|json)$/.test(ent.name)) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = [];
  for (const r of ROOTS) {
    files.push(...(await walk(path.resolve(process.cwd(), r))));
  }
  const hits = [];
  for (const f of files) {
    const content = await readFile(f, "utf-8");
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.re.test(content)) {
        hits.push({ file: path.relative(process.cwd(), f), pattern: pattern.label });
      }
    }
  }
  if (hits.length === 0) {
    console.log(`[aup] scanned ${files.length} files, 0 violations`);
    process.exit(0);
  }
  console.log("[aup] violations:");
  console.log(JSON.stringify(hits, null, 2));
  process.exit(1);
}

main().catch((err) => {
  console.error("[aup] scan failed:", err);
  process.exit(2);
});
