// "use client";

// import { cn } from "@/utils/cn";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: {
//     src: string;
//     alt?: string;
//   }[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     addAnimation();
//   }, []);

//   const [start, setStart] = useState(false);

//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }

//   const getDirection = () => {
//     if (containerRef.current) {
//       containerRef.current.style.setProperty(
//         "--animation-direction",
//         direction === "left" ? "forwards" : "reverse"
//       );
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       const duration =
//         speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
//       containerRef.current.style.setProperty("--animation-duration", duration);
//     }
//   };

//   return (
//     <div
//       onContextMenu={(e) => e.preventDefault()}
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, idx) => (
//           <li
//             key={idx}
//             className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-white p-2 md:w-[450px] dark:border-zinc-700 dark:bg-zinc-900"
//           >
//             <Image
//               src={item.src}
//               width={450}
//               height={300}
//               alt={item.alt || `image-${idx}`}
//               className="w-full h-[230px] object-cover rounded-xl"
//               priority={idx < 2} // Only prioritize a few images at a time
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    src: string;
    alt?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        // Set direction
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );

        // Set speed
        const duration =
          speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
        containerRef.current.style.setProperty("--animation-duration", duration);

        setStart(true);
      }
    }

    addAnimation();
  }, [direction, speed]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-white p-2 md:w-[450px] dark:border-zinc-700 dark:bg-zinc-900"
          >
            <Image
              src={item.src}
              width={450}
              height={300}
              alt={item.alt || `image-${idx}`}
              className="w-full h-[230px] object-cover rounded-xl"
              priority={idx < 2} // Only prioritize a few images at a time
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
