'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Smartphone, Monitor, Tablet } from 'lucide-react'

interface FloatingDeviceProps {
  type: 'phone' | 'desktop' | 'tablet'
  title: string
  color: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function FloatingDevice({ 
  type, 
  title, 
  color, 
  size = 'medium',
  className = '' 
}: FloatingDeviceProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    phone: {
      small: 'w-16 h-28',
      medium: 'w-20 h-36',
      large: 'w-24 h-44'
    },
    desktop: {
      small: 'w-24 h-16',
      medium: 'w-32 h-20',
      large: 'w-40 h-26'
    },
    tablet: {
      small: 'w-20 h-28',
      medium: 'w-24 h-32',
      large: 'w-28 h-36'
    }
  }

  const DeviceIcon = type === 'phone' ? Smartphone : type === 'desktop' ? Monitor : Tablet

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Device Frame */}
      <motion.div
        className={`${sizeClasses[type][size]} bg-gray-800 rounded-lg relative shadow-2xl cursor-pointer`}
        whileHover={{ scale: 1.1, rotateY: 10 }}
        transition={{ duration: 0.3 }}
        style={{ perspective: '1000px' }}
      >
        {/* Screen */}
        <div className="w-full h-full bg-black rounded-md overflow-hidden relative p-1">
          {type === 'phone' && (
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
          )}
          
          {type === 'desktop' && (
            <div className="h-2 bg-gray-200 flex items-center px-1 gap-1">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          )}
          
          <div className={`w-full ${type === 'desktop' ? 'h-full mt-0.5' : 'h-full'} bg-gradient-to-br ${color} opacity-80 rounded-sm flex items-center justify-center relative overflow-hidden`}>
            {/* Content */}
            <div className="relative z-10 text-center">
              <DeviceIcon className={`w-${size === 'small' ? '3' : size === 'medium' ? '4' : '6'} h-${size === 'small' ? '3' : size === 'medium' ? '4' : '6'} text-white mx-auto mb-1 opacity-80`} />
              {size !== 'small' && (
                <div className="text-white text-xs font-medium opacity-90">
                  {title.slice(0, 8)}
                </div>
              )}
            </div>
            
            {/* Animated Background Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white rounded-full blur-xl"
            />
          </div>
        </div>
        
        {/* Device-specific details */}
        {type === 'phone' && (
          <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 rounded-full"></div>
        )}
        
        {type === 'desktop' && (
          <>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-600 rounded-b-sm"></div>
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gray-500 rounded-full"></div>
          </>
        )}
      </motion.div>
      
      {/* Hover Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          y: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface text-foreground text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg border border-white/10 z-20"
      >
        {title}
      </motion.div>
      
      {/* Floating Particles */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              className={`absolute top-0 left-1/2 w-1 h-1 bg-gradient-to-r ${color} rounded-full`}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

// Preset configurations for common use cases
export const DevicePresets = {
  mobileApp: {
    type: 'phone' as const,
    color: 'from-green-500 to-emerald-500',
    title: 'Mobile App'
  },
  webApp: {
    type: 'desktop' as const,
    color: 'from-blue-500 to-cyan-500',
    title: 'Web App'
  },
  tabletApp: {
    type: 'tablet' as const,
    color: 'from-purple-500 to-pink-500',
    title: 'Tablet App'
  }
}
