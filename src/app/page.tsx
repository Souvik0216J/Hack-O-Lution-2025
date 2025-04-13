"use client"
import { motion, Variants } from 'framer-motion'
import { BackgroundBeams } from "../components/ui/background-beams";
import { useTimer } from 'react-timer-hook'

export default function Home() {

  // Time counter
  const eventDate = new Date('July 20, 2025 17:30:00')
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp: eventDate })

  const animation: Variants = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 1.5,
        staggerChildren: 0.1,
      },
    },
  }
  return (
    <div className="h-[100vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center text-center justify-center">
          <motion.div
            variants={animation}
            initial="hidden"
            animate="show"
            className="text-4xl xs:text-4xl sm:text-6xl md:text-8xl lg-text-10xl font-medium mt-9 z-50"
          >
            <motion.span variants={animation}>H</motion.span>
            <motion.span variants={animation}>A</motion.span>
            <motion.span variants={animation}>C</motion.span>
            <motion.span variants={animation}>K</motion.span>
            <motion.span variants={animation}>&#123;</motion.span>
            <motion.span variants={animation} className="text-green-400">
              0
            </motion.span>
            <motion.span variants={animation}>&#125;</motion.span>
            <motion.span variants={animation}>L</motion.span>
            <motion.span variants={animation}>U</motion.span>
            <motion.span variants={animation}>T</motion.span>
            <motion.span variants={animation}>I</motion.span>
            <motion.span variants={animation}>O</motion.span>
            <motion.span variants={animation}>N</motion.span>
          </motion.div>
        </div>

        <div className='flex justify-center items-center pt-2'>
          <div className="text-3xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl z-50 relative text-green-200">
            <span>{days}</span>.<span className="">{hours}</span>.
            <span>{minutes}</span>.
            <span className="">{seconds}</span>
          </div>
        </div>

      </div>
      <BackgroundBeams />
    </div>
  );
}
