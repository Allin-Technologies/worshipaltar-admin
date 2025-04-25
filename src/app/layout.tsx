import type { Metadata } from "next";
import { TanstackQueryProvider } from "@/providers/TanstackQuery";
import { Toaster } from "@/components/ui/sonner";
import { inter, gobold, gobold_hollow } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Praisewine 2025",
  description:
    "Praisewine is a mandate for us all to Praise and Worship Him for WHO HE HIS.",
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
        className={`${gobold.variable} ${gobold_hollow.variable} ${inter.className} antialiased`}
      >
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
