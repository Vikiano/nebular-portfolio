#!/usr/bin/env node
// Gauntlet dim 23 — media-tier probe preflight
// Confirms at least one of (R2, Supabase Storage, static public/) can serve images.

import { readdir, stat } from "node:fs/promises";
import path from "node:path";

async function probeStatic() {
  const dir = path.resolve(process.cwd(), "public", "placeholders");
  try {
    const entries = await readdir(dir);
    const images = entries.filter((e) => /\.(jpe?g|png|heic|tiff?|webp|svg|avif)$/i.test(e));
    return { tier: "static", ok: images.length > 0, count: images.length };
  } catch {
    return { tier: "static", ok: false, count: 0 };
  }
}

async function probeR2() {
  const envPresent = Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME);
  return { tier: "r2", ok: envPresent, reason: envPresent ? "env-configured" : "env-absent" };
}

async function probeSupabaseStorage() {
  const envPresent = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  return { tier: "supabase-storage", ok: envPresent, reason: envPresent ? "env-configured" : "env-absent" };
}

async function main() {
  const results = await Promise.all([probeR2(), probeSupabaseStorage(), probeStatic()]);
  const anyOk = results.some((r) => r.ok);
  console.log("[media-tier] probe results:");
  console.log(JSON.stringify(results, null, 2));
  if (!anyOk) {
    console.log("[media-tier] FAIL: no tier serves images");
    process.exit(1);
  }
  console.log(`[media-tier] OK: ${results.filter((r) => r.ok).map((r) => r.tier).join(", ")}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("[media-tier] probe failed:", err);
  process.exit(2);
});
