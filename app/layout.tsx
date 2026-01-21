import type { Metadata } from "next";
import "./globals.css";

import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: "Job Tracker",
  // LLEFTTTTTTTTTTTTTTTTTTTT
  description: "{yyyyyyyyy}"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
