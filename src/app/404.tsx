'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Coffee } from 'lucide-react'
import Link from 'next/link'

const funFacts = [
  "Did you know? The first computer bug was an actual bug - a moth found in a Harvard computer in 1947!",
  "Fun fact: The term 'debugging' was coined by Grace Hopper when she found that moth!",
  "Coffee fact: Programmers consume 3x more coffee than the average person ☕",
  "Random fact: There are more possible games of chess than atoms in the observable universe!",
  "Tech fact: The first 1GB hard drive weighed over 500 pounds and cost $40,000!",
  "Code fact: The first computer programmer was Ada Lovelace in 1843!"
]

export default function NotFound() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="text-6xl mb-4"
          >
            🤔
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-foreground-secondary mb-8">
            Looks like this page decided to take a coffee break. ☕
            <br />
            Don't worry, it happens to the best of us!
          </p>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-surface p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">While you're here...</span>
          </div>
          <p className="text-foreground-secondary text-sm leading-relaxed">
            {randomFact}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-foreground font-semibold rounded-full hover:bg-surface/80 border border-white/10 hover:border-primary/30 transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Browse Projects
          </Link>
        </motion.div>

        {/* Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-foreground-secondary text-sm"
        >
          <p>
            Lost? Try the{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>{' '}
            - I promise it exists! 😄
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-accent/10 rounded-full blur-xl"
          />
        </div>
      </div>
    </div>
  )
}
