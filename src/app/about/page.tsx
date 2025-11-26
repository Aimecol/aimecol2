'use client'

import { motion } from 'framer-motion'
import { Download, MapPin, Coffee, Music, Code, Heart } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'
import Particles from '@/components/ui/Particles'

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Flutter', level: 85 },
  { name: 'MySQL', level: 82 },
  { name: 'Design Systems', level: 80 }
]

const timeline = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    company: 'Freelance',
    description: 'Building innovative web and mobile applications for clients worldwide. Specializing in React, Next.js, and modern development practices.',
    current: true
  },
  {
    year: '2023',
    title: 'Lead Frontend Developer',
    company: 'TechCorp Solutions',
    description: 'Led a team of 5 developers in creating a comprehensive design system and multiple client applications. Improved development efficiency by 60%.'
  },
  {
    year: '2022',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    description: 'Developed the core platform from scratch using React, Node.js, and PostgreSQL. Scaled the application to handle 100k+ users.'
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Created responsive web applications and e-commerce platforms for various clients. Focused on performance optimization and user experience.'
  },
  {
    year: '2020',
    title: 'Started Coding Journey',
    company: 'Self-Taught',
    description: 'Began learning web development through online courses and building personal projects. Discovered my passion for creating digital experiences.'
  }
]

const tools = [
  { category: 'Development', items: ['VS Code', 'Git', 'Docker', 'Postman', 'Chrome DevTools'] },
  { category: 'Design', items: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Principle', 'Framer'] },
  { category: 'Productivity', items: ['Notion', 'Slack', 'Linear', 'Spotify', 'Arc Browser'] }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      </div>

      <div className="absolute inset-0 z-0 h-full opacity-40">
        <Particles
          particleCount={500}
          particleSpread={10}
          speed={0.05}
          particleColors={['#D77B35', '#004CFF', '#C85A23']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.9}
          alphaParticles={true}
          particleBaseSize={500}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Personality Meets Professionalism
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            >
              Passionate developer, creative designer, and continuous learner. 
              Here's my story, mindset, and the skills I've developed along the way.
            </motion.p>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Left Side - Bio & Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Who I Am Section */}
              <div className="bg-surface p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  Who I Am
                </h2>
                <div className="space-y-4 text-foreground-secondary leading-relaxed">
                  <p>
                    I'm a passionate full-stack developer and designer who believes in the power of 
                    technology to solve real-world problems and create meaningful experiences.
                  </p>
                  <p>
                    With over 2 years of experience in web and mobile development, I've had the 
                    privilege of working with startups, agencies, and enterprise clients to bring 
                    their digital visions to life.
                  </p>
                </div>
              </div>

              {/* My Approach Section */}
              <div className="bg-surface p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  My Approach
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  I focus on production-oriented development, ensuring that every project I work on 
                  is scalable, maintainable, and ready for real-world use. Collaboration and continuous 
                  learning are at the heart of everything I do.
                </p>
              </div>

              {/* Personal Touch */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-3xl border border-primary/20">
                <h4 className="text-xl font-bold mb-4">Beyond Code</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-foreground-secondary">
                    <Coffee className="w-5 h-5 text-primary" />
                    <span>Coffee Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground-secondary">
                    <Music className="w-5 h-5 text-primary" />
                    <span>Music Lover (R&B)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.button>
                <div className="flex items-center justify-center gap-2 px-8 py-4 bg-surface text-foreground-secondary rounded-full border border-white/10">
                  <MapPin className="w-5 h-5 text-primary" />
                  Kigali, Rwanda
                </div>
              </div>
            </motion.div>

            {/* Right Side - Professional Portrait & Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Professional Portrait */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-2xl text-white text-6xl font-bold shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <Image src="https://images.aimecol.com/uploads/large/emy-62002_691c4646ba4bb_large.jpg" alt="Aime Claudien" fill className="object-cover object-top" />
                  </div>
                </motion.div>
                
                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-surface rounded-2xl flex items-center justify-center border border-white/10 shadow-lg"
                >
                  <Code className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-surface rounded-2xl flex items-center justify-center border border-white/10 shadow-lg"
                >
                  <Heart className="w-8 h-8 text-accent" />
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border border-primary/20 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">2+</div>
                  <div className="text-sm text-foreground-secondary">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl border border-accent/20 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">8+</div>
                  <div className="text-sm text-foreground-secondary">Projects Completed</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Skills <span className="gradient-text">&</span> Proficiency
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-foreground-secondary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section - Professional Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="text-center mb-12 md:mb-16 px-4">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-xs md:text-sm font-medium mb-4">
                Timeline of Growth
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                My <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-base md:text-xl text-foreground-secondary max-w-3xl mx-auto">
                From curious student to passionate professional - here's how my development journey unfolded.
              </p>
            </div>

            <div className="relative w-full px-4 md:px-0">
              {/* Desktop Timeline Line (hidden on mobile) */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"></div>
              
              {/* Mobile Timeline Line (visible on mobile only) */}
              <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full"></div>
              
              <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-start md:items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-8 pl-20 md:pl-0' : 'md:text-left md:pl-8 pl-20'
                    }`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="bg-surface p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg"
                      >
                        {/* Mobile: Year badge at top */}
                        <div className="md:hidden flex items-center gap-3 mb-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${
                            item.current 
                              ? 'bg-gradient-to-r from-primary to-accent' 
                              : 'bg-primary/10 border border-primary/20'
                          } flex items-center justify-center text-xs font-bold ${
                            item.current ? 'text-white' : 'text-primary'
                          }`}>
                            {item.year}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-base">{item.title}</h3>
                            <p className="text-accent font-medium text-xs">{item.company}</p>
                          </div>
                        </div>

                        {/* Desktop: Year with title and company inline */}
                        <div className="hidden md:flex items-start gap-3 mb-3">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${
                            item.current 
                              ? 'bg-gradient-to-r from-primary to-accent' 
                              : 'bg-primary/10 border border-primary/20'
                          } flex items-center justify-center text-sm font-bold ${
                            item.current ? 'text-white' : 'text-primary'
                          }`}>
                            {item.year}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{item.title}</h3>
                              {item.current && (
                                <motion.span
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full whitespace-nowrap"
                                >
                                  Current
                                </motion.span>
                              )}
                            </div>
                            <p className="text-accent font-medium text-sm">{item.company}</p>
                          </div>
                        </div>

                        {/* Mobile: Current badge */}
                        {item.current && (
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block md:hidden px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3"
                          >
                            Current Role
                          </motion.span>
                        )}

                        <p className="text-foreground-secondary leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline Dot - Desktop */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background z-10 ${
                        item.current 
                          ? 'bg-gradient-to-r from-primary to-accent' 
                          : 'bg-primary'
                      }`}
                    >
                      {item.current && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-primary/30 rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Timeline Dot - Mobile */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className={`md:hidden absolute left-2 top-5 w-5 h-5 rounded-full border-4 border-background z-10 flex-shrink-0 ${
                        item.current 
                          ? 'bg-gradient-to-r from-primary to-accent' 
                          : 'bg-primary'
                      }`}
                    >
                      {item.current && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-primary/30 rounded-full"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-primary/5 to-accent/5 p-12 rounded-3xl border border-primary/20"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. I'm always excited to take on new challenges 
              and collaborate with passionate teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              >
                View My Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
