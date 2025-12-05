"use client"

import { EnhancedHeroWithScroll } from "@/components/enhanced-hero"
import { TechOrbit } from "@/components/tech-orbit"
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects"
import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { ProcessSection } from "@/components/process-section"
import { motion } from "framer-motion"
import Particles from "@/components/ui/Particles"
import { lazy, Suspense } from "react"
import { ArrowRight, Code2, Layers, Smartphone, Users } from "lucide-react"
import Link from "next/link"

// Lazy load heavy components
const LazyInnovationShowcase = lazy(() =>
  import("@/components/innovation-showcase").then((mod) => ({ default: mod.InnovationShowcase })),
)

const stats = [
  { label: "Projects Completed", value: "50+", icon: Code2 },
  { label: "Happy Clients", value: "30+", icon: Users },
  { label: "Technologies", value: "15+", icon: Layers },
  { label: "Mobile Apps", value: "10+", icon: Smartphone },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background -z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="fixed inset-0 -z-10 opacity-40">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.05}
          particleColors={["#D77B35", "#004CFF", "#C85A23"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.9}
          alphaParticles={true}
          particleBaseSize={500}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section aria-label="Hero Section">
          <EnhancedHeroWithScroll />
        </section>

        <section aria-label="Statistics" className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section aria-labelledby="tech-stack-heading" className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tech <span className="gradient-text">Stack</span>
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">Technologies I work with to bring ideas to life</p>
              <TechOrbit />
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="py-20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="gradient-text">Me</span>
              </h2>
              <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                Comprehensive solutions backed by expertise, innovation, and a commitment to excellence.
              </p>
            </motion.div>
            <FeaturesSectionWithHoverEffects />
          </div>
        </section>

        {/* Client Testimonials */}
        <section aria-labelledby="testimonials-heading">
          <TestimonialsSection
            title="Testimonials"
            description="Hear what they have to say"
            testimonials={[
              {
                author: {
                  name: "Ingabire Nice Sandra",
                  handle: "@ingabirenice",
                  avatar: "https://images.aimecol.com/uploads/large/emy-0075_691c64f1f1943_large.jpg",
                },
                text: "Outstanding work ethic and technical expertise. Highly recommend for any complex project.",
                href: "https://instagram.com/ingabirenice",
              },
              {
                author: {
                  name: "Mwizerwa Honore Frank",
                  handle: "@honorefrank",
                  avatar: "https://images.aimecol.com/uploads/large/honore_691c45df9d589_large.jpg",
                },
                text: "Aimecol is a very talented and reliable developer. I really like how clean and professional his projects look.",
                href: "https://instagram.com/honorefrank",
              },
              {
                author: {
                  name: "Igiraneza Fabrice",
                  handle: "@igifabrice",
                  avatar:
                    "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-14-at-4-04-38-pm_691c45e88974f_large.jpg",
                },
                text: "Working with Aimecol was a game-changer. The full-stack solution was delivered on time and within budget.",
                href: "https://instagram.com/igifabrice",
              },
              {
                author: {
                  name: "Naomi",
                  handle: "@onika",
                  avatar:
                    "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-15-at-5-13-47-pm_691c470c41732_large.jpg",
                },
                text: "The UI/UX design and development skills are top-notch. Our users love the intuitive interface and smooth performance.",
                href: "https://wa.me/+250780077106?text=Hello%2C%20I%27d%20like%20to%20chat%20with%20you.",
              },
              {
                author: {
                  name: "Ishimwe Celie",
                  handle: "@celia",
                  avatar:
                    "https://images.aimecol.com/uploads/large/whatsapp-image-2025-11-14-at-4-23-26-pm_691c45e985bec_large.jpg",
                },
                text: "Aimecol's expertise in Flutter helped us launch our cross-platform app successfully. Highly recommended!",
                href: "https://wa.me/+250798447952?text=Hello%2C%20I%27d%20like%20to%20chat%20with%20you.",
              },
              {
                author: {
                  name: "Christian",
                  handle: "@chris",
                  avatar: "https://images.aimecol.com/uploads/large/emy-0014_691c624a51216_large.jpg",
                },
                text: "The project management and communication throughout the development process was exceptional.",
              },
              {
                author: {
                  name: "Karigirwa Henriette",
                  handle: "@melanie",
                  avatar: "https://images.aimecol.com/uploads/large/nib-5897_691c65a51799d_large.jpg",
                },
                text: "Innovative solutions and clean code architecture. Aimecol understands modern development practices perfectly.",
              },
              {
                author: {
                  name: "Baraka Mussa",
                  handle: "@mussa",
                  avatar: "https://images.aimecol.com/uploads/large/emy-0080_691c62ee24074_large.jpg",
                },
                text: "Exceptional collaboration skills and creative problem-solving. The product exceeded expectations in every way.",
                href: "https://www.instagram.com/b_a_raka?igsh=MzV1YjZ6dGV5M3pt",
              },
              {
                author: {
                  name: "Ndayishimiye Eugene",
                  handle: "@eugene",
                  avatar: "https://images.aimecol.com/uploads/large/emy-5264-2_691c6352c7a47_large.jpg",
                },
                text: "Reliable, professional, and incredibly skilled. The perfect partner for turning ambitious ideas into reality.",
              },
            ]}
          />
        </section>

        {/* Innovation Showcase - Lazy loaded */}
        <section aria-label="Innovation Showcase">
          <Suspense
            fallback={
              <div className="py-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
              </div>
            }
          >
            <LazyInnovationShowcase />
          </Suspense>
        </section>

        <section aria-label="Call to Action" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Start Your Project</span>?
              </h2>
              <p className="text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto">
                Let's collaborate to bring your ideas to life. From concept to deployment, I'm here to help you build
                something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-white/10 text-foreground font-semibold rounded-full hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    View Projects
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
