import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "damnedRoad",
  description: "Decentralized Ecosystem of Digital Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
