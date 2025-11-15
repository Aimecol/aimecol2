'use client'

import { motion } from 'framer-motion'
import { DeviceMockups } from '@/components/device-mockups'
import { TabletMockup } from '@/components/tablet-mockup'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const tabletProjects = [
  {
    title: 'Smart Learning Platform',
    description: 'Interactive educational platform with AI-powered personalized learning paths and real-time collaboration features.',
    color: 'from-indigo-500 to-purple-500',
    screens: [
      { name: 'Dashboard', image: '/mockups/learning-dashboard.jpg' },
      { name: 'Lessons', image: '/mockups/learning-lessons.jpg' },
      { name: 'Progress', image: '/mockups/learning-progress.jpg' },
      { name: 'Community', image: '/mockups/learning-community.jpg' }
    ],
    technologies: ['React Native', 'Firebase', 'AI/ML', 'WebRTC', 'Redux'],
    links: {
      demo: 'https://learning-demo.aimecol.dev',
      github: 'https://github.com/aimecol/smart-learning'
    }
  },
  {
    title: 'Digital Art Studio',
    description: 'Professional digital art creation tool with advanced brush engines, layer management, and cloud synchronization.',
    color: 'from-pink-500 to-rose-500',
    screens: [
      { name: 'Canvas', image: '/mockups/art-canvas.jpg' },
      { name: 'Tools', image: '/mockups/art-tools.jpg' },
      { name: 'Gallery', image: '/mockups/art-gallery.jpg' },
      { name: 'Share', image: '/mockups/art-share.jpg' }
    ],
    technologies: ['Flutter', 'Custom Engine', 'Cloud Storage', 'WebGL'],
    links: {
      demo: 'https://art-studio-demo.aimecol.dev',
      github: 'https://github.com/aimecol/digital-art-studio'
    }
  }
]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Device <span className="gradient-text">Showcase</span>
            </h1>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Explore interactive 3D mockups of mobile apps, web applications, and tablet experiences. 
              Each mockup demonstrates responsive design and platform-specific optimizations.
            </p>
          </div>
        </motion.div>

        {/* Main Device Mockups */}
        <DeviceMockups />

        {/* Tablet Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tablet <span className="gradient-text">Experiences</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Specialized applications designed for tablet interfaces with enhanced touch interactions 
              and optimized layouts for larger screens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-center">
            {tabletProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TabletMockup {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-surface rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why <span className="gradient-text">3D Mockups</span>?
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Interactive device mockups provide a more engaging way to showcase applications 
              and demonstrate cross-platform compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Realistic Presentation',
                description: 'Accurate device proportions and materials create authentic viewing experiences.',
                icon: '📱'
              },
              {
                title: 'Interactive Elements',
                description: 'Hover effects and animations demonstrate app functionality and user flows.',
                icon: '⚡'
              },
              {
                title: 'Cross-Platform View',
                description: 'Compare how applications adapt across different devices and screen sizes.',
                icon: '🔄'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-background rounded-2xl border border-white/10"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your App?
          </h2>
          <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. From mobile apps to web platforms, 
            I'll help bring your vision to life with modern technology and great design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
