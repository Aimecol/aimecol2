'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  MessageCircle,
  Zap,
  ImageIcon,
  Database,
  Code,
  TrendingUp,
  CheckCircle,
  Gauge,
  Layers
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPost = {
  title: 'Next.js Performance: From Good to Great',
  date: '2024-09-22',
  readTime: '10 min read',
  category: 'Development',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  views: 1456,
  likes: 112,
  tags: ['Next.js', 'Performance', 'Optimization', 'Web Development'],
  excerpt: 'Advanced techniques for optimizing Next.js applications, including code splitting, image optimization, and caching strategies.'
}

const sections = [
  {
    id: 'introduction',
    title: 'Performance Matters More Than Ever',
    icon: Zap,
    content: `
Performance isn't a feature—it's a requirement. Studies consistently show that even 100ms of additional latency impacts user engagement and conversion rates.

When I first started building with Next.js, I was focused on shipping features quickly. The framework's defaults made this easy. But as my applications scaled, I started hitting performance bottlenecks that naive optimizations couldn't solve.

That's when I realized: Next.js gives you incredible tools for performance, but you need to understand them to leverage them effectively. The difference between a slow Next.js app and a blazing-fast one often comes down to three things: understanding how Next.js serves content, being intentional about what you ship to the browser, and measuring everything.

This post shares the advanced optimization techniques I've learned through building production applications that serve millions of requests. These are the strategies that took my apps from "good" to "genuinely fast."
    `
  },
  {
    id: 'core-metrics',
    title: 'Understanding Web Vitals',
    icon: Gauge,
    content: `
Before optimizing, you need metrics. Google's Core Web Vitals are the industry standard:

**Largest Contentful Paint (LCP)** - Time until the largest visible element renders. Target: <2.5s

**First Input Delay (FID)** - Time between user interaction and response. Target: <100ms
(Note: Being replaced by Interaction to Next Paint - INP)

**Cumulative Layout Shift (CLS)** - Visual stability. Target: <0.1

**First Contentful Paint (FCP)** - When first content appears. Target: <1.8s

**Time to First Byte (TTFB)** - Server response time. Target: <600ms

I use three tools religiously:

1. **Lighthouse** - Built into Chrome DevTools, gives actionable recommendations
2. **WebPageTest** - Detailed waterfall charts and filmstrips
3. **Next.js Analytics** - Real user data from your production app

\`\`\`bash
# Generate Lighthouse report from command line
npx lighthouse https://yoursite.com --view
\`\`\`

**My baseline approach:** Start with Lighthouse, aim for 90+ score. Then use real user analytics to find the 80/20 issues.
    `
  },
  {
    id: 'code-splitting',
    title: 'Smart Code Splitting & Bundle Analysis',
    icon: Layers,
    content: `
One of the biggest performance wins comes from shipping less JavaScript. Next.js handles most code splitting automatically, but you need to be intentional.

**1. Analyze Your Bundle**

First, understand what you're shipping:

\`\`\`bash
npm install --save-dev @next/bundle-analyzer

# In next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

# Run it
ANALYZE=true npm run build
\`\`\`

This visualizes your bundle and reveals bloated dependencies. I once found a 200KB dependency that was barely used—removing it cut our bundle by 15%.

**2. Dynamic Imports**

Load components only when needed:

\`\`\`typescript
import dynamic from 'next/dynamic'

// Heavy component only loads when needed
const HeavyAnalyticsDashboard = dynamic(
  () => import('@/components/analytics-dashboard'),
  { loading: () => <div>Loading...</div> }
)

export function Page() {
  const [showAnalytics, setShowAnalytics] = useState(false)
  
  return (
    <>
      <button onClick={() => setShowAnalytics(true)}>
        Show Analytics
      </button>
      {showAnalytics && <HeavyAnalyticsDashboard />}
    </>
  )
}
\`\`\`

**3. Route-Based Code Splitting**

Next.js automatically splits code per route. Verify with the bundle analyzer that pages aren't importing unnecessary code from other pages.

**Real impact:** I reduced initial page load from 85KB to 32KB by moving an analytics library to dynamic import, improving LCP by 1.2 seconds.
    `
  },
  {
    id: 'image-optimization',
    title: 'Image Optimization - The Biggest Win',
    icon: ImageIcon,
    content: `
Images typically account for 50%+ of a webpage's bytes. Optimizing them is often the easiest 10x improvement.

**Use Next.js Image Component**

Never use \`<img>\` in Next.js. Always use the Image component:

\`\`\`typescript
import Image from 'next/image'

export function HeroSection() {
  return (
    <Image
      src="/hero.png"
      alt="Hero image"
      width={1200}
      height={600}
      priority // For above-the-fold images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur" // Shows blurred version while loading
      quality={75} // Balance between quality and size
    />
  )
}
\`\`\`

**Key features:**
- Automatic format selection (WebP, AVIF when supported)
- Responsive image serving based on device size
- Lazy loading by default
- \`priority\` prop for above-the-fold images
- Built-in blur placeholder

**Advanced: Responsive Images with srcSet**

\`\`\`typescript
import Image from 'next/image'

export function ResponsiveGallery() {
  return (
    <Image
      src="/large-image.png"
      alt="Gallery"
      width={1200}
      height={800}
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        (max-width: 1280px) 33vw,
        25vw
      "
    />
  )
}
\`\`\`

**Optimization checklist:**
- [ ] WebP format for all images
- [ ] Properly sized images (not 4000px wide for mobile)
- [ ] Lazy loading except above-the-fold
- [ ] Blur placeholders for social sharing
- [ ] Proper aspect ratios to prevent layout shift

**Real impact:** Switched 30+ images to Next.js Image component with responsive sizes. Saved 400KB and reduced LCP by 0.8s.
    `
  },
  {
    id: 'caching-strategy',
    title: 'Intelligent Caching Strategy',
    icon: Database,
    content: `
Caching is where performance compounds. Missing cache headers can mean re-downloading identical content.

**1. Static Generation with Revalidation**

Use ISR (Incremental Static Regeneration) for content that updates infrequently:

\`\`\`typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Regenerate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  
  return <article>{post.content}</article>
}
\`\`\`

This generates static HTML at build time, serves it instantly, and regenerates in the background. Users always get fast static content.

**2. Server-Side Caching with Headers**

Control browser caching with response headers:

\`\`\`typescript
// app/api/data/route.ts
export async function GET() {
  const data = await fetchExpensiveData()
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      // max-age: browser cache (1 hour)
      // s-maxage: CDN cache (1 day)
    },
  })
}
\`\`\`

**3. On-Demand ISR**

Regenerate pages when content changes:

\`\`\`typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const secret = request.headers.get('x-api-secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  revalidatePath('/blog/[slug]', 'page')
  return Response.json({ revalidated: true })
}
\`\`\`

Then call from your CMS when content changes:

\`\`\`typescript
// When content is published in CMS
await fetch('https://yoursite.com/api/revalidate', {
  method: 'POST',
  headers: { 'x-api-secret': REVALIDATE_SECRET }
})
\`\`\`

**Caching hierarchy I use:**
- Static content (images, fonts): 1 year
- API responses: 1 hour (browser), 1 day (CDN)
- HTML pages: 1 minute (browser), 1 hour (CDN)
- Dynamic pages: No cache
    `
  },
  {
    id: 'third-party',
    title: 'Third-Party Script Management',
    icon: Code,
    content: `
Third-party scripts (analytics, ads, etc.) can tank performance. Next.js has a dedicated solution.

**Use the Script Component**

\`\`\`typescript
import Script from 'next/script'

export function Layout() {
  return (
    <>
      <Script
        src="https://cdn.example.com/analytics.js"
        strategy="lazyOnload" // Load after page is interactive
        onLoad={() => console.log('Analytics loaded')}
      />
      
      <Script
        src="https://cdn.example.com/ads.js"
        strategy="afterInteractive" // Safe for ads
      />
      
      <Script
        src="https://cdn.example.com/critical.js"
        strategy="beforeInteractive" // Only if truly needed
      />
    </>
  )
}
\`\`\`

**Strategy explanations:**
- **beforeInteractive**: Executes before hydration. Use rarely—only for critical scripts
- **afterInteractive**: Default. Safe for most third-party scripts
- **lazyOnload**: Loads after page interaction. Perfect for analytics and non-critical
- **worker**: Runs in Web Worker (experimental)

**Real example: Analytics**

\`\`\`typescript
import Script from 'next/script'

export function AnalyticsScript() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
      strategy="lazyOnload"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_ID');
      }}
    />
  )
}
\`\`\`

**Impact:** Moving analytics to lazyOnload reduced my FID by 120ms because the script doesn't block user interactions.
    `
  },
  {
    id: 'rendering-strategies',
    title: 'Choosing the Right Rendering Strategy',
    icon: TrendingUp,
    content: `
Next.js 13+ App Router gives you three options per route. Choosing wisely is crucial for performance.

**1. Static (SSG) - Fastest**

\`\`\`typescript
// app/docs/page.tsx
// Rendered at build time, served instantly

export const revalidate = false // Cache indefinitely

export default async function DocsPage() {
  return <div>Fast static content</div>
}
\`\`\`

When to use: Blog posts, documentation, marketing pages, anything that doesn't change frequently

**2. Dynamic with Caching (ISR)**

\`\`\`typescript
// app/products/[id]/page.tsx
// Generated on-demand, cached, regenerated periodically

export const revalidate = 3600 // Regenerate every hour

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  return <ProductDetail product={product} />
}
\`\`\`

When to use: E-commerce products, user profiles, content that changes but not constantly

**3. Server-Side Rendering (SSR)**

\`\`\`typescript
// app/dashboard/page.tsx
// Rendered on each request

export const revalidate = 0 // No caching

export default async function Dashboard() {
  const user = await getCurrentUser()
  const data = await getUserData()
  
  return <Dashboard user={user} data={data} />
}
\`\`\`

When to use: User-specific content, real-time data, authenticated pages

**Performance impact:**
- Static: 50ms response time
- ISR: 100-200ms response time (first request slower, then cached)
- SSR: 200-500ms (depends on data fetching)

**Pro tip:** Use streaming for slow data:

\`\`\`typescript
import { Suspense } from 'react'

async function SlowComponent() {
  const data = await fetchSlowData()
  return <div>{data}</div>
}

export default function Page() {
  return (
    <>
      <FastHeader />
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </>
  )
}
\`\`\`

This renders the page immediately while slow data loads—users see content faster.
    `
  },
  {
    id: 'monitoring',
    title: 'Continuous Performance Monitoring',
    icon: CheckCircle,
    content: `
Performance optimization isn't a one-time task—it's continuous. You need visibility into your metrics.

**1. Core Web Vitals in Production**

\`\`\`typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

This sends real user data to Vercel Analytics. You can see:
- Actual user experience (not just lab testing)
- Performance by geography
- Performance by device type
- Trends over time

**2. Custom Performance Tracking**

\`\`\`typescript
// lib/performance.ts
export function trackMetric(name: string, value: number) {
  // Send to your analytics service
  window.gtag?.('event', 'performance', {
    metric_name: name,
    metric_value: value,
  })
}

// Usage in components
useEffect(() => {
  const start = performance.now()
  
  return () => {
    const duration = performance.now() - start
    trackMetric('component_render_time', duration)
  }
}, [])
\`\`\`

**3. Performance Budgets**

Set maximum allowed bundle sizes:

\`\`\`typescript
// next.config.ts
import { NextConfig } from 'next'

const config: NextConfig = {
  typescript: { tsconfigPath: './tsconfig.json' },
}

// Add to package.json scripts
// "size-limit": "size-limit",

// .size-limit.json
[
  {
    "path": ".next/static/chunks/main*.js",
    "limit": "50 KB"
  },
  {
    "path": ".next/static/chunks/app-*.js",
    "limit": "100 KB"
  }
]
\`\`\`

**My monitoring dashboard setup:**
- Weekly Lighthouse scores
- Daily Core Web Vitals averages
- Performance budget alerts
- User experience metrics by country

Treat performance like a product metric. When metrics regress, investigate immediately.
    `
  },
  {
    id: 'checklist',
    title: 'Performance Optimization Checklist',
    icon: CheckCircle,
    content: `
**Images**
- [ ] Using Next.js Image component everywhere
- [ ] Responsive images with sizes prop
- [ ] Blur placeholder for above-fold images
- [ ] Priority prop for LCP images
- [ ] Quality set to 75-85%

**JavaScript**
- [ ] Bundle analyzed with @next/bundle-analyzer
- [ ] Heavy components dynamic imported
- [ ] Third-party scripts use appropriate strategy
- [ ] No unused dependencies
- [ ] Tree-shaking enabled

**Caching**
- [ ] Static pages use ISR
- [ ] Cache headers set appropriately
- [ ] CDN configured
- [ ] On-demand ISR for content updates
- [ ] Service Worker for offline support

**Rendering**
- [ ] Static where possible
- [ ] ISR for semi-static content
- [ ] Streaming for slow queries
- [ ] No unnecessary SSR
- [ ] Database queries optimized

**Monitoring**
- [ ] Analytics configured
- [ ] Lighthouse monitored weekly
- [ ] Core Web Vitals tracked
- [ ] Performance budget enforced
- [ ] Alerts set for regressions

**Testing**
- [ ] Lighthouse score >90
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] First Byte <600ms

**Quick wins I recommend for any project:**
1. Implement Next.js Image for all images (1-2 hours, massive impact)
2. Add analytics (30 min, but invaluable)
3. Move third-party to lazyOnload (15 min, real improvements)
4. Review and optimize imports (1 hour, 5-20% bundle reduction)
5. Set up bundle analyzer (5 min setup, ongoing insights)
    `
  },
  {
    id: 'conclusion',
    title: 'Performance is a Journey',
    icon: TrendingUp,
    content: `
I've taken applications from Lighthouse scores of 45 to 95+. It's not magic—it's understanding the tools Next.js gives you and applying them systematically.

**Key principles I've learned:**

1. **Measure first** - You can't optimize what you don't measure. Get Lighthouse and real user analytics set up immediately.

2. **Think in layers** - Optimize static content first (highest impact, easiest). Then caching. Then rendering strategy. Then JavaScript.

3. **User experience matters more than numbers** - Core Web Vitals matter because they impact how users feel your site. A Lighthouse score of 85 with good real user experience beats 95 with poor caching.

4. **Performance is continuous** - Regressions happen. Monitor regularly and address issues quickly.

5. **Next.js does the heavy lifting** - The framework handles most optimization automatically. Your job is to not sabotage it and to use its tools effectively.

**The business case:**
Performance improvements correlate directly with business metrics:
- 100ms faster = 1% more conversions (Google)
- Every second of improvement = 7% more conversions (Amazon)

For my projects, optimizing from average to top 10% performance translated to 3-8% revenue improvement on e-commerce, and 15-20% improvement in user engagement on content sites.

**Final thought:**
The difference between a slow app and a fast one often isn't more work—it's intentionality. Making good choices about images, caching, and rendering strategy takes minimal additional effort but compounds into massive performance gains.

Start today. Measure your current performance, pick one optimization from this post, implement it, and measure the impact. You'll be amazed at what's possible.

Here's to building fast, delightful user experiences with Next.js.
    `
  }
]

export default function NextJsPerformancePage() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {blogPost.category}
            </span>
            {blogPost.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
            {blogPost.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">{blogPost.author.name}</p>
                <p className="text-sm text-foreground-secondary">{blogPost.author.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-foreground-secondary text-sm md:ml-auto">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {blogPost.views} views
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 h-96 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 rounded-2xl border border-white/10 flex items-center justify-center"
        >
          <div className="text-center">
            <Zap className="w-24 h-24 mx-auto text-primary mb-4 opacity-50" />
            <p className="text-foreground-secondary">Next.js Performance Optimization</p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-20 mb-20">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-mt-24"
                id={section.id}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">{section.title}</h2>
                </div>

                <div className="prose prose-invert max-w-none space-y-4">
                  {section.content.split('\n\n').map((paragraph, i) => {
                    // Handle code blocks
                    if (paragraph.includes('```')) {
                      const parts = paragraph.split('```')
                      return (
                        <div key={i} className="space-y-2">
                          {parts.map((part, j) => {
                            if (j % 2 === 0 && part.trim()) {
                              return (
                                <p
                                  key={j}
                                  className="text-foreground-secondary leading-relaxed"
                                >
                                  {part.trim()}
                                </p>
                              )
                            } else if (j % 2 === 1) {
                              const code = part.split('\n').slice(1).join('\n')
                              return (
                                <pre
                                  key={j}
                                  className="bg-surface-darker border border-white/10 rounded-lg p-4 overflow-x-auto"
                                >
                                  <code className="text-sm text-green-400 font-mono">
                                    {code}
                                  </code>
                                </pre>
                              )
                            }
                            return null
                          })}
                        </div>
                      )
                    }

                    // Handle bold headers with content
                    if (paragraph.includes('**')) {
                      const lines = paragraph.split('\n')
                      return (
                        <div key={i} className="space-y-2">
                          {lines.map((line, idx) => {
                            if (line.startsWith('**') && line.includes(' - ')) {
                              const [boldPart, rest] = line.split(' - ')
                              return (
                                <p key={idx} className="text-foreground-secondary leading-relaxed">
                                  <span className="font-bold text-foreground">{boldPart.replace(/\*\*/g, '')}</span> - {rest}
                                </p>
                              )
                            } else if (line.startsWith('**')) {
                              return (
                                <p key={idx} className="font-bold text-foreground">
                                  {line.replace(/\*\*/g, '')}
                                </p>
                              )
                            }
                            return (
                              <p key={idx} className="text-foreground-secondary leading-relaxed">
                                {line}
                              </p>
                            )
                          })}
                        </div>
                      )
                    }

                    // Handle bullet lists starting with [ ]
                    if (paragraph.includes('- [ ]') || paragraph.includes('- ')) {
                      const items = paragraph.split('\n').filter(item => item.trim())
                      return (
                        <ul key={i} className="space-y-1 ml-4">
                          {items.map((item, idx) => (
                            <li key={idx} className="text-foreground-secondary leading-relaxed">
                              {item.replace('- [ ] ', '☐ ').replace('- ', '• ')}
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    // Regular paragraphs
                    if (paragraph.trim()) {
                      return (
                        <p
                          key={i}
                          className="text-foreground-secondary leading-relaxed"
                        >
                          {paragraph.trim()}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </motion.section>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16" />

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-full transition-all duration-200 ${
                liked
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-surface text-foreground-secondary hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-3 rounded-full transition-all duration-200 ${
                bookmarked
                  ? 'bg-primary/20 text-primary'
                  : 'bg-surface text-foreground-secondary hover:text-primary'
              }`}
            >
              <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-surface text-foreground-secondary hover:text-primary transition-colors duration-200"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="flex items-center gap-4 text-sm text-foreground-secondary">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{blogPost.likes} likes</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>41 comments</span>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-16"
        >
          <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Building Scalable Design Systems with React',
                excerpt: 'A comprehensive guide to creating maintainable design systems.',
                link: '/blog/design-systems-react'
              },
              {
                title: 'Building VendorFlow: Fraud Detection in React',
                excerpt: 'How we implemented real-time fraud detection using React and machine learning.',
                link: '/blog/building-vendorflow-fraud-detection'
              }
            ].map((post, index) => (
              <motion.article
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 bg-surface rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <Link href={post.link} className="group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-foreground-secondary mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    Read Article <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
