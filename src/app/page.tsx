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
import AdvancedFooter from '@/components/AdvancedFooter';

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

  const mentors = [
    {
      name: "Dr. Sarah Johnson",
      title: "Senior Software Engineer at Google",
      expertise: "AI/ML, Full Stack Development",
      image: "/mentors/sarah.jpg", // Add actual image paths
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      name: "Alex Chen",
      title: "CTO at TechStartup",
      expertise: "Blockchain, Cybersecurity",
      image: "/mentors/alex.jpg",
      linkedin: "https://linkedin.com/in/alexchen"
    },
    {
      name: "Maria Rodriguez",
      title: "Product Manager at Microsoft",
      expertise: "Product Strategy, UX Design",
      image: "/mentors/maria.jpg",
      linkedin: "https://linkedin.com/in/mariarodriguez"
    }
  ];

  // Partners data (replace with actual partner information)
  const partners = [
    {
      name: "TechCorp",
      logo: "/partners/techcorp.png",
      website: "https://techcorp.com",
      tier: "Platinum"
    },
    {
      name: "StartupHub",
      logo: "/partners/startuphub.png",
      website: "https://startuphub.com",
      tier: "Gold"
    },
    {
      name: "DevTools Inc",
      logo: "/partners/devtools.png",
      website: "https://devtools.com",
      tier: "Silver"
    }
  ];

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
          <PrizeCard rank="2nd" amount="₹10,000" color="silver" />
          <PrizeCard rank="1st" amount="₹15,000" color="gold" size="large" />
          <PrizeCard rank="3rd" amount="₹5,000" color="bronze" />
        </div>

      </section>
      {/* Mentors Section */}
      <section id="mentors" className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="HACKOLUTION MENTORS">
              HACK&#123;<span className="text-green-400">0</span>&#125;LUTION MENTORS
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Learn from industry experts who will guide you throughout your hackathon journey.
            </p>
            <div className="text-center mt-10 mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-400">To Be Announced</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-2xl font-bold">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{mentor.name}</h3>
                  <p className="text-green-400 text-sm mb-2">{mentor.title}</p>
                  <p className="text-gray-300 text-sm mb-4">{mentor.expertise}</p>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs">
                      Available for Guidance
                    </span>
                  </div>
                </div>
              </motion.div>
            ))} */}

          </div>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section id="partners" className="pt-20 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="HACKOLUTION PARTNERS">
              HACK&#123;<span className="text-green-400">0</span>&#125;LUTION PARTNERS
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Proudly supported by leading organizations in technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{partner.name[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${partner.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-400' :
                    partner.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                    {partner.tier} Partner
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Supporting innovation and excellence</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="STORY OF HACKOLUTION">
        HACK&#123;<span className="text-green-400">0</span>&#125;LUTION CORE TEAM
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-4">
        The driving force making HACK&#123;<span className="text-green-400">0</span>&#125;LUTION possible.
      </p>
      <TeamMembers />
      <Faq />
      <AdvancedFooter />
    </>
  );
}