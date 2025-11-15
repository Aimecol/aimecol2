'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Code, 
  Palette, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  Calendar,
  MapPin,
  ExternalLink,
  Github,
  Award,
  TrendingUp
} from 'lucide-react'

const teamProjects = [
  {
    id: 1,
    title: 'VendorFlow Platform',
    company: 'TechCorp Solutions',
    duration: '6 months',
    period: '2024',
    teamSize: 8,
    role: 'Lead Frontend Developer',
    description: 'Led the frontend development of a comprehensive vendor management platform serving 500+ businesses.',
    responsibilities: [
      'Architected scalable React component library',
      'Mentored 3 junior developers',
      'Implemented real-time fraud detection UI',
      'Optimized performance reducing load times by 60%'
    ],
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Material-UI', 'WebSockets'],
    outcome: 'Successfully launched to 10,000+ users with 98% uptime',
    teamPhoto: '/team/vendorflow-team.jpg',
    links: {
      demo: 'https://vendorflow.demo.com',
      github: 'https://github.com/techcorp/vendorflow'
    },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Ikiraha Social Platform',
    company: 'Startup Incubator',
    duration: '4 months',
    period: '2023',
    teamSize: 5,
    role: 'Full-Stack Developer & UI Designer',
    description: 'Collaborated on building a location-based social networking app for local communities.',
    responsibilities: [
      'Designed and implemented user interface',
      'Built RESTful API with Node.js',
      'Integrated Google Maps and geolocation',
      'Conducted user testing and iterations'
    ],
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps API', 'Firebase'],
    outcome: 'Reached 5,000+ downloads in first month',
    teamPhoto: '/team/ikiraha-team.jpg',
    links: {
      demo: 'https://ikiraha.app',
      github: 'https://github.com/startup/ikiraha'
    },
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    title: 'Blood Donation Network',
    company: 'Healthcare Initiative',
    duration: '3 months',
    period: '2023',
    teamSize: 4,
    role: 'Mobile Developer & System Designer',
    description: 'Developed a life-saving mobile app connecting blood donors with hospitals and patients.',
    responsibilities: [
      'Designed system architecture',
      'Implemented real-time notifications',
      'Created donor matching algorithm',
      'Ensured HIPAA compliance'
    ],
    technologies: ['Flutter', 'Firebase', 'Google Maps', 'Push Notifications', 'Cloud Functions'],
    outcome: 'Facilitated 200+ successful blood donations',
    teamPhoto: '/team/blood-donation-team.jpg',
    links: {
      demo: 'https://bloodnetwork.app',
      github: 'https://github.com/health/blood-network'
    },
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 4,
    title: 'E-Learning Platform',
    company: 'EdTech Startup',
    duration: '5 months',
    period: '2022',
    teamSize: 6,
    role: 'Frontend Developer & UX Contributor',
    description: 'Built an interactive learning platform with video streaming and progress tracking.',
    responsibilities: [
      'Developed responsive video player',
      'Implemented progress tracking system',
      'Created interactive quiz components',
      'Collaborated on UX improvements'
    ],
    technologies: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Video.js'],
    outcome: 'Served 2,000+ students with 95% completion rate',
    teamPhoto: '/team/elearning-team.jpg',
    links: {
      demo: 'https://eduplatform.demo.com',
      github: 'https://github.com/edtech/platform'
    },
    color: 'from-purple-500 to-indigo-500'
  }
]

const collaborationSkills = [
  {
    skill: 'Team Leadership',
    description: 'Leading cross-functional teams and mentoring developers',
    icon: Users,
    level: 92
  },
  {
    skill: 'Code Review',
    description: 'Ensuring code quality and knowledge sharing',
    icon: Code,
    level: 95
  },
  {
    skill: 'Design Collaboration',
    description: 'Working closely with designers and stakeholders',
    icon: Palette,
    level: 88
  },
  {
    skill: 'Project Planning',
    description: 'Sprint planning and agile methodologies',
    icon: Target,
    level: 85
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

export default function TeamworkPage() {
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Collaboration Drives Innovation
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Teamwork</span> & Production
          </h1>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Building amazing products through collaboration, leadership, and shared vision. 
            Here's how I contribute to team success and ship real products.
          </p>
        </motion.div>

        {/* Collaboration Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Collaboration <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              The soft skills that make technical excellence possible in team environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationSkills.map((item, index) => (
              <motion.div
                key={item.skill}
                variants={itemVariants}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-surface p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.skill}</h3>
                <p className="text-sm text-foreground-secondary mb-4">{item.description}</p>
                <div className="w-full bg-background rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  />
                </div>
                <span className="text-xs text-foreground-secondary mt-2 block">{item.level}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Projects Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Production Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Team <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Real projects, real teams, real impact. Here's how collaboration led to successful product launches.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full transform -translate-y-1/2"></div>
            
            <div className="space-y-16 lg:space-y-32">
              {teamProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex items-center gap-8`}
                >
                  {/* Project Card */}
                  <div className="w-full lg:w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-surface p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg"
                    >
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold text-sm`}>
                              {project.period}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{project.title}</h3>
                              <p className="text-accent font-medium text-sm">{project.company}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-200"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        <p className="text-foreground-secondary leading-relaxed">{project.description}</p>
                        
                        {/* Team Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{project.teamSize} team members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span>{project.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span>{project.role}</span>
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="font-semibold mb-2">Key Contributions:</h4>
                          <ul className="space-y-1">
                            {project.responsibilities.map((responsibility, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Outcome */}
                        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-2xl border border-primary/20">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-sm">Impact:</span>
                          </div>
                          <p className="text-sm text-foreground-secondary">{project.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot (Desktop) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background z-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute inset-0 bg-primary/30 rounded-full"
                    />
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
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
            I thrive in collaborative environments where diverse skills come together to create exceptional products. 
            Ready to add value to your team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Join My Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
