'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { BackgroundPaths } from '@/components/ui/background-paths'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

const roles = [
  "Fullstack Developer",
  "UI/UX Designer", 
  "Mobile Innovator",
  "System Architect",
  "Creative Thinker"
]

export function EnhancedHero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Paths Layer */}
      <div className="absolute inset-0 opacity-30">
        <BackgroundPaths title="" />
      </div>
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-surface/60 to-background/80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(215, 123, 53, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0, 76, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(215, 123, 53, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(215, 123, 53, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-lg text-foreground-secondary mb-2">
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl"
                >
                  👋
                </motion.span>
                Hi, I'm
              </span>
              <h1 className="text-2xl lg:text-4xl font-bold">
                <span className="gradient-text">MAZIMPAKA Aime Claudien</span>
              </h1>
            </motion.div>

            {/* Animated Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="text-xl md:text-2xl text-foreground-secondary mb-4">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block font-semibold text-primary"
                >
                  {roles[currentRole]}
                </motion.span>
                <span className="text-foreground-secondary"> | </span>
                <span className="text-accent">Innovator</span>
              </div>
              
              {/* Animated Tagline */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-2xl md:text-2xl font-bold mb-6"
              >
                Building ideas that{' '}
                <motion.span
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent"
                >
                  move
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-foreground-secondary mb-8 max-w-2xl"
            >
              Passionate about creating digital experiences that matter. From web applications 
              to mobile innovations, I bring ideas to life with modern technology and thoughtful design.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.a
                href='/projects'
                onClick={scrollToProjects}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View My Work
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-center"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/aimecol', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/aimecol', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:hello@aimecol.dev', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-surface border border-white/10 rounded-full flex items-center justify-center text-foreground-secondary hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Avatar/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* Central Avatar */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 overflow-hidden"
            >
              {/* Avatar Content */}
              <div className="w-64 h-64 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl overflow-hidden">
                <Image src="https://images.aimecol.com/uploads/large/emy-00892_691c4620cb91d_large.jpg" alt="Aime Claudien" fill className="object-cover object-top" />
              </div>
              
              {/* Orbiting Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0"
                >
                  <div 
                    className="absolute w-4 h-4 bg-primary rounded-full"
                    style={{
                      top: '10%',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating Code Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 bg-surface p-4 rounded-lg border border-white/10 shadow-lg"
            >
              <div className="text-xs text-primary font-mono">
                {'<Developer />'}
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, -10, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-10 left-10 bg-surface p-4 rounded-lg border border-white/10 shadow-lg"
            >
              <div className="text-xs text-accent font-mono">
                {'{ innovation: true }'}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.button
            onClick={scrollToProjects}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-foreground-secondary hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced Hero with Scroll Animation
export function EnhancedHeroWithScroll() {
  return (
    <div className="w-full">
      {/* Original Hero Section */}
      <EnhancedHero />
      
      {/* Container Scroll Animation Section */}
      <div className="relative">
        {/* Background continuation */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        </div>
        
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-foreground dark:text-white mb-4">
                Experience the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none gradient-text">
                  Modern Development
                </span>
              </h1>
              <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                Crafting digital experiences with cutting-edge technology and innovative design patterns
              </p>
            </>
          }
        >
          <div className="relative w-full h-full bg-gradient-to-br from-surface to-background rounded-2xl overflow-hidden">
            {/* Portfolio Preview Content */}
            <div className="absolute inset-0 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-foreground-secondary">aimecol.dev</div>
              </div>
              
              {/* Content Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Project Cards */}
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="w-full h-24 bg-gradient-to-r from-primary to-accent rounded mb-3"></div>
                    <h3 className="font-semibold text-foreground mb-2">Mobile Apps</h3>
                    <p className="text-sm text-foreground-secondary">Flutter & React Native</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <div className="w-full h-16 bg-gradient-to-r from-accent to-primary rounded mb-3"></div>
                    <h3 className="font-semibold text-foreground mb-2">Web Apps</h3>
                    <p className="text-sm text-foreground-secondary">Next.js & React</p>
                  </div>
                </div>
                
                {/* Center Feature */}
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-6 border border-white/10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Full Stack Solutions</h3>
                    <p className="text-sm text-foreground-secondary">End-to-end development</p>
                  </div>
                </div>
                
                {/* Tech Stack */}
                <div className="space-y-4">
                  <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
                    <h3 className="font-semibold text-foreground mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Node.js', 'Flutter'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
                    <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                    <p className="text-sm text-foreground-secondary">AI-powered solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </div>
  )
}
