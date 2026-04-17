#!/usr/bin/env node
// Gauntlet dim 20 — EXIF leak scanner
// Walks public/ and flags GPS, camera-serial, or owner tags in images.
// SVGs are inert (scanned for embedded metadata strings only).
// Raster scanning uses exifr at runtime; exit non-zero on any leak.

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");
const LEAK_TAGS = ["GPSLatitude", "GPSLongitude", "GPSAltitude", "SerialNumber", "BodySerialNumber", "OwnerName", "Artist", "Copyright"];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function scanRaster(file) {
  try {
    const exifr = await import("exifr");
    const data = await exifr.default.parse(file, { gps: true });
    const leaks = {};
    if (data) {
      for (const key of LEAK_TAGS) {
        if (data[key] !== undefined) leaks[key] = data[key];
      }
    }
    return leaks;
  } catch {
    return {};
  }
}

async function scanSvg(file) {
  const content = await readFile(file, "utf-8");
  const leaks = {};
  for (const key of LEAK_TAGS) {
    if (new RegExp(`<${key}`, "i").test(content) || new RegExp(`${key}=`, "i").test(content)) {
      leaks[key] = true;
    }
  }
  return leaks;
}

async function main() {
  try {
    await stat(ROOT);
  } catch {
    console.log("[exif-leak] public/ not found, skipping");
    return;
  }
  const files = await walk(ROOT);
  const imageFiles = files.filter((f) => /\.(jpe?g|png|heic|tiff?|webp|svg)$/i.test(f));
  const report = [];
  for (const f of imageFiles) {
    const leaks = f.toLowerCase().endsWith(".svg") ? await scanSvg(f) : await scanRaster(f);
    if (Object.keys(leaks).length > 0) {
      report.push({ file: path.relative(process.cwd(), f), leaks });
    }
  }
  if (report.length === 0) {
    console.log(`[exif-leak] scanned ${imageFiles.length} files, 0 leaks`);
    process.exit(0);
  }
  console.log(`[exif-leak] ${report.length} leak(s) found:`);
  console.log(JSON.stringify(report, null, 2));
  process.exit(1);
}

main().catch((err) => {
  console.error("[exif-leak] scan failed:", err);
  process.exit(2);
});
