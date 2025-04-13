"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar"
import { IconHome, IconMessage, IconRegistered, IconUser } from "@tabler/icons-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-6 w-6 text-neutral-500 dark:text-white" />
    },
    {
      name: "Register",
      link: "/register",
      icon: <IconRegistered className="h-6 w-6 text-neutral-500 dark:text-white" />
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
