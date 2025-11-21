'use client'

import { EnhancedHeroWithScroll } from '@/components/enhanced-hero'
import { TechOrbit } from '@/components/tech-orbit'
import { InnovationShowcase } from '@/components/innovation-showcase'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'
import { motion } from 'framer-motion'

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <EnhancedHeroWithScroll />

      <div className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-xl text-foreground-secondary mb-8">
              Technologies I work with to bring ideas to life
            </p>
            <TechOrbit />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Comprehensive solutions backed by expertise, innovation, and a commitment to excellence.
            </p>
          </motion.div>
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
      
      {/* Client Testimonials */}
      <TestimonialsSection
        title="Trusted by clients worldwide"
        description="Join the growing number of satisfied clients who have transformed their ideas into successful digital products"
        testimonials={[
          {
            author: {
              name: "Ingabire Nice Sandra",
              handle: "@honorefrank",
              avatar: "https://images.aimecol.com/uploads/large/emy-0075_691c64f1f1943_large.jpg"
            },
            text: "Aimecol is a very talented and reliable developer. His portfolio shows how much effort he puts into his work, and it’s clear he keeps improving his skills every year. I really like how clean and professional his projects look.",
            href: "https://instagram.com/honorefrank"
          },
          {
            author: {
              name: "Honore frank",
              handle: "@honorefrank",
              avatar: "https://images.aimecol.com/uploads/large/honore_691c45df9d589_large.jpg"
            },
            text: "Aimecol is a very talented and reliable developer. His portfolio shows how much effort he puts into his work, and it’s clear he keeps improving his skills every year. I really like how clean and professional his projects look.",
            href: "https://instagram.com/honorefrank"
          },
          {
            author: {
              name: "Igiraneza Fabrice",
              handle: "@igifabrice",
              avatar: "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-14-at-4-04-38-pm_691c45e88974f_large.jpg"
            },
            text: "Working with Aimecol was a game-changer for our startup. The full-stack solution was delivered on time and within budget.",
            href: "https://instagram.com/igifabrice"
          },
          {
            author: {
              name: "Emily Rodriguez",
              handle: "@emilyux",
              avatar: "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-15-at-5-13-47-pm_691c470c41732_large.jpg"
            },
            text: "The UI/UX design and development skills are top-notch. Our users love the intuitive interface and smooth performance."
          },
          {
            author: {
              name: "David Park",
              handle: "@davidstartup",
              avatar: "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-14-at-4-23-26-pm_691c45e985bec_large.jpg"
            },
            text: "Aimecol's expertise in React Native helped us launch our cross-platform app successfully. Highly recommended!",
            href: "https://twitter.com/davidstartup"
          },
          {
            author: {
              name: "Lisa Thompson",
              handle: "@lisapm",
              avatar: "https://images.aimecol.com/uploads/large/emy-0014_691c624a51216_large.jpg"
            },
            text: "The project management and communication throughout the development process was exceptional. A true professional."
          },
          {
            author: {
              name: "Alex Kumar",
              handle: "@alexcode",
              avatar: "https://images.aimecol.com/uploads/large/nib-5897_691c65a51799d_large.jpg"
            },
            text: "Innovative solutions and clean code architecture. Aimecol understands modern development practices perfectly."
          },
          {
            author: {
              name: "Alex Kumar",
              handle: "@alexcode",
              avatar: "https://images.aimecol.com/uploads/large/emy-0080_691c62ee24074_large.jpg"
            },
            text: "Innovative solutions and clean code architecture. Aimecol understands modern development practices perfectly."
          },
          {
            author: {
              name: "Alex Kumar",
              handle: "@alexcode",
              avatar: "https://images.aimecol.com/uploads/large/emy-5264-2_691c6352c7a47_large.jpg"
            },
            text: "Innovative solutions and clean code architecture. Aimecol understands modern development practices perfectly."
          }
        ]}
      />
      <InnovationShowcase />
    </div>
  )
}
