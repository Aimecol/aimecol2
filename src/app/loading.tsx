'use client'

import { motion } from 'framer-motion'

const loadingMessages = [
  "Brewing some fresh code...",
  "Optimizing pixels...",
  "Compiling creativity...",
  "Loading awesome content...",
  "Preparing digital magic...",
  "Crafting user experience..."
]

export default function Loading() {
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">AC</span>
          </div>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
        />

        {/* Loading Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-foreground-secondary"
        >
          {randomMessage}
        </motion.p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
