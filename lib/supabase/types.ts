// Generated types placeholder. Regenerate via `mcp__supabase__generate_typescript_types`
// after Supabase project provisioning. Committed baseline for dim 8 schema drift check.

export type Database = {
  public: {
    Tables: {
      galleries: {
        Row: {
          slug: string;
          title: string;
          description: string;
          cover_photo_id: string | null;
          order_index: number;
          published_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["galleries"]["Row"]> & { slug: string; title: string; description: string };
        Update: Partial<Database["public"]["Tables"]["galleries"]["Row"]>;
      };
      photos: {
        Row: {
          id: string;
          slug: string;
          gallery_slug: string | null;
          title: string;
          caption: string | null;
          alt_text: string;
          camera: string | null;
          lens: string | null;
          iso: number | null;
          aperture: string | null;
          shutter: string | null;
          focal_length_mm: number | null;
          captured_at: string | null;
          file_path: string;
          file_path_fallback: string | null;
          width: number;
          height: number;
          attribution_source: "self" | "unsplash" | "ai-generated" | "nebular-placeholder-svg";
          attribution_license: string;
          attribution_photographer: string | null;
          attribution_url: string | null;
          tags: string[];
          ordering: number;
          published_at: string;
          exif_synthesized: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["photos"]["Row"]> & { id: string; slug: string; title: string; alt_text: string; file_path: string; attribution_source: "self" | "unsplash" | "ai-generated" | "nebular-placeholder-svg"; attribution_license: string };
        Update: Partial<Database["public"]["Tables"]["photos"]["Row"]>;
      };
      series: {
        Row: {
          slug: string;
          title: string;
          description: string;
          theme_tag: string;
          cover_photo_id: string | null;
          status: "active" | "expanding" | "paused";
          status_note: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["series"]["Row"]> & { slug: string; title: string; description: string; theme_tag: string };
        Update: Partial<Database["public"]["Tables"]["series"]["Row"]>;
      };
      series_photos: {
        Row: { series_slug: string; photo_id: string; order_index: number };
        Insert: { series_slug: string; photo_id: string; order_index?: number };
        Update: Partial<{ series_slug: string; photo_id: string; order_index: number }>;
      };
      tags: {
        Row: { slug: string; label: string };
        Insert: { slug: string; label: string };
        Update: Partial<{ slug: string; label: string }>;
      };
      licensing_inquiries: {
        Row: {
          id: string;
          email: string;
          inquiry_type: "commercial" | "editorial" | "personal" | "commission" | "coach" | "other";
          budget_tier: string | null;
          message: string;
          photo_id: string | null;
          locale: string;
          created_at: string;
          contacted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["licensing_inquiries"]["Row"], "id" | "created_at" | "locale" | "contacted_at"> & Partial<Pick<Database["public"]["Tables"]["licensing_inquiries"]["Row"], "id" | "created_at" | "locale" | "contacted_at">>;
        Update: Partial<Database["public"]["Tables"]["licensing_inquiries"]["Row"]>;
      };
      newsletter_subscribers: {
        Row: { id: string; email: string; source: string | null; created_at: string; confirmed: boolean };
        Insert: Pick<Database["public"]["Tables"]["newsletter_subscribers"]["Row"], "email"> & Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Row"]>;
      };
      rss_items: {
        Row: { id: string; link: string; title: string; description: string | null; published_at: string };
        Insert: Pick<Database["public"]["Tables"]["rss_items"]["Row"], "link" | "title"> & Partial<Database["public"]["Tables"]["rss_items"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rss_items"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
