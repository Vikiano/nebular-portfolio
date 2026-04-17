import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.nebular.art"),
  title: {
    default: "Nebular Labs Portfolio | Craft Photography",
    template: "%s | Nebular Labs Portfolio",
  },
  description: "Obsidian-dark photography portfolio from Nebular Labs. Street, waterfront, portrait, and documentary work under a craft-forward anonymous umbrella.",
  keywords: ["photography", "portfolio", "nebular labs", "street photography", "documentary", "licensing"],
  authors: [{ name: "Nebular Labs" }],
  creator: "Nebular Labs",
  publisher: "Nebular Labs",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    title: "Nebular Labs Portfolio",
    description: "Craft photography from Nebular Labs. Street, waterfront, documentary.",
    siteName: "Nebular Labs Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebular Labs Portfolio",
    description: "Craft photography from Nebular Labs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
