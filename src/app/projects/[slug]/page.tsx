import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

// This would typically come from a CMS or database
const projects = {
  'saas-dashboard': {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'A comprehensive analytics platform with real-time data visualization, user management, and advanced reporting features.',
    longDescription: 'This project was born from the need to create a scalable analytics platform that could handle millions of data points while maintaining real-time performance. The dashboard provides comprehensive insights into user behavior, system performance, and business metrics.',
    image: '/projects/dashboard-preview.jpg',
    images: [
      '/projects/dashboard-1.jpg',
      '/projects/dashboard-2.jpg',
      '/projects/dashboard-3.jpg'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'WebSockets'],
    category: 'Web App',
    year: '2024',
    duration: '3 months',
    role: 'Full-Stack Developer & Designer',
    team: 'Solo Project',
    links: {
      live: 'https://dashboard-demo.aimecol.dev',
      github: 'https://github.com/aimecol/saas-dashboard'
    },
    problem: 'Existing analytics tools were either too expensive for small businesses or lacked the customization needed for specific use cases. There was a gap in the market for an affordable, highly customizable analytics platform.',
    solution: 'Built a modular analytics dashboard that allows users to create custom reports, set up real-time alerts, and integrate with multiple data sources. The platform uses a microservices architecture for scalability.',
    impact: [
      '40% reduction in data processing time',
      '99.9% uptime achieved',
      'Supports 10,000+ concurrent users',
      'Reduced client reporting time by 60%'
    ],
    features: [
      'Real-time data visualization',
      'Custom dashboard builder',
      'Advanced filtering and segmentation',
      'Automated report generation',
      'Multi-tenant architecture',
      'API integrations',
      'Role-based access control',
      'Export capabilities'
    ],
    techDetails: {
      frontend: 'Built with React 18 and TypeScript for type safety. Used Recharts for data visualization and Framer Motion for smooth animations.',
      backend: 'Node.js with Express, PostgreSQL for data storage, Redis for caching, and WebSockets for real-time updates.',
      deployment: 'Deployed on AWS with Docker containers, using CloudFront for CDN and RDS for database management.'
    }
  },
  'mobile-fitness': {
    id: 'mobile-fitness',
    title: 'FitTrack Mobile App',
    description: 'Cross-platform fitness tracking app with workout planning, progress analytics, and social features.',
    longDescription: 'FitTrack was designed to solve the problem of fragmented fitness tracking. Users often had to use multiple apps for different aspects of their fitness journey. This app combines workout planning, nutrition tracking, progress monitoring, and social features in one seamless experience.',
    image: '/projects/mobile-app-preview.jpg',
    images: [
      '/projects/mobile-1.jpg',
      '/projects/mobile-2.jpg',
      '/projects/mobile-3.jpg'
    ],
    tags: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Expo'],
    category: 'Mobile App',
    year: '2024',
    duration: '4 months',
    role: 'Mobile Developer & UX Designer',
    team: '2 developers, 1 designer',
    links: {
      live: 'https://fittrack-demo.aimecol.dev',
      github: 'https://github.com/aimecol/fittrack-mobile'
    },
    problem: 'Most fitness apps focus on only one aspect of health and fitness. Users had to juggle multiple apps, leading to poor user experience and inconsistent data tracking.',
    solution: 'Created a comprehensive fitness ecosystem that combines workout tracking, nutrition monitoring, progress analytics, and social features. The app uses machine learning to provide personalized recommendations.',
    impact: [
      '50,000+ downloads in first 3 months',
      '4.8/5 star rating on app stores',
      '85% user retention rate',
      'Featured in "Best Health Apps" lists'
    ],
    features: [
      'Workout planning and tracking',
      'Nutrition and calorie tracking',
      'Progress photos and measurements',
      'Social challenges and leaderboards',
      'Personalized workout recommendations',
      'Integration with wearable devices',
      'Offline mode support',
      'Custom exercise library'
    ],
    techDetails: {
      frontend: 'React Native with Expo for cross-platform development. Used Redux for state management and React Navigation for routing.',
      backend: 'Firebase for authentication, Firestore for data storage, and Cloud Functions for serverless backend logic.',
      deployment: 'Published on both iOS App Store and Google Play Store with automated CI/CD pipeline.'
    }
  },
  'design-system': {
    id: 'design-system',
    title: 'Nexus Design System',
    description: 'A comprehensive design system with 50+ components, design tokens, and documentation for enterprise applications.',
    longDescription: 'Nexus Design System was created to solve the problem of inconsistent UI/UX across multiple products in a large organization. It provides a single source of truth for design decisions and accelerates development while maintaining quality.',
    image: '/projects/design-system-preview.jpg',
    images: [
      '/projects/design-1.jpg',
      '/projects/design-2.jpg',
      '/projects/design-3.jpg'
    ],
    tags: ['React', 'Storybook', 'Figma', 'TypeScript', 'Rollup', 'Jest'],
    category: 'Design System',
    year: '2023',
    duration: '6 months',
    role: 'Design System Lead',
    team: '3 designers, 4 developers',
    links: {
      live: 'https://nexus-ds.aimecol.dev',
      github: 'https://github.com/aimecol/nexus-design-system'
    },
    problem: 'The organization had 15+ products with inconsistent design patterns, leading to poor user experience, increased development time, and maintenance overhead.',
    solution: 'Built a comprehensive design system with reusable components, design tokens, and clear documentation. Established governance processes and tooling for adoption across teams.',
    impact: [
      '60% reduction in design-to-development time',
      '90% component reusability across products',
      'Improved accessibility compliance to WCAG 2.1 AA',
      'Adopted by 12 product teams'
    ],
    features: [
      '50+ React components',
      'Design tokens for colors, typography, spacing',
      'Comprehensive Storybook documentation',
      'Figma component library',
      'Automated testing suite',
      'NPM package distribution',
      'Migration guides and tools',
      'Accessibility guidelines'
    ],
    techDetails: {
      frontend: 'React components with TypeScript, built with Rollup for optimal bundle size. Storybook for documentation and testing.',
      design: 'Figma for design components and tokens, with automated sync between design and code using Figma API.',
      deployment: 'Published to NPM registry with automated versioning and changelog generation.'
    }
  },
  'ai-chat': {
    id: 'ai-chat',
    title: 'AI-Powered Chat Assistant',
    description: 'Intelligent chat interface with context awareness, file uploads, and real-time collaboration features.',
    longDescription: 'This AI chat assistant was built to demonstrate advanced integration with modern AI APIs while maintaining a focus on user experience and real-time collaboration. It showcases the potential of AI-powered interfaces in professional workflows.',
    image: '/projects/ai-chat-preview.jpg',
    images: [
      '/projects/ai-1.jpg',
      '/projects/ai-2.jpg',
      '/projects/ai-3.jpg'
    ],
    tags: ['Next.js', 'OpenAI API', 'WebSockets', 'Prisma', 'PostgreSQL', 'Vercel AI SDK'],
    category: 'Innovation',
    year: '2024',
    duration: '2 months',
    role: 'Full-Stack Developer',
    team: 'Solo Project',
    links: {
      live: 'https://ai-chat.aimecol.dev',
      github: 'https://github.com/aimecol/ai-chat-assistant'
    },
    problem: 'Most AI chat interfaces lack context awareness and collaboration features needed for professional use. They also struggle with file handling and maintaining conversation history.',
    solution: 'Built an intelligent chat interface that maintains context across conversations, supports file uploads and analysis, and enables real-time collaboration between multiple users and AI assistants.',
    impact: [
      'Processes 1000+ messages daily',
      'Supports 20+ file formats',
      '95% user satisfaction rate',
      'Featured in AI tool directories'
    ],
    features: [
      'Context-aware conversations',
      'File upload and analysis',
      'Real-time collaboration',
      'Conversation history and search',
      'Custom AI model integration',
      'Code syntax highlighting',
      'Export conversations',
      'Dark/light mode support'
    ],
    techDetails: {
      frontend: 'Next.js 14 with App Router, Vercel AI SDK for streaming responses, and WebSockets for real-time features.',
      backend: 'Prisma ORM with PostgreSQL, OpenAI API integration, and file processing with multiple format support.',
      deployment: 'Deployed on Vercel with edge functions for optimal performance and global distribution.'
    }
  }
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects[params.slug as keyof typeof projects]
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Aimecol`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }))
}

export default function ProjectPage({ params }: Props) {
  const project = projects[params.slug as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full">
              {project.category}
            </span>
            <div className="flex items-center gap-2 text-foreground-secondary">
              <Calendar className="w-4 h-4" />
              {project.year}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            {project.title}
          </h1>

          <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Project
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              View Code
            </a>
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 aspect-video flex items-center justify-center">
          <div className="text-6xl font-bold text-white/20">
            {project.category.split(' ')[0]}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-primary mb-2">Duration</h3>
            <p className="text-foreground-secondary">{project.duration}</p>
          </div>
          <div className="bg-surface p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-primary mb-2">Role</h3>
            <p className="text-foreground-secondary">{project.role}</p>
          </div>
          <div className="bg-surface p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-primary mb-2">Team</h3>
            <p className="text-foreground-secondary">{project.team}</p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-primary">The Problem</h2>
            <p className="text-foreground-secondary leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-primary">The Solution</h2>
            <p className="text-foreground-secondary leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Impact & Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.impact.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Technical Implementation</h2>
          <div className="space-y-6">
            {Object.entries(project.techDetails).map(([key, value]) => (
              <div key={key} className="bg-surface p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-primary mb-3 capitalize">{key}</h3>
                <p className="text-foreground-secondary leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 px-4 py-2 bg-surface text-foreground-secondary rounded-full border border-white/10"
              >
                <Tag className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project */}
        <div className="text-center pt-12 border-t border-white/10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            View More Projects
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
