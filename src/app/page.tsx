"use client"
import { motion, Variants } from 'framer-motion'
import { useTimer } from 'react-timer-hook'
import MusicButton from '@/components/Music'
import { MarqueImg } from '@/components/MarqueImg'
import { Spotlight } from '@/components/ui/spotlight-new';
import Faq from '@/components/Faq';
import StarsCanvas from '@/components/ui/star-canvas';
import TeamMembers from '@/components/Team'
import { AnimatePresence } from 'framer-motion'
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { useState, useEffect } from 'react'

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ["Are You Ready?", "Join The Revolution", "Code. Create. Conquer"];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="h-[100vh] w-screen rounded-md relative flex flex-col items-center justify-center antialiased overflow-hidden">
        <StarsCanvas />
        <Spotlight />
        <MusicButton />
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center text-center justify-center">
            <motion.div
              variants={animation}
              initial="hidden"
              animate="show"
              className="text-5xl xs:text-5xl sm:text-8xl md:text-9xl lg-text-11xl font-medium mt-9 z-10"
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

              {/* Animated Snippet */}
              {/* <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-20"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Snippet
                    hideCopyButton
                    hideSymbol
                    variant="bordered"
                    className="backdrop-blur-xl"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={textIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="md:text-xl inline-block">
                          {phrases[textIndex]}{' '}
                          <Code color="danger" className="md:text-xl">
                            IEM/Ashram
                          </Code>
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </Snippet>
                </motion.div>
              </motion.div> */}

            </div>
          </div>
        </div>
      </div>

      {/* <section id="about" className="pt-20">
        <h2 className="text-3xl font-bold text-center">About</h2>
        <p className="mt-4 text-center">Here are the about you must follow...</p>
      </section>

      <section id="rules" className="pt-20">
        <h2 className="text-3xl font-bold text-center">Rules</h2>
        <p className="mt-4 text-center">Here are the rules you must follow...</p>
      </section>
       */}
      <MarqueImg />
      <TeamMembers />
      <Faq />
    </>
  );
}