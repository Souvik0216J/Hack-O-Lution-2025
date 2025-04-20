'use client';

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/dashboard'];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  if (shouldHideNavbar) return null;

  return <Navbar />;
}
