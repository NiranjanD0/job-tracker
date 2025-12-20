import type { Metadata } from "next";
import "./globals.css";

import SessionWrapper from "@/components/session-wrapper";

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
    <html lang="en">
      <body data-theme='dark'>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
