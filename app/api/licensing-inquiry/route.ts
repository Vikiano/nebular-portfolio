import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { serverSupabase, serverSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";

const InquirySchema = z.object({
  email: z.string().email().max(200),
  inquiry_type: z.enum(["commercial", "editorial", "personal", "commission", "coach", "other"]),
  budget_tier: z.enum(["", "under-500", "500-2500", "2500-10000", "10000-plus"]).optional(),
  message: z.string().min(10).max(4000),
  photo_id: z.string().max(50).optional(),
  honey: z.string().optional(),
});

const chaosEnabled = process.env.CHAOS_PROXY_ENABLED === "true";

function shouldChaos() {
  if (!chaosEnabled) return false;
  return Math.random() < 0.1;
}

async function writeFallback(payload: Record<string, unknown>) {
  const dir = path.join(process.cwd(), ".submitted");
  try {
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`);
    await fs.writeFile(file, JSON.stringify(payload, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  if (parsed.data.honey && parsed.data.honey.length > 0) {
    return NextResponse.json({ ok: true, degraded: false }, { status: 200 });
  }

  const row = {
    email: parsed.data.email,
    inquiry_type: parsed.data.inquiry_type,
    budget_tier: parsed.data.budget_tier || null,
    message: parsed.data.message,
    photo_id: parsed.data.photo_id || null,
    locale: "en-CA",
    created_at: new Date().toISOString(),
    contacted_at: null as string | null,
  };

  const chaos = shouldChaos();

  if (!chaos && serverSupabaseConfigured) {
    const sb = serverSupabase();
    if (sb) {
      const { error } = await sb.from("licensing_inquiries").insert(row);
      if (!error) {
        return NextResponse.json({ ok: true, degraded: false });
      }
    }
  }

  const wrote = await writeFallback(row);
  if (wrote) {
    return NextResponse.json({ ok: true, degraded: true });
  }

  return NextResponse.json({ error: "Unable to record inquiry, please email hello@nebular.art" }, { status: 503 });
}

export async function GET() {
  return NextResponse.json({ ok: true, method_allowed: "POST" });
}
