// "use client";
// import React, { ReactElement, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/utils/cn";
// import Link from "next/link";

// export const FloatingNav = ({
//   navItems,
//   className,
// }: {
//   navItems: {
//     name: string;
//     link: string;
//     icon?: ReactElement;
//   }[];
//   className?: string;
// }) => {
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (item: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setHoveredItem(item);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredItem(null);
//     }, 100); // delay to prevent flicker
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -100 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className={cn(
//         "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
//         className
//       )}
//     >
//       {navItems.map((navItem, idx) => {
//         const isContact = navItem.name === "Contact";

//         if (isContact) {
//           return (
//             <div
//               key={`link-${idx}`}
//               className="relative"
//               onMouseEnter={() => handleMouseEnter("Contact")}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link
//                 href={navItem.link}
//                 className={cn(
//                   "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
//                 )}
//               >
//                 <span className="block sm:hidden text-4xl">{navItem.icon}</span>
//                 <span className="hidden sm:block text-md">{navItem.name}</span>
//               </Link>

//               {hoveredItem === "Contact" && (
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-lg border border-neutral-200 dark:border-white/[0.2] px-4 py-3 space-y-2 z-50">
//                   <Link href="https://discord.com" target="_blank" className="hover:underline block">Discord</Link>
//                   <Link href="https://linkedin.com" target="_blank" className="hover:underline block">LinkedIn</Link>
//                   <Link href="https://instagram.com" target="_blank" className="hover:underline block">Instagram</Link>
//                   <Link href="https://twitter.com" target="_blank" className="hover:underline block">Twitter</Link>
//                 </div>
//               )}
//             </div>
//           );
//         }

//         return (
//           <Link
//             key={`link-${idx}`}
//             href={navItem.link}
//             className={cn(
//               "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
//             )}
//           >
//             <span className="block sm:hidden text-4xl">{navItem.icon}</span>
//             <span className="hidden sm:block text-md">{navItem.name}</span>
//           </Link>
//         );
//       })}

//       <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:cursor-pointer">
//         <span>Login</span>
//         <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
//       </button>
//     </motion.div>
//   );
// };

"use client";
import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

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
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          {/* for mobile  */}
          <span className="block sm:hidden text-4xl">{navItem.icon}</span>
          <span className="hidden sm:block text-md">{navItem.name}</span>
        </Link>
      ))}
      

      <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:cursor-pointer">
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </button>
    </motion.div>
  );
};