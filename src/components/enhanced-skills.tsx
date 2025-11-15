'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Smartphone, 
  Palette, 
  Brain, 
  Settings, 
  Users, 
  Heart,
  Database,
  Server,
  Globe,
  Zap,
  Shield,
  Lightbulb
} from 'lucide-react'

const skillCategories = [
  {
    id: 'fullstack',
    icon: Code,
    title: 'Fullstack Web Development',
    description: 'Building complete web systems from frontend to backend',
    color: 'from-blue-500 to-cyan-500',
    layers: [
      {
        name: 'Frontend',
        description: 'Responsive UI, UX design, animations, routing, state management',
        skills: [
          { name: 'React.js', level: 95 },
          { name: 'Next.js', level: 92 },
          { name: 'Tailwind CSS', level: 90 },
          { name: 'Framer Motion', level: 85 },
          { name: 'Redux Toolkit', level: 88 }
        ],
        tools: ['React.js', 'Next.js', 'Tailwind CSS', 'ShadCN/UI', 'Framer Motion', 'Redux Toolkit', 'Chart.js', 'Lucide Icons']
      },
      {
        name: 'Backend',
        description: 'RESTful APIs, authentication, CRUD, security, performance',
        skills: [
          { name: 'Node.js', level: 90 },
          { name: 'Express.js', level: 88 },
          { name: 'JWT Auth', level: 85 },
          { name: 'Prisma ORM', level: 82 },
          { name: 'API Design', level: 90 }
        ],
        tools: ['Node.js', 'Express.js', 'JWT', 'Prisma ORM', 'Bcrypt', 'Nodemailer']
      },
      {
        name: 'Database',
        description: 'Relational & NoSQL management',
        skills: [
          { name: 'PostgreSQL', level: 85 },
          { name: 'MySQL', level: 88 },
          { name: 'MongoDB', level: 80 },
          { name: 'SQLite', level: 82 }
        ],
        tools: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB']
      },
      {
        name: 'DevOps & Hosting',
        description: 'Deployment, CI/CD, version control',
        skills: [
          { name: 'Vercel', level: 90 },
          { name: 'GitHub Actions', level: 75 },
          { name: 'Docker', level: 70 },
          { name: 'Nginx', level: 72 }
        ],
        tools: ['Vercel', 'Hostinger VPS', 'Render', 'GitHub Actions', 'Docker', 'Nginx']
      }
    ]
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile experiences with Flutter',
    color: 'from-green-500 to-emerald-500',
    layers: [
      {
        name: 'Cross-Platform',
        description: 'Flutter development for Android & iOS',
        skills: [
          { name: 'Flutter', level: 88 },
          { name: 'Dart', level: 85 },
          { name: 'State Management', level: 82 },
          { name: 'UI/UX Mobile', level: 90 }
        ],
        tools: ['Flutter', 'Dart', 'Provider', 'Riverpod', 'Bloc']
      },
      {
        name: 'Integration',
        description: 'Backend integration and services',
        skills: [
          { name: 'REST APIs', level: 90 },
          { name: 'Firebase', level: 85 },
          { name: 'Push Notifications', level: 80 },
          { name: 'Analytics', level: 78 }
        ],
        tools: ['Firebase Auth', 'Cloud Firestore', 'FCM', 'Analytics']
      }
    ]
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Designing experiences that users love',
    color: 'from-purple-500 to-pink-500',
    layers: [
      {
        name: 'Design Systems',
        description: 'Prototyping, branding, and accessibility',
        skills: [
          { name: 'Figma', level: 92 },
          { name: 'UI Design', level: 90 },
          { name: 'UX Research', level: 85 },
          { name: 'Prototyping', level: 88 },
          { name: 'Branding', level: 82 }
        ],
        tools: ['Figma', 'Adobe Creative Suite', 'Design Systems', 'Color Theory']
      }
    ]
  },
  {
    id: 'innovation',
    icon: Brain,
    title: 'Innovation & AI Integration',
    description: 'Integrating intelligent tools and automation',
    color: 'from-orange-500 to-red-500',
    layers: [
      {
        name: 'AI Integration',
        description: 'API integration with AI platforms',
        skills: [
          { name: 'OpenAI API', level: 85 },
          { name: 'AI Workflows', level: 80 },
          { name: 'Chatbots', level: 88 },
          { name: 'Automation', level: 82 }
        ],
        tools: ['OpenAI', 'Hugging Face', 'Automation Tools', 'AI Dashboards']
      }
    ]
  },
  {
    id: 'business',
    icon: Settings,
    title: 'Production & Business Systems',
    description: 'Real-world impact and professional systems',
    color: 'from-indigo-500 to-blue-500',
    layers: [
      {
        name: 'Business Logic',
        description: 'ERP/CRM systems and payment integration',
        skills: [
          { name: 'System Architecture', level: 88 },
          { name: 'Payment Systems', level: 85 },
          { name: 'Analytics', level: 82 },
          { name: 'Performance', level: 90 }
        ],
        tools: ['ERP Systems', 'MoMo API', 'Airtel Money', 'Stripe', 'Analytics']
      }
    ]
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Teamwork & Leadership',
    description: 'Collaborative and organized approach',
    color: 'from-teal-500 to-green-500',
    layers: [
      {
        name: 'Team Skills',
        description: 'Agile development and collaboration',
        skills: [
          { name: 'Agile/Scrum', level: 85 },
          { name: 'Git Collaboration', level: 92 },
          { name: 'Documentation', level: 88 },
          { name: 'Mentoring', level: 80 }
        ],
        tools: ['Git', 'GitHub', 'Jira', 'Slack', 'Notion']
      }
    ]
  }
]

const softSkills = [
  { name: 'Creativity', description: 'Turning ideas into functional apps', icon: Lightbulb },
  { name: 'Problem Solving', description: 'Debugging, performance fixes, scalability', icon: Settings },
  { name: 'Communication', description: 'Clear documentation & teamwork', icon: Users },
  { name: 'Adaptability', description: 'Working with new tools & frameworks', icon: Zap },
  { name: 'Passion', description: 'Continuous learning and exploration', icon: Heart }
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

export function EnhancedSkills() {
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
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            A comprehensive skill set spanning the entire development lifecycle, 
            from concept to deployment and beyond.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-surface rounded-3xl p-8 border border-white/10"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-4`}>
                  <category.icon className="w-full h-full text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-foreground-secondary">{category.description}</p>
                </div>
              </div>

              {/* Layers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.layers.map((layer, layerIndex) => (
                  <div key={layer.name} className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-2">{layer.name}</h4>
                      <p className="text-sm text-foreground-secondary mb-4">{layer.description}</p>
                    </div>

                    {/* Skills with Progress Bars */}
                    <div className="space-y-3">
                      {layer.skills.map((skill, skillIndex) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-foreground-secondary">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 1.5, 
                                delay: categoryIndex * 0.1 + layerIndex * 0.1 + skillIndex * 0.1 
                              }}
                              className={`bg-gradient-to-r ${category.color} h-2 rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div>
                      <h5 className="text-sm font-medium text-foreground-secondary mb-3">Tools & Frameworks</h5>
                      <div className="flex flex-wrap gap-2">
                        {layer.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-background text-foreground-secondary text-xs rounded-full border border-white/10"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-surface rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">{skill.name}</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
