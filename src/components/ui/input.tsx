"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  multiline?: boolean;
  dropdown?: boolean;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(
  ({ className, type, multiline = false, dropdown = false, options = [], rows = 4, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const commonClassName = cn(
      `shadow-input dark:placeholder-text-neutral-600 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
      className,
    );

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b82f6,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        {dropdown ? (
          <div className="relative">
            <select
              className={cn(commonClassName, "h-10 appearance-none")}
              ref={ref as React.Ref<HTMLSelectElement>}
              {...props}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
          </div>
        ) : multiline ? (
          <textarea
            className={cn(commonClassName, "h-auto min-h-[100px] resize-y")}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        ) : (
          <input
            type={type}
            className={cn(commonClassName, "h-10")}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        )}
      </motion.div>
    );
  }
);

Input.displayName = "Input";

export { Input };