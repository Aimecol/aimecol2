'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Shield, BarChart3, MessageCircle, Workflow, ExternalLink, Github } from 'lucide-react'
// import Particles from '@/components/ui/Particles'

const innovations = [
  {
    id: 'vendorflow-ai',
    title: 'VendorFlow AI',
    subtitle: 'Fraud Detection System',
    description: 'AI-powered risk scoring system that analyzes vendor behavior patterns to detect potential fraud in real-time.',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    features: [
      'Real-time risk assessment',
      'Pattern recognition algorithms',
      'Automated alert system',
      'Compliance reporting'
    ],
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    status: 'Prototype',
    demo: 'https://vendorflow-demo.aimecol.dev',
    github: 'https://github.com/aimecol/vendorflow-ai'
  },
  {
    id: 'portfolio-assistant',
    title: 'Portfolio AI Assistant',
    subtitle: 'Intelligent Visitor Guide',
    description: 'Smart chatbot that helps visitors navigate the portfolio, answers questions about projects, and provides personalized recommendations.',
    icon: MessageCircle,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Natural language processing',
      'Project recommendations',
      'Technical Q&A',
      'Contact form assistance'
    ],
    technologies: ['OpenAI API', 'Next.js', 'Vercel AI SDK', 'Pinecone'],
    status: 'Live',
    demo: 'https://aimecol.dev/chat',
    github: 'https://github.com/aimecol/portfolio-ai'
  },
  {
    id: 'smart-analytics',
    title: 'SmartAnalytics Pro',
    subtitle: 'Predictive Business Intelligence',
    description: 'Advanced analytics dashboard with machine learning predictions for business metrics and user behavior analysis.',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Predictive modeling',
      'Custom dashboards',
      'Automated insights',
      'Export capabilities'
    ],
    technologies: ['React', 'D3.js', 'Python', 'Scikit-learn'],
    status: 'Development',
    demo: 'https://analytics-demo.aimecol.dev',
    github: 'https://github.com/aimecol/smart-analytics'
  },
  {
    id: 'workflow-automation',
    title: 'WorkFlow Genius',
    subtitle: 'Multi-Agent Automation',
    description: 'Intelligent workflow automation system that uses multiple AI agents to handle complex business processes autonomously.',
    icon: Workflow,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Multi-agent coordination',
      'Process optimization',
      'Error handling & recovery',
      'Performance monitoring'
    ],
    technologies: ['Node.js', 'LangChain', 'Redis', 'Docker'],
    status: 'Research',
    demo: 'https://workflow-demo.aimecol.dev',
    github: 'https://github.com/aimecol/workflow-genius'
  },
  {
    id: 'neural-ui',
    title: 'Neural UI Generator',
    subtitle: 'AI-Powered Interface Design',
    description: 'Experimental tool that generates responsive UI components based on natural language descriptions and user preferences.',
    icon: Brain,
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Natural language to UI',
      'Responsive generation',
      'Style customization',
      'Code export'
    ],
    technologies: ['GPT-4', 'React', 'Tailwind CSS', 'Figma API'],
    status: 'Concept',
    demo: 'https://neural-ui.aimecol.dev',
    github: 'https://github.com/aimecol/neural-ui'
  },
  {
    id: 'realtime-collab',
    title: 'CollabSpace Live',
    subtitle: 'Real-time Collaboration Platform',
    description: 'Advanced real-time collaboration platform with AI-assisted content generation and smart conflict resolution.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    features: [
      'Real-time synchronization',
      'AI content assistance',
      'Conflict resolution',
      'Version control'
    ],
    technologies: ['WebSockets', 'CRDT', 'OpenAI', 'React'],
    status: 'Beta',
    demo: 'https://collab-demo.aimecol.dev',
    github: 'https://github.com/aimecol/collabspace'
  }
]

const statusColors = {
  'Live': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Beta': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Development': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Prototype': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Research': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Concept': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
}

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

export function InnovationShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Innovation <span className="gradient-text">Lab</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Experimental projects and cutting-edge solutions that push the boundaries 
            of what's possible with modern technology.
          </p>
        </motion.div>

        {/* Innovation Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-background border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${innovation.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <innovation.icon className="w-full h-full text-white" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[innovation.status as keyof typeof statusColors]}`}>
                    {innovation.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                  {innovation.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{innovation.subtitle}</p>
                <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                  {innovation.description}
                </p>
              </div>

              {/* Features */}
              <div className="px-6 pb-4">
                <h4 className="font-medium text-sm mb-3">Key Features:</h4>
                <ul className="space-y-1">
                  {innovation.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-foreground-secondary">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1">
                  {innovation.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-surface text-foreground-secondary text-xs rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-2">
                  <motion.a
                    href={innovation.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                  <motion.a
                    href={innovation.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface text-foreground-secondary text-sm font-medium rounded-lg hover:bg-surface/80 border border-white/10 hover:border-primary/30 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${innovation.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-foreground-secondary mb-6">
            Interested in collaborating on innovative projects?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Let's Innovate Together
            <Brain className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
