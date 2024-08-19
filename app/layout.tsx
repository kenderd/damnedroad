import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar";
import { Link } from "react-aria-components";
import Footer from "@/components/common/Footer";
import "viem/window";

export const metadata: Metadata = {
  title: "damnedRoad",
  description: "Decentralized Ecosystem of Digital Products",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-between p-10 antialiased md:p-24 gap-12">
            <Navbar />
            {children}
          </div>
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
