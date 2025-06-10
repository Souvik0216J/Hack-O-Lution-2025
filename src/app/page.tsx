"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { useTimer } from 'react-timer-hook'
import MusicButton from '@/components/Music'
import { Spotlight } from '@/components/ui/spotlight-new'
import Faq from '@/components/Faq'
import StarsCanvas from '@/components/ui/star-canvas'
import TeamMembers from '@/components/Team'
import AnimatedSnippet from '@/components/AnimatedSnippet'
import { AboutCard } from "@/components/AboutCard"
import PrizeCard from '@/components/PrizeCard'
import AdvancedFooter from '@/components/AdvancedFooter'
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  // Time counter
  const eventDate = new Date('June 26, 2025 17:30:00')
  const [showScrollUp, setShowScrollUp] = useState<boolean>(false)

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollUp(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
      name: "Raihan Khan",
      title: "Founding AI Engineer Wyzr",
      // expertise: "AI/ML",
      image: "/mentors/rk.jpeg", // Add actual image paths
      linkedin: "https://www.linkedin.com/in/raihankhan-rk"
    },
    {
      name: "Alik Agarwala",
      title: "Co founder of Not Zero",
      // expertise: "AI/ML, Full Stack Development",
      image: "/mentors/av.jpg", // Add actual image paths
      linkedin: "https://www.linkedin.com/in/alik-agarwala"
    },
    {
      name: "Avik Agarwala",
      title: "Co founder of Not Zero",
      // expertise: "AI/ML, Full Stack Development",
      image: "/mentors/ab.jpeg", // Add actual image paths
      linkedin: "https://www.linkedin.com/in/avikagarwala"
    },
    {
      name: "Krishnendu Dasgupta",
      title: "Backend Associate Consultant at Altor(Shark Tank India)",
      // expertise: "AI/ML, Full Stack Development",
      image: "/mentors/kd.jpg", // Add actual image paths
      linkedin: "https://www.linkedin.com/in/krishnendudg"
    },
    {
      name: "Rajdeep Banerjee",
      title: "Conding Instructor at Not Zero",
      // expertise: "AI/ML, Full Stack Development",
      image: "/mentors/rb.jpg", // Add actual image paths
      linkedin: "https://www.linkedin.com/in/banerjeerajdeep"
    },
  ];

  // Partners data (replace with actual partner information)
  // const goldSponsors = [
  //   {
  //     name: "test",
  //     logo: "test",
  //     website: "test"
  //   }
  // ];

  // const technicalSponsors = [
  //   {
  //     name: "test",
  //     subtitle: "test",
  //     logo: "test",
  //     website: "test"
  //   }
  // ];

  const communityPartners = [
    {
      name: "NooBuild",
      logo: "/partners/nobuild.jpg",
      website: "https://www.instagram.com/noobuild.community?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      name: "innofusion",
      logo: "/partners/innoFusion.jpg",
      website: "https://www.innofusion.tech"
    },
    {
      name: "Repositry",
      logo: "/partners/Repositry.png",
      website: "https://repository-main.vercel.app"
    },
    {
      name: "Sourcify",
      logo: "/partners/socialWhite.png",
      website: "https://www.instagram.com/sourcifyin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      name: "Digital Dominators",
      logo: "/partners/digitalDominators.png",
      website: "https://www.instagram.com/digital_dominators?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      name: "Apex Circle",
      logo: "/partners/apexCircle.jpg",
      website: "https://www.linkedin.com/company/apex-circle-official"
    },
  ];

  const technicalPartners = [
    {
      name: "GDG IEM, Kolkata",
      logo: "/partners/iemGdg.jpg",
      website: "https://www.instagram.com/gdg_iem?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
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
            {/* <div className="text-center mt-10 mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-400">To Be Announced</h1>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center relative">
                    {mentor.image ? (
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                        onError={() => {
                          // Handle error state - you might want to use a state to show fallback
                          console.log(`Failed to load image for ${mentor.name}`);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{mentor.name}</h3>
                  <p className="text-green-400 text-sm mb-4">{mentor.title}</p>

                  {/* LinkedIn Link */}
                  {mentor.linkedin && (
                    <div className="flex justify-center">
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  )}

                  {/* <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs">
                      Available for Guidance
                    </span>
                  </div> */}
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="pt-20 pb-16 bg-gradient-to-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 glitch-text-sm text-center" data-text="HACKOLUTION PARTNERS">
              HACK&#123;<span className="text-green-400">0</span>&#125;LUTION PARTNERS
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Proudly supported by our partners.
            </p>
          </div>

          {/* Community Partners */}
          {communityPartners && communityPartners.length > 0 && (
            <div className="mb-20 ">
              <h3 className="text-2xl font-bold mb-6 text-green-400 tracking-wider text-center">
                Community Partners
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {communityPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-green-400 cursor-pointer transition-all duration-300 transform hover:scale-105 flex items-center justify-center max-w-sm"
                    onClick={() => window.open(partner.website, '_blank')}
                  >
                    <div className="w-full h-16 bg-black/60 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        className="h-full w-full object-contain"
                        width={300}
                        height={64}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {technicalPartners && technicalPartners.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-6 text-green-400 tracking-wider text-center">
                Technical Partners
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {technicalPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-green-400 cursor-pointer transition-all duration-300 transform hover:scale-105 flex items-center justify-center max-w-sm"
                    onClick={() => window.open(partner.website, '_blank')}
                  >
                    <div className="w-full h-16 bg-black/60 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        className="h-full w-full object-contain"
                        width={300}
                        height={64}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
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
      <AdvancedFooter />

      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-green-400 hover:bg-green-500 cursor-pointer text-black rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${showScrollUp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: showScrollUp ? 1 : 0,
          y: showScrollUp ? 0 : 40
        }}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
      </motion.button>
    </>
  );
}