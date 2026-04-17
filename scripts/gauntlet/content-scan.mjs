#!/usr/bin/env node
// Gauntlet dim 4 — content non-placeholder scan

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOTS = ["app", "components", "data"];
const BAD = [
  { label: "lorem-ipsum", re: /lorem\s+ipsum/i },
  { label: "bare-todo", re: /\b(TODO|FIXME|XXX)\b(?!\s*\(20\d{2}-)/ },
  { label: "coming-soon-undated", re: /coming\s+soon(?!.*20\d{2}-Q[1-4])/i },
  { label: "em-dash", re: /—/ },
  { label: "banned-delve", re: /\bdelve\b/i },
  { label: "banned-leverage", re: /\bleverage\b/i },
  { label: "banned-tapestry", re: /\btapestry\b/i },
  { label: "banned-navigate-metaphor", re: /\bnavigate\s+the\b/i },
  { label: "banned-holistic", re: /\bholistic\b/i },
  { label: "banned-synergy", re: /\bsynergy\b/i },
  { label: "banned-unpack", re: /\bunpack\b/i },
  { label: "banned-deep-dive", re: /\bdeep\s+dive\b/i },
  { label: "banned-landscape-metaphor", re: /\blandscape\b(?!.*photograph)/i },
  { label: "banned-cross-surface", re: /cross-surface/i },
];

async function walk(dir) {
  const out = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) out.push(...(await walk(full)));
      else if (/\.(tsx?|mdx?|json|css)$/.test(ent.name)) out.push(full);
    }
  } catch {
    // ignore
  }
  return out;
}

async function main() {
  const files = [];
  for (const r of ROOTS) files.push(...(await walk(path.resolve(process.cwd(), r))));
  const hits = [];
  for (const f of files) {
    const content = await readFile(f, "utf-8");
    for (const pattern of BAD) {
      if (pattern.re.test(content)) {
        hits.push({ file: path.relative(process.cwd(), f), pattern: pattern.label });
      }
    }
  }
  if (hits.length === 0) {
    console.log(`[content] scanned ${files.length} files, 0 violations`);
    process.exit(0);
  }
  console.log("[content] violations:");
  console.log(JSON.stringify(hits, null, 2));
  process.exit(1);
}

main().catch((err) => {
  console.error("[content] scan failed:", err);
  process.exit(2);
});
