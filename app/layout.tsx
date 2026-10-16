import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
export const metadata: Metadata = {
  title: "Bhasha BRD — From conversation to clarity",
  description:
    "Your language. Your ideas. A clearer path forward. Explore how Bhasha BRD turns conversations into structured business requirements.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AppProviders>{children}</AppProviders></body>
    </html>
  );
}
