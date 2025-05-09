"use client";
import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: ReactElement;
  }[];
  className?: string;
}) => {

  const router = useRouter();
  const pathname = usePathname(); // current path

  const loginPage = () => {
    router.push("/login");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full text-white bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => {
        const isActive = pathname === navItem.link; // check if active

        return (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1",
              "text-neutral-50 hover:text-neutral-300"
              // isActive ? "text-green-300" : "text-neutral-50 hover:text-neutral-300"
            )}
          >
            {/* for mobile */}
            <span className="block sm:hidden text-4xl">{navItem.icon}</span>
            <span className="hidden sm:block text-md">{navItem.name}</span>
          </Link>
        );
      })}

      <button
        className="group border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full hover:cursor-pointer"
        onClick={loginPage}
      >
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px group-hover:via-[#05DF72] transition-colors duration-300 ease-in-out" />
      </button>

    </motion.div>
  );
};
