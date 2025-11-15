'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Zap, Users, Heart } from 'lucide-react'

const skills = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'Building scalable web applications with modern frameworks and best practices.',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile experiences that users love.',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Palette,
    title: 'Design Systems',
    description: 'Crafting cohesive design languages and component libraries.',
    technologies: ['Figma', 'Storybook', 'Tailwind CSS', 'Design Tokens'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Integrating cutting-edge technologies like AI and real-time features.',
    technologies: ['OpenAI API', 'WebSockets', 'Three.js', 'WebRTC'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Leading projects with clear communication and agile methodologies.',
    technologies: ['Git', 'Jira', 'Slack', 'Code Reviews', 'Mentoring'],
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Heart,
    title: 'Passion & Craft',
    description: 'Obsessing over details and continuously learning new technologies.',
    technologies: ['Clean Code', 'Performance', 'Accessibility', 'UX'],
    color: 'from-pink-500 to-rose-500'
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

export function SkillsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 bg-surface rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {skill.title}
                </h3>

                <p className="text-foreground-secondary mb-4 leading-relaxed">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background text-foreground-secondary text-sm rounded-full border border-white/10 group-hover:border-primary/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
