"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconBook2, IconHome, IconRegistered, IconUser } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  
  // Determine if we're on the home page
  const isHomePage = pathname === "/";
  
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-6 w-6 text-white" />,
    },
    {
      name: "About",
      // If on homepage, use hash link, otherwise navigate to homepage with hash
      link: isHomePage ? "#about" : "/#about",
      icon: <IconUser className="h-6 w-6 text-white" />,
    },
    {
      name: "Rules",
      link: "/rules",
      icon: <IconBook2 className="h-6 w-6 text-white" />
    },
    {
      name: "Register",
      link: "/register",
      icon: <IconRegistered className="h-6 w-6 text-white" />
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}