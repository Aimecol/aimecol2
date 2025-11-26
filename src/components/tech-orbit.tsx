'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const technologies = [
  { name: 'Next.js', color: '#000000', size: 'large' as const },
  { name: 'Tailwind', color: '#06B6D4', size: 'medium' as const },
  { name: 'Node.js', color: '#339933', size: 'large' as const },
  { name: 'Prisma', color: '#2D3748', size: 'medium' as const },
  { name: 'MySQL', color: '#4479A1', size: 'large' as const },
  { name: 'GitHub', color: '#181717', size: 'medium' as const },
  { name: 'Flutter', color: '#02569B', size: 'large' as const },
  { name: 'PHP', color: '#F24E1E', size: 'medium' as const }
]

const sizeMap = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
}

// Elegant shapes configuration
interface ElegantShapeConfig {
  delay: number
  width: number
  height: number
  rotate: number
  gradient: string
  position: string
}

const shapeConfigs: ElegantShapeConfig[] = [
  {
    delay: 0.2,
    width: 300,
    height: 80,
    rotate: 15,
    gradient: 'from-primary/20 via-transparent',
    position: 'top-[5%] left-[-5%] md:left-0',
  },
  {
    delay: 0.4,
    width: 250,
    height: 70,
    rotate: -20,
    gradient: 'from-accent/15 via-transparent',
    position: 'bottom-[10%] right-[-5%] md:right-0',
  },
  {
    delay: 0.3,
    width: 200,
    height: 60,
    rotate: 25,
    gradient: 'from-primary/15 via-transparent',
    position: 'top-[50%] right-[-10%] md:right-[-5%]',
  },
  {
    delay: 0.5,
    width: 280,
    height: 75,
    rotate: -15,
    gradient: 'from-accent/18 via-transparent',
    position: 'top-[20%] right-[-8%] md:right-[-3%]',
  },
  {
    delay: 0.25,
    width: 220,
    height: 65,
    rotate: 20,
    gradient: 'from-primary/18 via-transparent',
    position: 'bottom-[25%] left-[-8%] md:left-[-3%]',
  },
  {
    delay: 0.35,
    width: 260,
    height: 72,
    rotate: -12,
    gradient: 'from-accent/16 via-transparent',
    position: 'top-[35%] left-[-12%] md:left-[-5%]',
  },
]

// Theme presets for light and dark modes
const themePresets = {
  dark: {
    bg: 'py-24 bg-background',
    containerBg: 'bg-background',
    centerGradient: 'from-primary to-accent',
    centerText: 'text-white',
    orbitBorder1: 'border-primary/20',
    orbitBorder2: 'border-accent/10',
    orbitRotate1: 'rotate',
    orbitRotate2: '-rotate',
    particleBg: 'bg-primary/30',
    tooltipBg: 'bg-surface',
    tooltipText: 'text-foreground',
  },
  light: {
    bg: 'py-24 bg-white',
    containerBg: 'bg-white',
    centerGradient: 'from-orange-500 to-blue-600',
    centerText: 'text-white',
    orbitBorder1: 'border-orange-500/20',
    orbitBorder2: 'border-blue-600/10',
    orbitRotate1: 'rotate',
    orbitRotate2: '-rotate',
    particleBg: 'bg-orange-500/30',
    tooltipBg: 'bg-gray-100',
    tooltipText: 'text-gray-900',
  },
}

interface TechOrbProps {
  tech: typeof technologies[0]
  index: number
  radius: number
  centerX: number
  centerY: number
}

function ElegantShape({
  config,
  theme,
}: {
  config: ElegantShapeConfig
  theme: 'dark' | 'light'
}) {
  const borderColor = theme === 'light' ? 'border-black/[0.08]' : 'border-white/[0.15]'
  const shadowColor = theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
  const radialColor = theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.2)'

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
        rotate: config.rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: config.rotate,
      }}
      transition={{
        duration: 2,
        delay: config.delay,
        ease: 'easeInOut',
        opacity: { duration: 1 },
      }}
      className={`absolute pointer-events-none ${config.position}`}
    >
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width: config.width,
          height: config.height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} to-transparent backdrop-blur-[2px] border ${borderColor} after:absolute after:inset-0 after:rounded-full`}
          style={{
            boxShadow: `0 8px 32px 0 ${shadowColor}`,
            backgroundImage: `radial-gradient(circle at 50% 50%, ${radialColor}, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

interface TechOrbProps {
  tech: typeof technologies[0]
  index: number
  radius: number
  centerX: number
  centerY: number
}

function TechOrb({ tech, index, radius, centerX, centerY }: TechOrbProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    setMounted(true)
    setCurrentTheme(theme === 'light' ? 'light' : 'dark')
  }, [theme])

  if (!mounted) {
    return null
  }

  const tooltipTheme = currentTheme === 'light'
    ? { bg: 'bg-gray-100', text: 'text-gray-900' }
    : { bg: 'bg-surface', text: 'text-foreground' }
  const angle = (index / technologies.length) * 2 * Math.PI
  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)

  return (
    <motion.div
      className={`absolute ${sizeMap[tech.size]} rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer group transition-all duration-300`}
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
        {tech.name.slice(0, tech.size === 'medium' ? 3 : 4)}
      </span>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 ${tooltipTheme.bg} ${tooltipTheme.text} text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20`}>
        {tech.name}
      </div>
    </motion.div>
  )
}

export function TechOrbit() {
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 })
  const [isClient, setIsClient] = useState(false)
  const [particles] = useState(() =>
    [...Array(6)].map(() => ({
      left: Math.random() * 400,
      top: Math.random() * 400,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  )
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    setIsClient(true)
    setMounted(true)
    setCurrentTheme(theme === 'light' ? 'light' : 'dark')
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.9, 700)
      const height = Math.min(window.innerHeight * 0.7, 700)
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (mounted) {
      setCurrentTheme(theme === 'light' ? 'light' : 'dark')
    }
  }, [theme, mounted])

  const themeConfig = themePresets[currentTheme]

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const radius = Math.min(centerX, centerY) - 80

  return (
    <div className={`flex items-center justify-center transition-colors duration-300`}>
      {/* Elegant Shapes Background */}
      <div className="absolute z-0 inset-0 overflow-hidden">
        {shapeConfigs.map((config, idx) => (
          <ElegantShape key={idx} config={config} theme={currentTheme} />
        ))}
      </div>
      <div className={`relative transition-colors duration-300 overflow-hidden z-50`} style={{ width: dimensions.width, height: dimensions.height }}>

        {/* Central Avatar/Logo */}
        <motion.div
          className={`absolute w-24 h-24 bg-gradient-to-r ${themeConfig.centerGradient} rounded-full flex items-center justify-center ${themeConfig.centerText} font-bold text-2xl transition-all duration-300 z-10`}
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
          className={`absolute border ${themeConfig.orbitBorder1} rounded-full transition-colors duration-300 z-10`}
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
          className={`absolute border ${themeConfig.orbitBorder2} rounded-full transition-colors duration-300 z-10`}
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
        <div className="relative z-20">
          {isClient && technologies.map((tech, index) => (
            <TechOrb
              key={tech.name}
              tech={tech}
              index={index}
              radius={radius}
              centerX={centerX}
              centerY={centerY}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
