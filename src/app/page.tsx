"use client"
import { motion, Variants } from 'framer-motion'
import { useTimer } from 'react-timer-hook'
import MusicButton from '@/components/Music'
import { Spotlight } from '@/components/ui/spotlight-new';
import Faq from '@/components/Faq';
import StarsCanvas from '@/components/ui/star-canvas';
import TeamMembers from '@/components/Team'
import AnimatedSnippet from '@/components/AnimatedSnippet'
import { AboutCard } from "@/components/AboutCard"
import PrizeCard from '@/components/PrizeCard';

export default function Home() {
  // Time counter
  const eventDate = new Date('June 26, 2025 17:30:00')

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

            </div>
          </div>
        </div>
        <AnimatedSnippet />
      </div>

      <section id="about" className="pt-20 pb-16 bg-gradient-to-b">
        <AboutCard />
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="HACKOLUTION PRIZES">
            HACK&#123;<span className="text-green-400">0</span>&#125;LUTION PRIZES
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Exciting rewards await the brightest minds and boldest ideas!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 mb-10">
          <PrizeCard rank="2nd" amount="₹15,000" color="silver" />
          <PrizeCard rank="1st" amount="₹25,000" color="gold" size="large" />
          <PrizeCard rank="3rd" amount="₹10,000" color="bronze" />
        </div>

      </section>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="STORY OF HACKOLUTION">
        HACK&#123;<span className="text-green-400">0</span>&#125;LUTION CORE TEAM
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-4">
       The driving force making HACK&#123;<span className="text-green-400">0</span>&#125;LUTION possible.
      </p>
      <TeamMembers />
      <Faq />
    </>
  );
}