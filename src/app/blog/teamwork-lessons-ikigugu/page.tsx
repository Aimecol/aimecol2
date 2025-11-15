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
  Users,
  Handshake,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Zap,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPost = {
  title: 'Teamwork Lessons from Ikigugu Internship',
  date: '2024-10-15',
  readTime: '5 min read',
  category: 'Career',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  likes: 45,
  tags: ['Teamwork', 'Leadership', 'Career Growth', 'Internship'],
  excerpt: 'Key insights about collaboration, communication, and leadership gained during my internship experience.'
}

const sections = [
  {
    id: 'introduction',
    title: 'More Than Just Code',
    icon: Users,
    content: `
When I started my internship at Ikigugu, I was focused on one thing: writing good code and proving my technical abilities. I thought that would be enough. I was wrong—and grateful for that lesson.

Over three months working with an incredible team, I learned that technical skills alone don't make you valuable in a professional environment. What truly matters is how you work with others, how you communicate, and how you contribute to a team's success.

This experience fundamentally changed how I approach software development and my career. I want to share what I learned because I believe these lessons will benefit anyone starting their professional journey.
    `
  },
  {
    id: 'communication',
    title: 'Communication is Everything',
    icon: MessageSquare,
    content: `
**Lesson 1: Over-communicate, not under-communicate**

On my first significant project, I spent three days working on a feature without saying a word. I thought I'd surprise everyone with a complete, polished implementation. When I finally showed it, my tech lead had to ask me to restart because I'd misunderstood the requirements—things we could have clarified in 30 minutes.

That was humbling. I learned quickly: better to ask "dumb" questions than waste days going in the wrong direction.

**What changed:**
- Daily standups: I started being specific about blockers, not just listing tasks
- Slack messages: Before diving into complex features, I'd outline my approach for feedback
- Code reviews: I welcomed feedback instead of being defensive
- Documentation: I documented decisions, not just code

**The impact:**
- Reduced rework by 60%
- Built stronger relationships with team members
- Became someone people trusted with important work

**Practical tips:**
1. Write clear daily updates—make it easy for others to help you
2. Ask questions early when you're confused
3. Give context in your communication—not just "I need help" but "here's what I tried"
4. Use the right channel—some discussions need synchronous conversation, not Slack threads

Communication isn't a soft skill—it's a technical skill that directly impacts delivery speed and code quality.
    `
  },
  {
    id: 'collaboration',
    title: 'Collaboration Over Competition',
    icon: Handshake,
    content: `
**Lesson 2: Your team's success is your success**

I noticed early on that the senior developers at Ikigugu invested significantly in helping junior developers (like me). They'd pause their own work to explain concepts, review code thoroughly, and share knowledge freely. I initially felt like I was slowing them down.

One day, my tech lead said something that shifted my perspective: "I'm not investing time in you because it's nice—I'm doing it because when you level up, our entire team becomes stronger."

That reframing was powerful. It meant:
- Helping a teammate isn't "lost time"—it's an investment in team capability
- Asking for help isn't weakness—it's accelerating collective progress
- Sharing knowledge multiplies its impact
- Your growth enables others to focus on what they do best

**This changed how I work:**
- I ask for help when stuck (after genuine effort)
- I explain my thinking during code reviews, not just the code
- I document patterns I discover
- I celebrate others' successes as genuine wins

**Real example:**
A teammate was struggling with a complex state management issue. Instead of staying siloed, we spent two hours pairing. We solved the problem together, and now that teammate understands the pattern for future use. Net result: both of us learned something, and the codebase became more consistent.

**The paradox:**
Ironically, focusing less on personal achievement and more on team success made me stand out more—because I became someone people wanted to work with.
    `
  },
  {
    id: 'feedback',
    title: 'Embrace Feedback as Growth',
    icon: Lightbulb,
    content: `
**Lesson 3: Feedback is a gift, not criticism**

Early on, code reviews felt intimidating. Someone was going to find problems with my work. My initial reaction? Get defensive. "But I thought..." or "That works because..."

The turning point came when my tech lead reviewed a PR and left 12 comments. My first instinct was dread. But then I realized: they spent time on my code because they cared about my growth. That 12 comments meant 12 opportunities to improve.

**The transformation:**
\`\`\`
BEFORE (Defensive mindset):
"Why is my approach wrong?"
"This works, isn't that enough?"
"I'll do it differently next time"

AFTER (Growth mindset):
"What don't I understand about good design?"
"How can this approach fail in production?"
"What's the principle I'm missing?"
\`\`\`

**Specific changes:**
1. Read feedback completely before responding
2. Ask "why" instead of "why not"
3. Implement suggestions fully, then ask questions if needed
4. Thank reviewers specifically for their time
5. Track patterns in feedback (if multiple people mention it, pay attention)

**The results:**
- My code quality improved dramatically
- I developed better instincts about design patterns
- I became more confident because I understood the reasoning behind best practices
- Most importantly, people wanted to review my code because I was receptive and responsive

**Lesson within the lesson:**
The best developers I worked with weren't the ones who wrote perfect code—they were the ones who continuously improved based on feedback. They asked questions, were curious, and weren't attached to their initial solutions.
    `
  },
  {
    id: 'ownership',
    title: 'Take Ownership, But Know Your Limits',
    icon: Award,
    content: `
**Lesson 4: Responsibility without isolation**

Early in my internship, I took on a feature that seemed manageable. As I dove in, I realized I was in over my head—architectural decisions, performance concerns, unfamiliar patterns. But I didn't want to ask for help because I'd said I could handle it.

This almost became a disaster. The deadline was approaching, I was stressed, and the code quality was suffering.

My manager noticed I seemed overwhelmed and pulled me aside. "Taking ownership doesn't mean doing everything alone," she said. "It means being responsible for the outcome, which includes getting help when needed."

**What I learned:**
- Ownership = responsibility, not isolation
- Knowing when to ask for help is a sign of maturity, not weakness
- You can be accountable for a task while not doing all of it
- Getting stuck and seeking help is more responsible than struggling silently

**Practical approach:**
1. Take ownership of outcomes, not just tasks
2. Set realistic timelines based on your experience
3. Flag risks early (including "I might need help with X")
4. Share progress regularly, not just at deadlines
5. Celebrate the team that helped you succeed

**The better version:**
If I had flagged the architectural concerns early, we could have:
- Had a senior developer help design the solution
- Saved days of rework
- Learned patterns more efficiently through pairing
- Delivered better code on time

That experience taught me that great teamwork means knowing when to lead and when to follow, when to push forward and when to ask for support.
    `
  },
  {
    id: 'culture',
    title: 'Culture Matters More Than You Think',
    icon: Zap,
    content: `
**Lesson 5: You\'re not just joining a company, you\'re joining a team**

One thing that struck me about Ikigugu was the intentionality around culture. It wasn't just "be nice to each other"—there were actual practices that shaped how people worked together:

**Weekly knowledge shares:** Every Friday, someone presented something they learned. No PowerPoints required, just sharing knowledge. This created an environment where learning was valued and normalized.

**Blameless postmortems:** When things went wrong, the focus was on systems and processes, not blame. I saw senior engineers own mistakes and learn from them. This meant everyone could take risks and be transparent.

**Mentorship expectations:** Helping juniors was explicitly part of senior developers' roles, not an extra. This meant they actually invested time in growth.

**Psychological safety:** People could say "I don't know" or "I made a mistake" without fear. This made it safe to be learning while doing.

**Why this matters:**

These practices weren't nice-to-haves—they directly impacted code quality, velocity, and how long people stayed engaged. I learned more in three months at Ikigugu than I would have in a year at a place without this culture.

**Taking it forward:**
Now when evaluating opportunities, I don't just ask "what's the tech stack?" I ask:
- How do they handle mistakes?
- Do people help each other grow?
- Is learning valued in practice, not just words?
- Would I want to be on a team with my would-be teammates?

Culture isn't superficial—it determines whether your technical skills can flourish or atrophy.
    `
  },
  {
    id: 'lessons-learned',
    title: 'Five Key Takeaways',
    icon: CheckCircle,
    content: `
**1. Communication multiplies your effectiveness**
Clear communication prevents rework, builds trust, and makes you invaluable to a team. Invest in getting better at it.

**2. Lift others as you grow**
The best career trajectory comes from building a reputation as someone who makes their team better. Help others succeed.

**3. Feedback is accelerated learning**
Every piece of feedback is a shortcut through years of learning by trial and error. Embrace it with curiosity.

**4. Ownership means accountability, not isolation**
You can take responsibility for outcomes while asking for help. In fact, knowing when to ask is part of being responsible.

**5. Culture determines whether you can do your best work**
No matter how talented you are, a poor culture will grind you down. A good culture will amplify your abilities.

**Bonus lesson:** None of these lessons are obvious until you experience them. The fact that you're reading this means you're already thinking about growth. That's the biggest advantage.
    `
  },
  {
    id: 'moving-forward',
    title: 'What\'s Next',
    icon: TrendingUp,
    content: `
My internship ended, but these lessons continue to guide my work. I carry them into every new project, every new team, every new challenge.

**Three months ago**, I was anxious about whether I could "make it" as a developer. I thought it was about technical prowess.

**Now**, I know it's about being someone who communicates clearly, lifts others up, welcomes feedback, takes ownership responsibly, and contributes to a positive culture.

**For anyone starting their career:**

1. **Technical skills are the price of entry**, not the differentiator
2. **How you treat people and communicate is what builds your reputation**
3. **The best opportunities go to people others want to work with**
4. **Growth comes from feedback, collaboration, and environments where that's encouraged**

The internship at Ikigugu taught me that software development is fundamentally a team sport. The code is just the manifestation of human collaboration.

I'm grateful for every person on that team—the challenges, the feedback, the knowledge shared, and the culture they created. That three-month internship reset my perspective on what it means to be a professional developer.

If you're early in your career, find a place and a team that invests in your growth. The technical skills follow naturally—but the character and habits you develop in a good culture? Those are with you for life.

Here's to teamwork, growth, and finding your people in tech.
    `
  }
]

export default function TeamworkLessonsPage() {
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
            <Users className="w-24 h-24 mx-auto text-primary mb-4 opacity-50" />
            <p className="text-foreground-secondary">Teamwork & Collaboration</p>
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
                            if (line.startsWith('**')) {
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
                title: 'Why I Love Flutter for Mobile Innovation',
                excerpt: 'Exploring Flutter\'s capabilities for rapid prototyping and cross-platform development.',
                link: '/blog/flutter-mobile-innovation'
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
