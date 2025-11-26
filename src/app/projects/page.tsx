'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import Particles from '@/components/ui/Particles'

const projects = [
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'A comprehensive analytics platform with real-time data visualization, user management, and advanced reporting features.',
    image: '/projects/dashboard-preview.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Web App',
    year: '2024',
    links: {
      live: 'https://dashboard-demo.aimecol.dev',
      github: 'https://github.com/aimecol/saas-dashboard'
    }
  },
  {
    id: 'mobile-fitness',
    title: 'FitTrack Mobile App',
    description: 'Cross-platform fitness tracking app with workout planning, progress analytics, and social features.',
    image: '/projects/mobile-app-preview.jpg',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    category: 'Mobile App',
    year: '2024',
    links: {
      live: 'https://fittrack-demo.aimecol.dev',
      github: 'https://github.com/aimecol/fittrack-mobile'
    }
  },
  {
    id: 'design-system',
    title: 'Nexus Design System',
    description: 'A comprehensive design system with 50+ components, design tokens, and documentation for enterprise applications.',
    image: '/projects/design-system-preview.jpg',
    tags: ['React', 'Storybook', 'Figma', 'TypeScript'],
    category: 'Design System',
    year: '2023',
    links: {
      live: 'https://nexus-ds.aimecol.dev',
      github: 'https://github.com/aimecol/nexus-design-system'
    }
  },
  {
    id: 'ai-chat',
    title: 'AI-Powered Chat Assistant',
    description: 'Intelligent chat interface with context awareness, file uploads, and real-time collaboration features.',
    image: '/projects/ai-chat-preview.jpg',
    tags: ['Next.js', 'OpenAI API', 'WebSockets', 'Prisma'],
    category: 'Innovation',
    year: '2024',
    links: {
      live: 'https://ai-chat.aimecol.dev',
      github: 'https://github.com/aimecol/ai-chat-assistant'
    }
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce solution with payment processing, inventory management, and admin dashboard.',
    image: '/projects/ecommerce-preview.jpg',
    tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    category: 'Web App',
    year: '2023',
    links: {
      live: 'https://shop-demo.aimecol.dev',
      github: 'https://github.com/aimecol/ecommerce-platform'
    }
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio Website v2',
    description: 'Previous iteration of my portfolio with 3D elements, custom animations, and interactive features.',
    image: '/projects/portfolio-preview.jpg',
    tags: ['React', 'Three.js', 'GSAP', 'Styled Components'],
    category: 'Design',
    year: '2023',
    links: {
      live: 'https://v2.aimecol.dev',
      github: 'https://github.com/aimecol/portfolio-v2'
    }
  }
]

const categories = ['All', 'Web App', 'Mobile App', 'Design System', 'Innovation', 'Design']

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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen py-24">
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

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-8">
              A collection of projects showcasing my expertise in full-stack development, 
              design, and innovative problem-solving.
            </p>
            
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 mx-auto px-4 py-2 bg-surface rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              Filter Projects
            </button>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-wrap justify-center gap-3 mb-12 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setIsFilterOpen(false)
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                    : 'bg-surface text-foreground-secondary hover:text-foreground hover:bg-surface/80 border border-white/10 hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-surface border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white/20">
                        {project.category.split(' ')[0]}
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center gap-4">
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-foreground text-background rounded-full hover:bg-foreground-secondary transition-colors duration-200"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-foreground-secondary">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-foreground-secondary mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-background text-foreground-secondary text-xs rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-background text-foreground-secondary text-xs rounded-full border border-white/10">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200 text-sm"
                    >
                      View Case Study
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-foreground-secondary">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
