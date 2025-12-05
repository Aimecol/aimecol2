"use client"

import { motion } from "framer-motion"
import { Lightbulb, Pencil, Code, Rocket, CheckCircle } from "lucide-react"

const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "Understanding your vision, goals, and requirements to create a solid foundation",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Crafting intuitive interfaces and user experiences that delight and engage",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Development",
    description: "Building robust, scalable solutions with clean code and best practices",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: CheckCircle,
    title: "Testing",
    description: "Rigorous quality assurance to ensure everything works flawlessly",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploying your product and providing ongoing support for success",
    color: "from-red-500 to-orange-500",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My Development <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            A systematic approach to turning your ideas into reality, from concept to launch
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-xl relative z-10`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{step.description}</p>

                  {/* Step Number */}
                  <div className="mt-4 w-8 h-8 bg-surface border border-white/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
