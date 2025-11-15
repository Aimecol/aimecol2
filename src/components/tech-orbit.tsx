'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const technologies = [
  { name: 'React', color: '#61DAFB', size: 'large' as const },
  { name: 'Next.js', color: '#000000', size: 'large' as const },
  { name: 'TypeScript', color: '#3178C6', size: 'medium' as const },
  { name: 'Node.js', color: '#339933', size: 'large' as const },
  { name: 'Flutter', color: '#02569B', size: 'medium' as const },
  { name: 'Figma', color: '#F24E1E', size: 'medium' as const },
  { name: 'PostgreSQL', color: '#336791', size: 'small' as const },
  { name: 'Tailwind', color: '#06B6D4', size: 'medium' as const },
  { name: 'Firebase', color: '#FFCA28', size: 'small' as const },
  { name: 'Prisma', color: '#2D3748', size: 'small' as const },
  { name: 'Vercel', color: '#000000', size: 'small' as const },
  { name: 'Git', color: '#F05032', size: 'small' as const }
]

const sizeMap = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16'
}

interface TechOrbProps {
  tech: typeof technologies[0]
  index: number
  radius: number
  centerX: number
  centerY: number
}

function TechOrb({ tech, index, radius, centerX, centerY }: TechOrbProps) {
  const angle = (index / technologies.length) * 2 * Math.PI
  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)

  return (
    <motion.div
      className={`absolute ${sizeMap[tech.size]} rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer group`}
      style={{
        backgroundColor: tech.color,
        left: x - (tech.size === 'large' ? 32 : tech.size === 'medium' ? 24 : 16),
        top: y - (tech.size === 'large' ? 32 : tech.size === 'medium' ? 24 : 16),
      }}
      animate={{
        x: [0, Math.cos(angle + Math.PI/4) * 10, 0],
        y: [0, Math.sin(angle + Math.PI/4) * 10, 0],
      }}
      transition={{
        duration: 4 + index * 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.2,
        zIndex: 10,
        boxShadow: `0 0 20px ${tech.color}50`
      }}
    >
      <span className="text-[8px] sm:text-xs font-bold">
        {tech.name.slice(0, tech.size === 'small' ? 2 : tech.size === 'medium' ? 3 : 4)}
      </span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
        {tech.name}
      </div>
    </motion.div>
  )
}

export function TechOrbit() {
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 })
  const [isClient, setIsClient] = useState(false)
  const [particles] = useState(() =>
    [...Array(6)].map(() => ({
      left: Math.random() * 400,
      top: Math.random() * 400,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  )

  useEffect(() => {
    setIsClient(true)
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.8, 500)
      const height = Math.min(window.innerHeight * 0.6, 500)
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const radius = Math.min(centerX, centerY) - 50

  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* Central Avatar/Logo */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl"
          style={{
            left: centerX - 48,
            top: centerY - 48,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          AC
        </motion.div>

        {/* Orbit Rings */}
        <motion.div
          className="absolute border border-primary/20 rounded-full"
          style={{
            width: radius * 2,
            height: radius * 2,
            left: centerX - radius,
            top: centerY - radius,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute border border-accent/10 rounded-full"
          style={{
            width: (radius + 30) * 2,
            height: (radius + 30) * 2,
            left: centerX - radius - 30,
            top: centerY - radius - 30,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Technology Orbs */}
        {technologies.map((tech, index) => (
          <TechOrb
            key={tech.name}
            tech={tech}
            index={index}
            radius={radius}
            centerX={centerX}
            centerY={centerY}
          />
        ))}

        {/* Floating Particles */}
        {isClient && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}
