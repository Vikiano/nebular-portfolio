import { NextResponse } from "next/server";
import { serverSupabase, serverSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const ts = new Date().toISOString();
  const commit = process.env.VERCEL_GIT_COMMIT_SHA ?? "local";
  const supabaseState = await (async () => {
    if (!serverSupabaseConfigured) return "not-configured" as const;
    const sb = serverSupabase();
    if (!sb) return "degraded" as const;
    try {
      const { error } = await sb.from("galleries").select("slug").limit(1);
      return error ? ("degraded" as const) : ("ok" as const);
    } catch {
      return "down" as const;
    }
  })();

  const r2State: "configured" | "not-configured" = process.env.R2_BUCKET_NAME ? "configured" : "not-configured";
  const resendState: "configured" | "not-configured" = process.env.RESEND_API_KEY ? "configured" : "not-configured";

  return NextResponse.json({
    ok: true,
    ts,
    commit,
    services: {
      supabase: supabaseState,
      r2: r2State,
      resend: resendState,
    },
    fallback_tier: supabaseState === "ok" ? "primary" : "static-json",
  });
}
