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
  Code,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPost = {
  title: 'Building VendorFlow: Fraud Detection in React',
  date: '2024-11-10',
  readTime: '8 min read',
  category: 'Development',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  tags: ['React', 'WebSockets', 'Machine Learning', 'Security'],
  excerpt: 'How we implemented real-time fraud detection using React, WebSockets, and machine learning to protect thousands of transactions.'
}

const sections = [
  {
    id: 'introduction',
    title: 'The Challenge',
    icon: AlertCircle,
    content: `
VendorFlow was designed to revolutionize vendor payment processing, but with great scale comes great responsibility—especially when handling financial transactions. The initial system could process thousands of payments daily, but we had a critical problem: fraud detection was happening post-transaction, leaving vulnerabilities open.

We needed to build a real-time fraud detection system that could:
- Analyze transactions instantly without blocking legitimate payments
- Learn from historical data and adapt to new fraud patterns
- Provide immediate alerts to our security team
- Scale horizontally to handle peak traffic
    `
  },
  {
    id: 'architecture',
    title: 'Architecture Overview',
    icon: Code,
    content: `
Our fraud detection system is built on a multi-layered architecture:

**Frontend Layer (React)**
- Real-time transaction monitoring dashboard
- Live fraud alerts with WebSocket integration
- Historical analysis and reporting

**Backend Layer (Node.js + Express)**
- Transaction processing and validation
- Pattern analysis engine
- API endpoints for dashboard integration

**Machine Learning Layer**
- Isolation Forest algorithm for anomaly detection
- Random Forest for pattern classification
- Real-time model updates based on labeled data

**Data Pipeline**
- Event streaming with message queues
- Time-series data storage
- Batch processing for model retraining

The system processes each transaction through three stages: validation, analysis, and decision.
    `
  },
  {
    id: 'implementation',
    title: 'Implementation Details',
    icon: Shield,
    content: `
**1. Real-Time Processing with WebSockets**

We implemented WebSocket connections to push fraud alerts instantly to our dashboard:

\`\`\`javascript
// Server-side WebSocket handler
io.on('connection', (socket) => {
  socket.on('subscribe-transactions', (vendorId) => {
    socket.join(\`vendor-\${vendorId}\`);
  });
});

// Fraud detection result broadcast
function broadcastFraudAlert(alert) {
  io.to(\`vendor-\${alert.vendorId}\`).emit('fraud-alert', {
    transactionId: alert.id,
    riskScore: alert.score,
    reason: alert.reason,
    timestamp: new Date()
  });
}
\`\`\`

**2. Machine Learning Integration**

We trained multiple models on historical transaction data:

\`\`\`javascript
// Isolation Forest for anomaly detection
const model = new IsolationForest({
  numTrees: 100,
  sampleSize: 256,
  randomState: 42
});

// Features extracted from transactions
const features = [
  transaction.amount,
  transaction.velocity, // transactions per hour
  transaction.geoDistance, // distance from last transaction
  transaction.merchantCategory,
  transaction.deviceFingerprint
];

const anomalyScore = model.predict(features);
const isFraud = anomalyScore > THRESHOLD;
\`\`\`

**3. Pattern Recognition**

We built a sophisticated pattern matching system:

\`\`\`javascript
async function analyzeTransactionPattern(transaction, userHistory) {
  const patterns = {
    velocityPattern: checkVelocityAnomaly(transaction, userHistory),
    geoPattern: checkGeographicAnomaly(transaction, userHistory),
    devicePattern: checkDeviceAnomaly(transaction, userHistory),
    behaviorPattern: checkBehavioralShift(transaction, userHistory)
  };

  // Calculate composite risk score
  const riskScore = calculateRiskScore(patterns);
  return {
    patterns,
    riskScore,
    decision: riskScore > 0.7 ? 'BLOCK' : 'ALLOW'
  };
}
\`\`\`

**4. React Dashboard Integration**

Our real-time dashboard displays active fraud detection:

\`\`\`jsx
export function FraudMonitoringDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('connect', () => setIsConnected(true));
    socket.on('fraud-alert', (alert) => {
      setAlerts(prev => [alert, ...prev].slice(0, 50));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <motion.div
          key={alert.transactionId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-red-400">Fraud Alert</p>
              <p className="text-sm text-gray-400">{alert.reason}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-red-500">{Math.round(alert.riskScore * 100)}%</p>
              <p className="text-xs text-gray-500">{alert.timestamp}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
\`\`\`
    `
  },
  {
    id: 'results',
    title: 'Results & Impact',
    icon: TrendingUp,
    content: `
**Key Metrics After Implementation:**

• **Fraud Detection Rate**: 94% of fraudulent transactions caught in real-time
• **False Positive Rate**: Reduced from 8% to 2% after model refinement
• **Processing Time**: Average 150ms per transaction analysis
• **System Uptime**: 99.97% with failover mechanisms
• **Cost Reduction**: 45% decrease in fraud-related chargebacks

**Real-World Impact:**

Over a 6-month period, our fraud detection system:
- Prevented $2.3M in fraudulent transactions
- Saved 150+ vendor accounts from compromise
- Reduced customer support load related to fraud by 60%
- Maintained 98.5% customer satisfaction despite proactive blocking

The system successfully adapted to evolving fraud tactics through continuous model retraining, catching new patterns within 24-48 hours of emergence.
    `
  },
  {
    id: 'challenges',
    title: 'Challenges We Overcame',
    icon: Zap,
    content: `
**1. Latency vs. Accuracy Trade-off**

Challenge: Machine learning inference was taking too long (~500ms), delaying transactions.

Solution: We implemented model quantization and deployed lighter models to edge servers, reducing latency to 150ms while maintaining 92% accuracy.

**2. Model Drift**

Challenge: The fraud patterns evolved faster than we could retrain models.

Solution: Implemented automated retraining pipelines triggered when detection metrics drift beyond thresholds, with A/B testing for new models before production deployment.

**3. Handling Imbalanced Data**

Challenge: Fraudulent transactions are rare (0.1-0.3%), making training data highly imbalanced.

Solution: Used SMOTE (Synthetic Minority Over-sampling Technique) and weighted loss functions to properly train models on minority fraud class.

**4. False Positives Impact**

Challenge: Legitimate transactions being blocked hurt customer experience.

Solution: Implemented a confidence-based blocking strategy—only automatically blocking extremely high-confidence fraud (>95%), routing medium-confidence cases to human review.

**5. Real-time Data Processing**

Challenge: Processing thousands of concurrent transactions with complex feature engineering.

Solution: Pre-computed features using stream processing (Apache Kafka) and cached frequently accessed data in Redis for sub-100ms lookups.
    `
  },
  {
    id: 'lessons',
    title: 'Key Learnings',
    icon: CheckCircle,
    content: `
1. **Start Simple, Iterate**: Our first model was a simple rule-based system. We evolved it incrementally based on real fraud data rather than trying to build the perfect system upfront.

2. **Monitor Model Performance**: We track dozens of metrics beyond accuracy—false positive rate, false negative rate, precision, recall—to understand real-world impact.

3. **Combine Multiple Signals**: The best fraud detection comes from combining multiple weak signals (velocity, geography, device, behavior) rather than relying on any single indicator.

4. **Human-in-the-Loop**: Even with advanced ML, human oversight is crucial. Our security team's feedback directly improves model performance.

5. **Transparency Matters**: When we block transactions, users need to understand why. Clear communication prevents support tickets and maintains trust.

6. **Think About Adversarial Behavior**: Fraudsters adapt. We built systems specifically to detect evolving fraud patterns and automated model updates.

7. **Scale from Day One**: Build with horizontal scaling in mind. Our WebSocket architecture and distributed processing setup made scaling pain-free.
    `
  },
  {
    id: 'future',
    title: 'Future Roadmap',
    icon: TrendingUp,
    content: `
We're excited about upcoming improvements:

**Graph Neural Networks**: Moving beyond feature-based detection to relationship-based fraud rings detection.

**Federated Learning**: Allowing partner vendors to collaboratively train models without sharing raw transaction data.

**Explainable AI**: Implementing LIME and SHAP for more interpretable fraud decision explanations.

**Real-time Adaptation**: Moving from batch model retraining to online learning algorithms that adapt to new patterns instantly.

**Multi-Modal Analysis**: Incorporating transaction image data, voice patterns from customer service calls, and other modalities for deeper analysis.

The future of fraud prevention isn't just about better algorithms—it's about creating an ecosystem where legitimate users flow smoothly while malicious actors face an increasingly sophisticated defense system.
    `
  }
]

export default function BlogPostPage() {
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
            <Shield className="w-24 h-24 mx-auto text-primary mb-4 opacity-50" />
            <p className="text-foreground-secondary">VendorFlow Fraud Detection System</p>
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
                              const language = part.split('\n')[0] || 'javascript'
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

                    // Handle bullet points
                    if (paragraph.startsWith('•')) {
                      return (
                        <ul key={i} className="space-y-2 ml-4">
                          {paragraph.split('\n').map((bullet, j) => (
                            <li key={j} className="text-foreground-secondary leading-relaxed">
                              {bullet}
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
                title: 'Integrating AI into Web Applications',
                excerpt: 'Practical approaches to adding AI capabilities to web apps.',
                link: '/blog/ai-integration-web-apps'
              },
              {
                title: 'Next.js Performance: From Good to Great',
                excerpt: 'Advanced techniques for optimizing Next.js applications.',
                link: '/blog/nextjs-performance-optimization'
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
