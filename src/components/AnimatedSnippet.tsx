import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom type for our phrases and highlighted words
interface PhrasePair {
  text: string;
  highlight: string;
}

const AnimatedSnippet: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  
  // Define phrases with their highlighted last words
  const phrases: PhrasePair[] = [
    { text: "Are You", highlight: "Ready?" },
    { text: "Join The", highlight: "Revolution" },
    { text: "Code Create", highlight: "Conquer" },
    { text: "Registration is", highlight: "Live" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="relative z-20"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-row items-center rounded-lg border border-gray-700 bg-black/30 px-4 py-2 backdrop-blur-xl">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm sm:text-xl inline-block">
                  {phrases[textIndex].text}{' '}
                  <span className="bg-red-500/20 text-red-400 px-1 py-0.5 rounded-sm font-mono md:text-xl">
                    {phrases[textIndex].highlight}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedSnippet;