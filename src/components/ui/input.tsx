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

// Add global styles for placeholder colors
const GlobalPlaceholderStyles = () => {
  React.useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      input::placeholder, textarea::placeholder {
        color: rgb(163 163 163) !important; /* neutral-400 */
        opacity: 1 !important;
      }
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #27272a inset !important;
        -webkit-text-fill-color: white !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  return null;
};

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(
  ({ className, type, multiline = false, dropdown = false, options = [], rows = 4, ...props }, ref) => {
    const radius = 150; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const commonClassName = cn(
      `shadow-input w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black
       transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium
       focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none
       disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-800 text-white shadow-[0px_0px_1px_1px_#404040]
       focus-visible:ring-neutral-600`,
      className,
    );

    // Insert global styles
    React.useEffect(() => {
      // Ensure this is client-side only
      if (typeof window !== 'undefined') {
        const style = document.createElement('style');
        style.innerHTML = `
          input::placeholder, textarea::placeholder {
            color: rgb(163 163 163) !important; /* neutral-400 */
            opacity: 1 !important;
          }
        `;
        document.head.appendChild(style);

        return () => {
          document.head.removeChild(style);
        };
      }
    }, []);

    return (
      <>
        <GlobalPlaceholderStyles />
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
      </>
    );
  });

Input.displayName = "Input";

export { Input };