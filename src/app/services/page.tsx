'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Brain, 
  Settings, 
  Users,
  Code,
  Database,
  Zap,
  Building,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Application Development',
    subtitle: 'Building dynamic, scalable, and elegant web platforms',
    description: 'Complete fullstack web solutions from concept to deployment, featuring modern frameworks and best practices.',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Fullstack web app design (React + Node)',
      'Business management systems (ERP, e-commerce, booking)',
      'Admin dashboards and analytics',
      'Real-time systems (notifications, payments)',
      'API integrations (MoMo, Stripe, Google, etc.)'
    ],
    technologies: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    targetClients: ['Startups', 'SMEs', 'Enterprises'],
    pricing: 'From $2,000',
    timeline: '2-8 weeks'
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile Application Development',
    subtitle: 'Creating smooth, cross-platform mobile apps with Flutter',
    description: 'Native-quality mobile experiences that work seamlessly across Android and iOS platforms.',
    color: 'from-green-500 to-emerald-500',
    features: [
      'Android/iOS app development',
      'API integration with Node.js or Firebase backend',
      'UI/UX consistency across devices',
      'Push notifications and user management',
      'App store deployment and optimization'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    targetClients: ['Startups', 'Local Businesses', 'NGOs'],
    pricing: 'From $3,000',
    timeline: '3-10 weeks'
  },
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design & Prototyping',
    subtitle: 'Designing experiences that users love',
    description: 'User-centered design solutions that combine aesthetics with functionality for optimal user experience.',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Wireframes, prototypes, and mockups',
      'Branding and color systems',
      'Interactive animations and transitions',
      'Figma-to-code handoff',
      'Design system creation'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'Framer'],
    targetClients: ['Agencies', 'Startups', 'Freelancers'],
    pricing: 'From $800',
    timeline: '1-4 weeks'
  },
  {
    id: 'ai-automation',
    icon: Brain,
    title: 'AI & Automation Solutions',
    subtitle: 'Integrating intelligent tools that simplify work',
    description: 'Cutting-edge AI integration and automation solutions to streamline business processes and enhance user experiences.',
    color: 'from-orange-500 to-red-500',
    features: [
      'AI chat assistants for websites',
      'Process automation workflows',
      'Data visualization dashboards',
      'Experimental prototypes using APIs',
      'Custom AI model integration'
    ],
    technologies: ['OpenAI API', 'Hugging Face', 'Python', 'Node.js'],
    targetClients: ['Tech Companies', 'Enterprises', 'Innovators'],
    pricing: 'From $1,500',
    timeline: '2-6 weeks'
  },
  {
    id: 'system-design',
    icon: Settings,
    title: 'System Design & Consultation',
    subtitle: 'Turning ideas into reliable system architectures',
    description: 'Strategic technical consultation and system architecture design for scalable, maintainable solutions.',
    color: 'from-indigo-500 to-blue-500',
    features: [
      'Database schema design',
      'System flow diagrams & ER models',
      'Technical documentation',
      'Scalability and deployment consultation',
      'Code review and optimization'
    ],
    technologies: ['System Architecture', 'Database Design', 'Cloud Platforms'],
    targetClients: ['Enterprises', 'Development Teams', 'CTOs'],
    pricing: 'From $500',
    timeline: '1-3 weeks'
  },
  {
    id: 'business-services',
    icon: Building,
    title: 'Business-Oriented Digital Services',
    subtitle: 'Bridging business and technology',
    description: 'Complete digital transformation services including government integrations and business process digitization.',
    color: 'from-teal-500 to-green-500',
    features: [
      'E-services setup (RRA, RDB, Irembo integrations)',
      'Digital branding & company profiles',
      'Web hosting and domain setup',
      'Payment gateway integration',
      'Business process automation'
    ],
    technologies: ['Government APIs', 'Payment Systems', 'Cloud Hosting'],
    targetClients: ['Local Businesses', 'SMEs', 'Government'],
    pricing: 'From $300',
    timeline: '1-2 weeks'
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Team Collaboration & Freelance',
    subtitle: 'Let\'s build something amazing together',
    description: 'Flexible collaboration options for teams and individuals looking for expert development support.',
    color: 'from-pink-500 to-rose-500',
    features: [
      'Frontend or backend development support',
      'UI/UX design collaboration',
      'Code review and mentoring',
      'Remote or hybrid teamwork',
      'Technical consultation'
    ],
    technologies: ['Various based on project needs'],
    targetClients: ['Development Teams', 'Agencies', 'Startups'],
    pricing: 'From $50/hour',
    timeline: 'Flexible'
  }
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'Understanding your needs, goals, and technical requirements through detailed consultation.',
    icon: Users
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'Creating wireframes, system architecture, and technical specifications for your project.',
    icon: Palette
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Building your solution with regular updates, testing, and quality assurance throughout.',
    icon: Code
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description: 'Launching your project and providing ongoing support, maintenance, and optimization.',
    icon: Zap
  }
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your needs. From web applications 
            to AI integration, I help bring your ideas to life with modern technology.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-surface rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Service Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-primary font-medium mb-2">{service.subtitle}</p>
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background text-foreground-secondary text-xs rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-foreground-secondary">Target Clients:</span>
                  <p className="font-medium">{service.targetClients.join(', ')}</p>
                </div>
                <div>
                  <span className="text-foreground-secondary">Timeline:</span>
                  <p className="font-medium">{service.timeline}</p>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-foreground-secondary text-sm">Starting at</span>
                  <p className="text-2xl font-bold text-primary">{service.pricing}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {step.description}
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
          className="text-center bg-surface p-12 rounded-3xl border border-white/10"
        >
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together. 
            I'm here to help bring your vision to life with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View My Work
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
