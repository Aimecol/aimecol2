'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Circle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

// Theme presets for light and dark modes
const themePresets = {
  dark: {
    bg: 'bg-[#030303]',
    bgGradient: 'from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]',
    elegantShapeBg1: 'from-indigo-500/[0.15]',
    elegantShapeBg2: 'from-rose-500/[0.15]',
    elegantShapeBg3: 'from-violet-500/[0.15]',
    elegantShapeBg4: 'from-amber-500/[0.15]',
    elegantShapeBg5: 'from-cyan-500/[0.15]',
    elegantShapeBorder: 'border-white/[0.15]',
    elegantShapeGlow: 'rgba(255,255,255,0.1)',
    elegantShapeRadial: 'rgba(255,255,255,0.2)',
    badgeBg: 'bg-white/[0.03]',
    badgeBorder: 'border-white/[0.08]',
    badgeDot: 'fill-rose-500/80',
    badgeText: 'text-white/60',
    titleGradient: 'from-white to-white/80',
    titleGradient2: 'from-indigo-300 via-white/90 to-rose-300',
    textColor: 'text-white/40',
    overlayGradient: 'from-[#030303] via-transparent to-[#030303]/80',
  },
  light: {
    bg: 'bg-white',
    bgGradient: 'from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]',
    elegantShapeBg1: 'from-indigo-500/[0.08]',
    elegantShapeBg2: 'from-rose-500/[0.08]',
    elegantShapeBg3: 'from-violet-500/[0.08]',
    elegantShapeBg4: 'from-amber-500/[0.08]',
    elegantShapeBg5: 'from-cyan-500/[0.08]',
    elegantShapeBorder: 'border-black/[0.08]',
    elegantShapeGlow: 'rgba(0,0,0,0.05)',
    elegantShapeRadial: 'rgba(0,0,0,0.08)',
    badgeBg: 'bg-black/[0.03]',
    badgeBorder: 'border-black/[0.08]',
    badgeDot: 'fill-rose-600/80',
    badgeText: 'text-black/60',
    titleGradient: 'from-black to-black/80',
    titleGradient2: 'from-indigo-700 via-black/90 to-rose-700',
    textColor: 'text-black/60',
    overlayGradient: 'from-white via-transparent to-white/80',
  },
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
  theme = 'dark',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  theme?: 'dark' | 'light'
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: 'easeInOut',
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px]',
            theme === 'dark' ? 'border-2 border-white/[0.15]' : 'border-2 border-black/[0.08]',
            theme === 'dark'
              ? 'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]'
              : 'shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]',
            'after:absolute after:inset-0 after:rounded-full',
            theme === 'dark'
              ? 'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
              : 'after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  )
}

function HeroGeometric({
  badge = 'Design Collective',
  title1 = 'Elevate Your Digital Vision',
  title2 = 'Crafting Exceptional Websites',
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setCurrentTheme(theme === 'light' ? 'light' : 'dark')
    }
  }, [theme, mounted])

  const themeConfig = themePresets[currentTheme]

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: 'easeInOut' as const,
      },
    }),
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        'relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-300',
        themeConfig.bg
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br blur-3xl',
          themeConfig.bgGradient
        )}
      />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient={`bg-gradient-to-r ${themeConfig.elegantShapeBg1}`}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          theme={currentTheme}
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient={`bg-gradient-to-r ${themeConfig.elegantShapeBg2}`}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          theme={currentTheme}
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient={`bg-gradient-to-r ${themeConfig.elegantShapeBg3}`}
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          theme={currentTheme}
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient={`bg-gradient-to-r ${themeConfig.elegantShapeBg4}`}
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          theme={currentTheme}
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient={`bg-gradient-to-r ${themeConfig.elegantShapeBg5}`}
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          theme={currentTheme}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 md:mb-12 transition-colors duration-300',
              themeConfig.badgeBg,
              `border ${themeConfig.badgeBorder}`
            )}
          >
            <Circle className={cn('h-2 w-2', themeConfig.badgeDot)} />
            <span className={cn('text-sm tracking-wide', themeConfig.badgeText)}>
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  'bg-clip-text text-transparent bg-gradient-to-b transition-colors duration-300',
                  `bg-gradient-to-b ${themeConfig.titleGradient}`
                )}
              >
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  'bg-clip-text text-transparent bg-gradient-to-r transition-colors duration-300',
                  `bg-gradient-to-r ${themeConfig.titleGradient2}`
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p
              className={cn(
                'text-base sm:text-lg md:text-xl mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 transition-colors duration-300',
                themeConfig.textColor
              )}
            >
              Crafting exceptional digital experiences through innovative design
              and cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t pointer-events-none transition-colors duration-300',
          themeConfig.overlayGradient
        )}
      />
    </div>
  )
}

export { HeroGeometric }
