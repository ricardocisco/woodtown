import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/src/components/ui/sonner";
import { ThemeProvider } from "../components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Woodtown - Sua Loja de Skate",
  description:
    "Os melhores produtos de skate: shapes, rolamentos, roupas e acessórios. Qualidade e paixão em cada produto.",
  keywords: "skate, shape, rolamento, roupas skate, acessórios skate, woodtown"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            {children}
            <Toaster richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
