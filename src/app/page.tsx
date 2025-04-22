"use client"
import { motion, Variants } from 'framer-motion'
import { useTimer } from 'react-timer-hook'
// import { BackgroundBeams } from "../components/ui/background-beams";
import { MarqueImg } from '@/components/MarqueImg'
import { Spotlight } from '@/components/ui/spotlight-new';
import Faq from '@/components/Faq';
import StarsCanvas from '@/components/ui/star-canvas';

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
    <>
      <div className="h-[100vh] w-screen rounded-md relative flex flex-col items-center justify-center antialiased overflow-hidden">
        <StarsCanvas /> 
        <Spotlight />
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center text-center justify-center">
            <motion.div
              variants={animation}
              initial="hidden"
              animate="show"
              className="text-4xl xs:text-4xl sm:text-6xl md:text-8xl lg-text-10xl font-medium mt-9 z-10"
            >
              <motion.span variants={animation}>H</motion.span>
              <motion.span variants={animation}>A</motion.span>
              <motion.span variants={animation}>C</motion.span>
              <motion.span variants={animation}>K</motion.span>
              <motion.span variants={animation}>&#123;</motion.span>
              <motion.span variants={animation} className="text-green-400">0</motion.span>
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
            <div className="text-center text-3xl xs:text-3xl sm:text-5xl md:text-7xl z-10 relative text-green-200">
              <motion.div
                variants={animation}
                initial="hidden"
                animate="show"
              >
                <motion.span variants={animation}><span>{days}</span></motion.span>
                <motion.span variants={animation}>.<span>{hours}</span>.</motion.span>
                <motion.span variants={animation}><span>{minutes}</span>.</motion.span>
                <motion.span variants={animation}><span>{seconds}</span></motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <MarqueImg />
      <Faq />
    </>
  );
}