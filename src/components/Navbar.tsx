"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar"
import { IconBook2, IconHome, IconRegistered, IconUser } from "@tabler/icons-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-6 w-6 text-white" />,
    },
    {
      name: "About",
      link: "/about",
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
