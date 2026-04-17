#!/usr/bin/env node
// Gauntlet dim 17 — dead-link check against local server.
// Walks a set of routes, extracts all internal href values with cheerio,
// then probes each with a HEAD request. External links are reported but
// do not fail the run.

import { load } from "cheerio";

const BASE = process.env.GAUNTLET_BASE ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/galleries",
  "/galleries/vancouver-street",
  "/galleries/coal-harbour-waterfront",
  "/galleries/documentary-lagos",
  "/galleries/portraits",
  "/galleries/quiet-interiors",
  "/galleries/craft-fieldwork",
  "/series/vancouver-street",
  "/series/coal-harbour-waterfront",
  "/series/documentary-lagos",
  "/series/portraits",
  "/about-nebular",
  "/licensing",
  "/pricing",
  "/coach-mode",
  "/contact-waitlist",
  "/legal/privacy",
  "/legal/terms",
  "/legal/licensing-terms",
  "/legal/accessibility",
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { Accept: "text/html" } });
  if (!res.ok) throw new Error(`${url} => ${res.status}`);
  return await res.text();
}

async function probe(url) {
  try {
    const res = await fetch(url, { method: "GET", headers: { Accept: "text/html,*/*" } });
    return res.status;
  } catch {
    return 0;
  }
}

async function main() {
  const internal = new Set();
  const external = new Set();

  for (const route of ROUTES) {
    const html = await fetchText(BASE + route);
    const $ = load(html);
    $("a[href]").each((_, el) => {
      const href = String($(el).attr("href") ?? "").trim();
      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("/")) internal.add(href.split("#")[0].split("?")[0]);
      else if (href.startsWith("http")) external.add(href.split("#")[0]);
    });
  }

  const internalResults = [];
  for (const href of internal) {
    const code = await probe(BASE + href);
    internalResults.push({ href, code });
  }
  const dead = internalResults.filter((r) => r.code === 0 || r.code >= 400);
  console.log(`[link-check] internal: ${internalResults.length}, dead: ${dead.length}`);
  if (dead.length > 0) {
    console.log(JSON.stringify(dead, null, 2));
  }
  console.log(`[link-check] external: ${external.size} (not probed)`);
  process.exit(dead.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("[link-check] failed:", err);
  process.exit(2);
});
