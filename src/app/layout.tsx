import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { NavbarWrapper } from "@/components/HideNav";
import StarsCanvas from "@/components/ui/star-canvas";
import { FontWrapper } from "@/components/FontWrapper";
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "Hack {O} Lution",
  description: "This is official Hack{o}Lution registration page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
          <FontWrapper>
            <StarsCanvas />
            <NavbarWrapper />
            {children}
            <Analytics />
            <Footer />
          </FontWrapper>
      </body>
    </html>
  );
}