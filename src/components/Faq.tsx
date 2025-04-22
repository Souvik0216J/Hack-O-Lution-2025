"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/utils/cn"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const faqItems = [
    {
      question: "Who can participate in the hackathon?",
      answer:
        "Anyone 18 years or older can participate, regardless of experience level. We welcome students, professionals, and enthusiasts from all backgrounds. No prior hackathon experience is required!",
    },
    {
      question: "Do I need to have a team before registering?",
      answer:
        "No, you can register individually and form a team during our team formation session on Day 1. However, you're also welcome to register with a pre-formed team of 2-5 members.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "No, participation is completely free. We provide meals, snacks, and beverages throughout the event, as well as a comfortable hacking space and access to mentors and workshops.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, charger, any specific hardware you might need for your project, and personal items for overnight stays. We'll provide power strips, internet, basic hardware components, and a comfortable workspace.",
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer:
        "No, all coding and design must be done during the hackathon. You can come with ideas and plans, but the actual implementation should start after the official kickoff. Using open-source libraries and APIs is allowed.",
    },
    {
      question: "Will there be food and accommodation?",
      answer:
        "Yes, we provide meals and snacks throughout the event. While we don't provide accommodation, we have a rest area for short naps. We can also recommend nearby affordable hotels for participants traveling from other cities.",
    },
    {
      question: "How does the judging process work?",
      answer:
        "Projects will be evaluated by a panel of industry experts based on innovation, technical complexity, design, practicality, and presentation. Each team will have 5 minutes to present their project followed by a brief Q&A with judges.",
    },
    {
      question: "Can I work on a project I've already started?",
      answer:
        "No, all projects must be started from scratch during the hackathon. You can come with ideas, but the implementation should begin after the kickoff. This ensures a fair competition for all participants.",
    },
    {
      question: "Will there be mentors or technical support available?",
      answer:
        "Yes, we'll have mentors from various tech backgrounds to help you with technical challenges, provide feedback, and guide your development process. Technical workshops will also be conducted throughout the event.",
    },
    {
      question: "What happens to the intellectual property of my project?",
      answer:
        "You retain full ownership of everything you build at the hackathon. However, to be eligible for prizes, your solution must be open-sourced (with a license of your choice) so that it can be shared with the community.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section ref={ref} id="faq" className="py-20 md:py-32 min-h-[100vh] relative w-full flex justify-center">
      <motion.div
        className="container px-4 md:px-6"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div variants={item} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm" data-text="FREQUENTLY ASKED QUESTIONS">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about Hack&#123;0&#125;Lution. If you don&#39;t see your question here, feel free to
            contact us.
          </p>
        </motion.div>

        <motion.div variants={item} className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 bg-[#18181B] border-primary/20 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    "border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 bg-",
                    openItem === index ? "bg-[#1a1a1f]" : "bg-[#0a0a0a]",
                  )}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex items-center justify-between w-full p-4 text-left"
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-primary transition-transform duration-300",
                        openItem === index ? "transform rotate-180" : "",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openItem === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-primary/10">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-primary/20 rounded-lg bg-background/50">
              <p className="text-muted-foreground">
                No questions found matching your search. Try different keywords or browse all questions by clearing the
                search.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <Link href="https://discord.gg/hjxtZZXsD4" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
