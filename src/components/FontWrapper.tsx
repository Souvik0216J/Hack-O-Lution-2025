'use client';

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hackFont = localFont({
  src: '/fonts/Hacked-KerX.ttf',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function FontWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dashboardRoutes = ['/dashboard', '/admin-dashboard'];
  const shouldUseGeist = dashboardRoutes.some(route => pathname.startsWith(route));

  return (
    <div className={shouldUseGeist ? geistSans.className : hackFont.className}>
      {children}
    </div>
  );
}