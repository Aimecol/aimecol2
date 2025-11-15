'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Smartphone, Monitor, Tablet } from 'lucide-react'

const projects = [
  {
    id: 'fittrack-mobile',
    title: 'FitTrack Mobile App',
    category: 'Mobile App',
    description: 'Cross-platform fitness tracking app with workout planning and progress analytics.',
    deviceType: 'phone',
    color: 'from-green-500 to-emerald-500',
    screens: [
      { name: 'Home', image: '/mockups/fittrack-home.jpg' },
      { name: 'Workout', image: '/mockups/fittrack-workout.jpg' },
      { name: 'Progress', image: '/mockups/fittrack-progress.jpg' }
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Redux'],
    links: {
      demo: 'https://fittrack-demo.aimecol.dev',
      github: 'https://github.com/aimecol/fittrack-mobile'
    }
  },
  {
    id: 'ikiraha-app',
    title: 'Ikiraha Social App',
    category: 'Mobile App',
    description: 'Social networking app for local communities with events and marketplace features.',
    deviceType: 'phone',
    color: 'from-purple-500 to-pink-500',
    screens: [
      { name: 'Feed', image: '/mockups/ikiraha-feed.jpg' },
      { name: 'Events', image: '/mockups/ikiraha-events.jpg' },
      { name: 'Profile', image: '/mockups/ikiraha-profile.jpg' }
    ],
    technologies: ['Flutter', 'Firebase', 'Google Maps', 'Push Notifications'],
    links: {
      demo: 'https://ikiraha-demo.aimecol.dev',
      github: 'https://github.com/aimecol/ikiraha-app'
    }
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'Web App',
    description: 'Comprehensive analytics platform with real-time data visualization and reporting.',
    deviceType: 'desktop',
    color: 'from-blue-500 to-cyan-500',
    screens: [
      { name: 'Dashboard', image: '/mockups/dashboard-main.jpg' },
      { name: 'Analytics', image: '/mockups/dashboard-analytics.jpg' },
      { name: 'Reports', image: '/mockups/dashboard-reports.jpg' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    links: {
      demo: 'https://dashboard-demo.aimecol.dev',
      github: 'https://github.com/aimecol/saas-dashboard'
    }
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'Web App',
    description: 'Full-featured e-commerce solution with payment processing and inventory management.',
    deviceType: 'desktop',
    color: 'from-orange-500 to-red-500',
    screens: [
      { name: 'Store', image: '/mockups/ecommerce-store.jpg' },
      { name: 'Product', image: '/mockups/ecommerce-product.jpg' },
      { name: 'Admin', image: '/mockups/ecommerce-admin.jpg' }
    ],
    technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    links: {
      demo: 'https://shop-demo.aimecol.dev',
      github: 'https://github.com/aimecol/ecommerce-platform'
    }
  },
  {
    id: 'blood-donation-app',
    title: 'Blood Donation App',
    category: 'Mobile App',
    description: 'Life-saving app connecting blood donors with hospitals and patients in need.',
    deviceType: 'phone',
    color: 'from-red-500 to-pink-500',
    screens: [
      { name: 'Map', image: '/mockups/blood-map.jpg' },
      { name: 'Donate', image: '/mockups/blood-donate.jpg' },
      { name: 'History', image: '/mockups/blood-history.jpg' }
    ],
    technologies: ['Flutter', 'Google Maps', 'Firebase', 'Push Notifications'],
    links: {
      demo: 'https://blood-donation-demo.aimecol.dev',
      github: 'https://github.com/aimecol/blood-donation-app'
    }
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'Web App',
    description: 'Modern portfolio website with 3D animations and interactive elements.',
    deviceType: 'desktop',
    color: 'from-indigo-500 to-purple-500',
    screens: [
      { name: 'Home', image: '/mockups/portfolio-home.jpg' },
      { name: 'Projects', image: '/mockups/portfolio-projects.jpg' },
      { name: 'Contact', image: '/mockups/portfolio-contact.jpg' }
    ],
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    links: {
      demo: 'https://aimecol.dev',
      github: 'https://github.com/aimecol/portfolio'
    }
  }
]

interface PhoneMockupProps {
  project: typeof projects[0]
  isActive: boolean
  onClick: () => void
}

function PhoneMockup({ project, isActive, onClick }: PhoneMockupProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      {/* Phone Frame */}
      <div className="relative w-64 h-[520px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
        {/* Screen */}
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder Content */}
            <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20 absolute inset-0`}></div>
            
            {/* App Preview */}
            <div className="relative z-10 text-center p-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Smartphone className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{project.category}</p>
              
              {/* Screen Indicators */}
              <div className="flex justify-center gap-2 mb-4">
                {project.screens.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentScreen(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      currentScreen === index ? 'bg-gray-800' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="text-xs text-gray-500">
                {project.screens[currentScreen].name}
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Button */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
      >
        ✓
      </motion.div>
    </motion.div>
  )
}

interface DesktopMockupProps {
  project: typeof projects[0]
  isActive: boolean
  onClick: () => void
}

function DesktopMockup({ project, isActive, onClick }: DesktopMockupProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.02, rotateX: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      {/* Monitor */}
      <div className="relative">
        {/* Screen */}
        <div className="w-80 h-52 bg-gray-900 rounded-lg p-2 shadow-2xl">
          <div className="w-full h-full bg-black rounded-md overflow-hidden relative">
            {/* Browser Frame */}
            <div className="h-8 bg-gray-200 flex items-center px-3 gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white rounded-sm h-5 flex items-center px-2">
                <div className="text-xs text-gray-500 truncate">
                  {project.links.demo}
                </div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden" style={{ height: 'calc(100% - 2rem)' }}>
              {/* Placeholder Content */}
              <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20 absolute inset-0`}></div>
              
              {/* Web Preview */}
              <div className="relative z-10 text-center p-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                  <Monitor className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{project.title}</h3>
                <p className="text-xs text-gray-600 mb-3">{project.category}</p>
                
                {/* Screen Indicators */}
                <div className="flex justify-center gap-1 mb-2">
                  {project.screens.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentScreen(index)
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        currentScreen === index ? 'bg-gray-800' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-xs text-gray-500">
                  {project.screens[currentScreen].name}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stand */}
        <div className="w-20 h-8 bg-gray-300 rounded-b-lg mx-auto relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          x: [0, 10, 0],
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
      >
        ⚡
      </motion.div>
    </motion.div>
  )
}

export function DeviceMockups() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all')

  const filteredProjects = projects.filter(project => {
    if (filter === 'mobile') return project.deviceType === 'phone'
    if (filter === 'web') return project.deviceType === 'desktop'
    return true
  })

  const selectedProjectData = selectedProject ? projects.find(p => p.id === selectedProject) : null

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Device <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-8">
            Interactive 3D mockups showcasing mobile and web applications 
            across different devices and platforms.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            {[
              { key: 'all', label: 'All Devices', icon: Tablet },
              { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
              { key: 'web', label: 'Web Apps', icon: Monitor }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === key
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                    : 'bg-surface text-foreground-secondary hover:text-foreground hover:bg-surface/80 border border-white/10 hover:border-primary/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {project.deviceType === 'phone' ? (
                <PhoneMockup
                  project={project}
                  isActive={selectedProject === project.id}
                  onClick={() => setSelectedProject(project.id)}
                />
              ) : (
                <DesktopMockup
                  project={project}
                  isActive={selectedProject === project.id}
                  onClick={() => setSelectedProject(project.id)}
                />
              )}
              
              {/* Project Info */}
              <div className="text-center mt-6 max-w-xs">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-foreground-secondary text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface text-foreground-secondary text-xs rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 justify-center">
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-4 py-2 bg-surface text-foreground-secondary text-sm font-medium rounded-lg hover:bg-surface/80 border border-white/10 hover:border-primary/30 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProjectData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-surface rounded-3xl p-8 max-w-2xl w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedProjectData.color} p-4`}>
                  {selectedProjectData.deviceType === 'phone' ? (
                    <Smartphone className="w-full h-full text-white" />
                  ) : (
                    <Monitor className="w-full h-full text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{selectedProjectData.title}</h3>
                  <p className="text-primary font-medium mb-2">{selectedProjectData.category}</p>
                  <p className="text-foreground-secondary leading-relaxed">
                    {selectedProjectData.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              
              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background text-foreground-secondary text-sm rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-4">
                <a
                  href={selectedProjectData.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live Demo
                </a>
                <a
                  href={selectedProjectData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  View Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
