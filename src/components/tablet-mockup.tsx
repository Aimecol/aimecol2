'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Tablet, ExternalLink, Github } from 'lucide-react'

interface TabletMockupProps {
  title: string
  description: string
  color: string
  screens: { name: string; image: string }[]
  technologies: string[]
  links: { demo: string; github: string }
  isActive?: boolean
  onClick?: () => void
}

export function TabletMockup({ 
  title, 
  description, 
  color, 
  screens, 
  technologies, 
  links,
  isActive = false,
  onClick 
}: TabletMockupProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isRotated, setIsRotated] = useState(false)

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ perspective: '1200px' }}
    >
      {/* Tablet Device */}
      <motion.div
        className="relative"
        animate={{ 
          rotateY: isRotated ? 15 : 0,
          rotateX: isRotated ? -5 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onHoverStart={() => setIsRotated(true)}
        onHoverEnd={() => setIsRotated(false)}
      >
        {/* Tablet Frame */}
        <div className="w-72 h-96 bg-gray-800 rounded-3xl p-4 shadow-2xl relative">
          {/* Home Button */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
            {/* Screen Content */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`w-full h-full bg-gradient-to-br ${color} opacity-20 absolute inset-0`}></div>
              
              {/* App Interface */}
              <div className="relative z-10 text-center p-8">
                {/* App Icon */}
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl">
                  <Tablet className="w-10 h-10 text-gray-600" />
                </div>
                
                {/* App Info */}
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-xs">
                  {description}
                </p>
                
                {/* Screen Navigation */}
                <div className="flex justify-center gap-3 mb-4">
                  {screens.map((screen, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentScreen(index)
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        currentScreen === index 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                      }`}
                    >
                      {screen.name}
                    </button>
                  ))}
                </div>
                
                {/* Current Screen Indicator */}
                <div className="text-xs text-gray-500 mb-4">
                  Screen: {screens[currentScreen].name}
                </div>
                
                {/* Mock Interface Elements */}
                <div className="space-y-2">
                  <div className="h-2 bg-gray-300 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-2 bg-gray-300 rounded-full w-1/2 mx-auto"></div>
                  <div className="h-2 bg-gray-300 rounded-full w-2/3 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Status Indicators */}
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
        >
          ✓
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
        >
          📱
        </motion.div>
      </motion.div>
      
      {/* Project Details */}
      <div className="mt-8 text-center max-w-sm mx-auto">
        {/* Technologies */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-surface text-foreground-secondary text-xs rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <motion.a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </motion.a>
          <motion.a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-surface text-foreground-secondary text-sm font-medium rounded-lg hover:bg-surface/80 border border-white/10 hover:border-primary/30 transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
