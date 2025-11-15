import { EnhancedHeroWithScroll } from '@/components/enhanced-hero'
import { EnhancedSkills } from '@/components/enhanced-skills'
import { SkillsSection } from '@/components/skills-section'
import { TechOrbit } from '@/components/tech-orbit'
import { InnovationShowcase } from '@/components/innovation-showcase'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

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
      
      {/* Client Testimonials */}
      <TestimonialsSection
        title="Trusted by clients worldwide"
        description="Join the growing number of satisfied clients who have transformed their ideas into successful digital products"
        testimonials={[
          {
            author: {
              name: "Sarah Johnson",
              handle: "@sarahdev",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
            },
            text: "Aimecol delivered an exceptional mobile app that exceeded our expectations. The attention to detail and user experience is outstanding.",
            href: "https://twitter.com/sarahdev"
          },
          {
            author: {
              name: "Michael Chen",
              handle: "@michaeltech",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            text: "Working with Aimecol was a game-changer for our startup. The full-stack solution was delivered on time and within budget.",
            href: "https://twitter.com/michaeltech"
          },
          {
            author: {
              name: "Emily Rodriguez",
              handle: "@emilyux",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
            },
            text: "The UI/UX design and development skills are top-notch. Our users love the intuitive interface and smooth performance."
          },
          {
            author: {
              name: "David Park",
              handle: "@davidstartup",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            },
            text: "Aimecol's expertise in React Native helped us launch our cross-platform app successfully. Highly recommended!",
            href: "https://twitter.com/davidstartup"
          },
          {
            author: {
              name: "Lisa Thompson",
              handle: "@lisapm",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            },
            text: "The project management and communication throughout the development process was exceptional. A true professional."
          },
          {
            author: {
              name: "Alex Kumar",
              handle: "@alexcode",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
            },
            text: "Innovative solutions and clean code architecture. Aimecol understands modern development practices perfectly."
          }
        ]}
      />
      
      {/* <EnhancedSkills /> */}
      <RadialOrbitalTimeline timelineData={timelineData} />
      <InnovationShowcase />
    </div>
  )
}
