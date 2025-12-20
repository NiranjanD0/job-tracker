import type { Metadata } from "next";
import "./globals.css";

import SessionWrapper from "./session-wrapper";

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
      <body data-theme='light'>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
