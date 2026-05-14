import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jinay.ca";
const AGENT_NAME = process.env.NEXT_PUBLIC_AGENT_NAME || "Jinay Shah";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AGENT_NAME} — Pre-Construction Projects in the GTA`,
    template: `%s | ${AGENT_NAME}`,
  },
  description:
    "Curated pre-construction condominium and townhome opportunities across the Greater Toronto Area. Pricing, deposit terms, floor plans, and direct access.",
  openGraph: {
    type: "website",
    siteName: AGENT_NAME,
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
