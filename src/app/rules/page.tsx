"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight-new'

function RulesPage() {
  const animation: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.8,
        staggerChildren: 0.05,
      },
    },
  }

  const ruleAnimation: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        duration: 0.6,
      },
    },
  }

  const rules = [
    "The decisions of the faculty coordinators and admins regarding any rule violations are final and binding.",
    "Any misbehaviour or inappropriate conduct by any team member will result in the disqualification of the entire team.",
    "All participants must treat others with respect at all times; harassment, discrimination, or abuse of any kind will not be tolerated.",
    "Any form of harassment, including but not limited to offensive verbal comments, deliberate intimidation, or inappropriate physical contact, will result in immediate removal from the event.",
    "Participants are required to bring their own laptops, chargers, and any other necessary accessories. The college will not provide any devices or equipment.",
    "Participants are responsible for the safety and security of their personal belongings throughout the event.",
    "Projects must be developed during the hackathon. Plagiarism or submission of previously developed projects is strictly prohibited.",
    "If any part of your project re-uses code from previous work, you must clearly disclose this in your submission, specifying the extent and purpose of the re-used code.",
    "Failure to disclose re-used code or previously submitted projects will result in disqualification from awards and/or the event.",
    "Organizers reserve the right to inspect submissions for originality and request clarification on similarities to previous work.",
    "Teams must consist of 2 to 4 members as specified by the event guidelines.",
    "All teams must register before the deadline. Late registrations will not be accepted.",
    "All team members must be present at the venue for the duration of the hackathon unless prior permission is granted by the organizers.",
    "Participants must check in at the registration desk upon arrival and check out when leaving the venue.",
    "Collaboration between teams is not allowed unless explicitly permitted by the organizers.",
    "Use of external help (mentors, internet forums, etc.) is only allowed within the guidelines provided by the organizers.",
    "Any attempt to sabotage other teams or interfere with their work will lead to immediate disqualification.",
    "The decision of the judging panel is final and cannot be contested.",
    "Only teams that adhere to all rules and complete their submissions by the deadline will be eligible for awards.",
    "Organizers reserve the right to modify or update the rules at any time. Any changes will be communicated to all participants promptly."
  ]

  return (
    <div className="min-h-screen w-full rounded-md relative flex flex-col items-center antialiased overflow-hidden">
      <Spotlight />

      {/* Header Section */}
      <div className="w-full max-w-6xl mx-auto p-4 pt-20">
        <motion.div
          variants={animation}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          <div className="max-w-[84rem] mx-auto px-8 pt-12">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm" data-text="STORY OF HACKOLUTION">
                RULES &amp; REGULATIONS
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Read carefully and follow these guidelines to ensure a fair and productive hackathon experience for everyone.
              </p>
            </div>
          </div>

        </motion.div>

        {/* Rules Grid */}
        <motion.div
          variants={animation}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:gap-8 max-w-5xl mx-auto pb-20"
        >
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              variants={ruleAnimation}
              className="group relative"
            >
              {/* Rule Card */}
              <div className="bg-black backdrop-blur-sm border border-neutral-800 rounded-lg p-6 hover:border-green-400/50 cursor-pointer transition-all duration-300 hover:bg-[#0a0a0a]">
                <div className="flex items-start gap-4">
                  {/* Rule Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-black font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Rule Content */}
                  <div className="flex-1">
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      {rule}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-green-400/30 pointer-events-none transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Warning */}
        <motion.div
          variants={animation}
          initial="hidden"
          animate="show"
          className="text-center pb-20"
        >
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h3 className="text-red-400 text-xl font-bold">IMPORTANT NOTICE</h3>
            </div>
            <p className="text-red-200 text-lg">
              Violation of any rule may result in immediate disqualification.
              All decisions made by the organizing committee are final and binding.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RulesPage
