import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omm Prakash | Portfolio",
  description: "Portfolio website of Omm Prakash - Software Engineer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
