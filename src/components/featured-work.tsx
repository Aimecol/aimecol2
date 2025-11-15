'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'A comprehensive analytics platform with real-time data visualization, user management, and advanced reporting features.',
    image: '/projects/dashboard-preview.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Web App',
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
    links: {
      live: 'https://ai-chat.aimecol.dev',
      github: 'https://github.com/aimecol/ai-chat-assistant'
    }
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

export function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            A selection of projects that showcase my expertise in full-stack development, 
            design, and innovative problem-solving.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl bg-background border border-white/10 hover:border-primary/50 transition-all duration-500 ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/20">
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
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-foreground-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface text-foreground-secondary text-sm rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                >
                  View Case Study
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            View All Projects
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
