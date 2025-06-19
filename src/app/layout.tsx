import type { Metadata } from "next";
import { TanstackQueryProvider } from "@/providers/TanstackQuery";
import { Toaster } from "@/components/ui/sonner";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  preload: true,
});

import "./globals.css";

export const metadata: Metadata = {
   title: "The Worship Altar",
  description: "Connecting Believers Through Worship, Growth, and Outreach.",
  icons: {
    icon: [
      { url: "/favicon-1.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${oswald.className} antialiased`}
      >
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
