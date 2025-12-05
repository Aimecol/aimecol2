'use client'

import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  TrendingUp, 
  BookOpen, 
  Code, 
  Lightbulb,
  Heart,
  Coffee,
  Search,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/ui/Particles'

const blogPosts = [
  {
    id: 'building-vendorflow-fraud-detection',
    title: 'Building VendorFlow: Fraud Detection in React',
    excerpt: 'How we implemented real-time fraud detection using React, WebSockets, and machine learning to protect thousands of transactions.',
    content: 'A deep dive into the technical challenges and solutions we developed for real-time fraud detection...',
    date: '2024-11-10',
    readTime: '8 min read',
    category: 'Development',
    tags: ['React', 'WebSockets', 'Machine Learning', 'Security'],
    featured: true,
    image: '/blog/vendorflow-fraud.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  },
  {
    id: 'flutter-mobile-innovation',
    title: 'Why I Love Flutter for Mobile Innovation',
    excerpt: 'Exploring Flutter\'s capabilities for rapid prototyping and cross-platform development through real project examples.',
    content: 'Flutter has revolutionized how I approach mobile development. Here\'s why it\'s my go-to framework...',
    date: '2024-10-28',
    readTime: '6 min read',
    category: 'Mobile',
    tags: ['Flutter', 'Mobile Development', 'Cross-platform', 'Innovation'],
    featured: false,
    image: '/blog/flutter-innovation.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  },
  {
    id: 'teamwork-lessons-ikigugu',
    title: 'Teamwork Lessons from Ikigugu Internship',
    excerpt: 'Key insights about collaboration, communication, and leadership gained during my internship experience.',
    content: 'Working with diverse teams taught me invaluable lessons about effective collaboration...',
    date: '2024-10-15',
    readTime: '5 min read',
    category: 'Career',
    tags: ['Teamwork', 'Leadership', 'Career Growth', 'Internship'],
    featured: false,
    image: '/blog/teamwork-lessons.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  },
  {
    id: 'nextjs-performance-optimization',
    title: 'Next.js Performance: From Good to Great',
    excerpt: 'Advanced techniques for optimizing Next.js applications, including code splitting, image optimization, and caching strategies.',
    content: 'Performance optimization is crucial for user experience. Here are the techniques I use...',
    date: '2024-09-22',
    readTime: '10 min read',
    category: 'Development',
    tags: ['Next.js', 'Performance', 'Optimization', 'Web Development'],
    featured: true,
    image: '/blog/nextjs-performance.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  },
  {
    id: 'design-systems-react',
    title: 'Building Scalable Design Systems with React',
    excerpt: 'A comprehensive guide to creating maintainable design systems that grow with your product and team.',
    content: 'Design systems are the backbone of consistent user experiences. Here\'s how to build them right...',
    date: '2024-09-08',
    readTime: '12 min read',
    category: 'Design',
    tags: ['Design Systems', 'React', 'Component Library', 'UI/UX'],
    featured: false,
    image: '/blog/design-systems.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  },
  {
    id: 'ai-integration-web-apps',
    title: 'Integrating AI into Web Applications',
    excerpt: 'Practical approaches to adding AI capabilities to web apps, from simple APIs to complex machine learning models.',
    content: 'AI is transforming web development. Here\'s how to integrate it effectively into your applications...',
    date: '2024-08-25',
    readTime: '9 min read',
    category: 'Innovation',
    tags: ['AI', 'Machine Learning', 'Web Development', 'APIs'],
    featured: false,
    image: '/blog/ai-integration.jpg',
    author: {
      name: 'Aime Claudien',
      avatar: '/avatars/aime.jpg'
    },
  }
]

const categories = ['All', 'Development', 'Mobile', 'Design', 'Career', 'Innovation']

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [subscribeMessage, setSubscribeMessage] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscribeStatus('idle')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSubscribeStatus('success')
      setSubscribeMessage('Thank you for subscribing! Check your email for confirmation.')
      setEmail('')
    } catch (error: any) {
      console.error('Subscription error:', error)
      setSubscribeStatus('error')
      setSubscribeMessage(error.message || 'Failed to subscribe. Please try again.')
    } finally {
      setIsSubscribing(false)
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus('idle')
        setSubscribeMessage('')
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      </div>

      <div className="absolute inset-0 z-0 h-full opacity-40">
        <Particles
          particleCount={300}
          particleSpread={10}
          speed={0.05}
          particleColors={['#D77B35', '#004CFF', '#C85A23']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.9}
          alphaParticles={true}
          particleBaseSize={500}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Thoughts & Insights
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Blog</span> & Insights
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
              Sharing my journey, learnings, and insights about development, design, and innovation. 
              Join me as I explore the ever-evolving world of technology.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-white/10 rounded-full focus:outline-none focus:border-primary/50 transition-colors duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-foreground-secondary" />
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-surface text-foreground-secondary hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Posts */}
          {selectedCategory === 'All' && searchTerm === '' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-24"
            >
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  Featured Articles
                </h2>
                <p className="text-foreground-secondary">
                  Popular posts that dive deep into technical challenges and solutions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className="bg-surface rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-white text-xs rounded-full mb-2">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                            {post.title}
                          </h3>
                          
                          <p className="text-foreground-secondary mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-accent" />
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                <span className="text-lg font-normal text-foreground-secondary">
                  ({filteredPosts.length})
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="bg-surface rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 h-full">
                      {/* Image */}
                      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-surface/80 backdrop-blur-sm text-foreground text-xs rounded-full">
                            {post.category}
                          </span>
                        </div>
                        {post.featured && (
                          <div className="absolute top-4 right-4">
                            <TrendingUp className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-foreground-secondary text-sm mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-foreground-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-foreground-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-foreground-secondary mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Newsletter Signup */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-primary/5 to-accent/5 p-12 rounded-3xl border border-primary/20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Stay Updated</h2>
            </div>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Get notified when I publish new articles about development, design, and innovation. 
              No spam, just quality content.
            </p>

            {subscribeStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 max-w-md mx-auto"
              >
                {subscribeMessage}
              </motion.div>
            )}

            {subscribeStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 max-w-md mx-auto"
              >
                {subscribeMessage}
              </motion.div>
            )}

            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing}
                className="flex-1 px-6 py-3 bg-surface border border-white/10 rounded-full focus:outline-none focus:border-primary/50 transition-colors duration-200 disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
                whileTap={{ scale: isSubscribing ? 1 : 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </form>
          </motion.div> */}
        </div>
      </main>
    </div>
  )
}
