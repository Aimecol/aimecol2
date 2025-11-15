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
  Smartphone,
  Zap,
  Layers,
  Code,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Rocket,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPost = {
  title: 'Why I Love Flutter for Mobile Innovation',
  date: '2024-10-28',
  readTime: '6 min read',
  category: 'Mobile',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  likes: 67,
  tags: ['Flutter', 'Mobile Development', 'Cross-platform', 'Innovation'],
  excerpt: 'Exploring Flutter\'s capabilities for rapid prototyping and cross-platform development through real project examples.'
}

const sections = [
  {
    id: 'introduction',
    title: 'The Flutter Revolution',
    icon: Rocket,
    content: `
When I first started exploring Flutter in 2022, I was skeptical. Another cross-platform framework? I'd tried React Native before and felt constrained. But Flutter fundamentally changed how I think about mobile development.

What started as curiosity has turned into genuine passion. Over the past two years, I've built multiple production apps with Flutter, and I want to share why this framework has become my go-to choice for mobile innovation.

Flutter isn't just about writing code once and deploying everywhere—it's about a different development philosophy that prioritizes developer experience, performance, and the ability to bring ideas to life quickly.
    `
  },
  {
    id: 'why-flutter',
    title: 'Why Flutter Stands Out',
    icon: Lightbulb,
    content: `
**1. Performance That Rivals Native**

Flutter apps don't compromise on performance. Unlike React Native, which relies on JavaScript bridges, Flutter compiles directly to native code. The result? 60fps animations and smooth interactions feel native because they essentially are.

\`\`\`dart
// Flutter's smooth animation capabilities
void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: AnimatedContainer(
          duration: Duration(seconds: 1),
          curve: Curves.easeInOut,
          width: isExpanded ? 200 : 100,
          height: isExpanded ? 200 : 100,
          color: Colors.blue,
        ),
      ),
    ),
  );
}
\`\`\`

**2. Hot Reload - Supercharges Development Speed**

Hot Reload is a game-changer. Make a code change and see it reflected in your app instantly without losing state. This feedback loop reduces development time dramatically and makes experimenting with UI/UX incredibly satisfying.

I often prototype complete features in a single afternoon—something that would take significantly longer in native development.

**3. Beautiful UI Out of the Box**

Flutter comes with Material Design and Cupertino (iOS) widgets that look stunning and feel native. No need to hunt for UI libraries or spend weeks on design implementation. The framework gives you the tools to create polished apps quickly.

**4. Single Codebase, Multiple Platforms**

Write once, deploy everywhere—and I actually mean it. With Flutter, you can target iOS, Android, web, Windows, macOS, and Linux with minimal platform-specific code. I recently deployed an app to 5 platforms with less than 5% platform-specific logic.

**5. Growing Ecosystem**

The pub.dev package ecosystem is thriving. Need Firebase integration? State management? Beautiful animations? The community has created quality packages for virtually everything. The barrier to adding complex functionality is remarkably low.
    `
  },
  {
    id: 'real-world',
    title: 'Real-World Project Example',
    icon: Smartphone,
    content: `
Let me walk you through a real project: an inventory management app I built for a retail client.

**Project Requirements:**
- iOS and Android apps
- Real-time inventory sync
- Offline functionality
- Barcode scanning
- 3-week delivery timeline

**Why Flutter Won:**

In traditional native development, I'd need to:
- Hire/be an iOS developer
- Hire/be an Android developer
- Manage two separate codebases
- Ensure feature parity between platforms

With Flutter, I handled everything myself.

**Tech Stack:**
- Flutter for mobile UI
- Firebase for backend/sync
- Provider for state management
- get_it for dependency injection

**Results:**
- Delivered in 2.5 weeks (ahead of schedule!)
- 95% code sharing between platforms
- Smooth 60fps performance
- Easily added barcode scanning with a package

The development speed was incredible. Hot Reload meant I could iterate on the UI with real data immediately. When the client requested changes, I could implement and show them updates within minutes.

\`\`\`dart
// Barcode scanning integration
Future<String?> scanBarcode() async {
  try {
    String barcode = await FlutterBarcodeScanner.scanBarcode(
      '#ff6666',
      'Cancel',
      true,
      ScanMode.BARCODE,
    );
    return barcode;
  } catch (e) {
    print('Failed to scan barcode: \$e');
    return null;
  }
}
\`\`\`

The productivity gains were measurable—I delivered twice as fast as I would have with native development.
    `
  },
  {
    id: 'state-management',
    title: 'State Management Freedom',
    icon: Layers,
    content: `
One of Flutter's best aspects is flexibility in state management. You're not locked into one approach. I can choose from:

**Provider** - My go-to for most projects. Simple, powerful, and has excellent documentation.

\`\`\`dart
class InventoryProvider extends ChangeNotifier {
  List<Item> _items = [];
  
  List<Item> get items => _items;
  
  void addItem(Item item) {
    _items.add(item);
    notifyListeners();
  }
  
  void removeItem(String id) {
    _items.removeWhere((item) => item.id == id);
    notifyListeners();
  }
}

// Usage in widgets
Consumer<InventoryProvider>(
  builder: (context, inventory, child) {
    return ListView.builder(
      itemCount: inventory.items.length,
      itemBuilder: (context, index) {
        return ItemCard(item: inventory.items[index]);
      },
    );
  },
)
\`\`\`

**Riverpod** - More robust for complex applications with advanced features like testing and dependency injection.

**GetX** - For developers who prefer a more opinionated, all-in-one solution.

**BLoC** - For large teams that need stricter architectural patterns.

The ecosystem is mature enough that you can choose what works for your specific needs rather than adapting to framework constraints.
    `
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Excellence',
    icon: Code,
    content: `
Let me share how seamlessly Flutter handles multiple platforms.

**Web Platform**

Recently, I deployed a Flutter app to web. The code changes required? Literally none. The same codebase runs on web with responsive design thanks to LayoutBuilder and MediaQuery:

\`\`\`dart
Widget buildLayout(BuildContext context) {
  final screenWidth = MediaQuery.of(context).size.width;
  
  if (screenWidth > 1200) {
    return DeskopLayout();
  } else if (screenWidth > 600) {
    return TabletLayout();
  } else {
    return MobileLayout();
  }
}
\`\`\`

**Windows Desktop**

Building Windows apps with Flutter is surprisingly smooth. The same navigation patterns, state management, and widgets work perfectly. I built a desktop inventory dashboard in hours—something that would typically require completely separate tooling.

**Platform Channels for Native Integration**

When you need native functionality, Platform Channels provide a clean bridge:

\`\`\`dart
// Dart side
const platform = MethodChannel('com.example.app/native');

Future<String> getNativeData() async {
  try {
    final String result = 
      await platform.invokeMethod('getNativeFeature');
    return result;
  } catch (e) {
    return 'Failed: \$e';
  }
}

// Swift side (iOS)
func dummyMethodToEnforceBundling() {
  let controller = GeneratedPluginRegistrant.register(
    with: self
  )
}
\`\`\`

This approach gives you the best of both worlds—rapid development with Flutter, plus access to native capabilities when needed.
    `
  },
  {
    id: 'challenges',
    title: 'Honest Challenges',
    icon: AlertCircle,
    content: `
Flutter isn't perfect. Here are challenges I've encountered:

**1. Package Quality Variability**

Not all pub.dev packages are created equal. Some are abandoned, others have performance issues. I always thoroughly evaluate packages before adding dependencies.

Solution: Check pub.dev scores, GitHub activity, and community feedback before adding a package.

**2. Platform-Specific Issues**

While most things work seamlessly across platforms, occasionally you'll hit platform-specific bugs. Building for older Android versions can require workarounds.

Solution: Test early on target devices/OS versions. The Flutter community forums are excellent for troubleshooting.

**3. Learning Curve for Dart**

If you're coming from JavaScript/TypeScript, Dart's syntax takes adjustment. But honestly, after a week or two, it becomes second nature—Dart is actually a beautiful language.

Solution: Spend a few hours with the Dart documentation. It's well-written and approachable.

**4. Build Size**

Flutter apps tend to be larger than native apps (typically 15-20MB for a basic app). This is acceptable for most use cases but matters for users on limited data plans.

Solution: Use code splitting and lazy loading. Configure release builds properly with minification.

**5. Hot Reload Limitations**

Hot Reload doesn't work perfectly in all scenarios—certain changes require full restarts. For example, changing method signatures or adding new class members sometimes requires a rebuild.

This is a minor inconvenience compared to the productivity gains.
    `
  },
  {
    id: 'performance',
    title: 'Performance & Scalability',
    icon: Zap,
    content: `
One of my favorite aspects of Flutter is how it handles performance at scale.

**Memory Management**

Flutter's garbage collector is efficient. I've built apps handling thousands of list items with smooth scrolling. The key is following Flutter best practices:

\`\`\`dart
// Good: Efficient list rendering
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ItemCard(item: items[index]);
  },
)

// Avoid: Loading all items at once
ListView(
  children: items.map((item) => ItemCard(item: item)).toList(),
)
\`\`\`

**Rendering Performance**

Flutter's rendering engine is custom-built for performance. The "Skia" graphics engine (same as Chromium) ensures smooth 60fps animations even on mid-range devices.

Real numbers from my projects:
- Complex animations: 55-60fps on Snapdragon 855 (mid-range Android)
- List scrolling with images: Consistent 59-60fps
- Background tasks: Minimal battery impact

**Network Efficiency**

With proper implementation using packages like Dio for HTTP with caching, and Firebase for real-time sync, Flutter apps are surprisingly efficient:

\`\`\`dart
final dio = Dio();

// Automatic caching
Future<List<Item>> fetchItems() async {
  final response = await dio.get(
    '/api/items',
    options: Options(
      extra: {'noCache': false}
    ),
  );
  return (response.data as List)
    .map((item) => Item.fromJson(item))
    .toList();
}
\`\`\`
    `
  },
  {
    id: 'community',
    title: 'The Community & Resources',
    icon: TrendingUp,
    content: `
The Flutter community is one of its greatest strengths.

**Learning Resources:**
- Official Flutter documentation (outstanding)
- Reso Coder YouTube channel (exceptional tutorials)
- FlutterAwesome (curated list of libraries and resources)
- Active Reddit community (/r/FlutterDev)
- Regular Flutter conferences and meetups

**Enterprise Adoption:**

I was initially surprised to learn about Flutter's enterprise adoption:
- Google uses Flutter extensively
- BMW, Alibaba, and Tencent have built major apps with Flutter
- Companies are actively hiring Flutter developers
- Salaries for Flutter developers are competitive

This gives me confidence that investing in Flutter expertise is worthwhile.

**Package Ecosystem Quality:**

The top packages are maintained by Google engineers and community experts:
- get_it (dependency injection)
- provider (state management)
- dio (networking)
- hive (local storage)

These are production-ready, well-documented, and actively maintained.
    `
  },
  {
    id: 'future',
    title: 'Looking Forward',
    icon: Rocket,
    content: `
**What I'm Excited About:**

**1. Flutter for Embedded Devices**

Flutter is expanding to embedded systems and IoT. Imagine using Flutter for smart home interfaces, car UIs, and appliances. The possibilities are enormous.

**2. Improved Web Support**

Web support is improving rapidly. Server-side rendering and better SEO support are on the roadmap. This could make Flutter competitive for full-stack web development.

**3. Desktop App Market**

As desktop Flutter support matures, I see developers choosing Flutter for desktop apps instead of Electron or native frameworks. The performance and developer experience advantages are significant.

**4. AI/ML Integration**

TensorFlow Lite integration is getting better. On-device ML models will become easier to implement, enabling intelligent mobile apps.

**5. Larger Enterprise Adoption**

I expect to see Flutter become the standard for enterprise mobile development over the next 3-5 years, similar to how React became standard for web.

**My Personal Roadmap:**

- Deeper exploration of desktop and web capabilities
- Contributing to open-source Flutter packages
- Building more sophisticated ML-powered apps
- Mentoring others in Flutter development

Flutter has transformed how I build mobile applications. What once took months now takes weeks. The joy of rapid iteration and seeing ideas come to life quickly is unmatched.

If you're considering Flutter, I genuinely recommend diving in. The learning curve is manageable, the productivity gains are real, and you're investing in a framework with serious momentum and staying power.

The future of mobile development looks bright through Flutter's lens.
    `
  }
]

export default function FlutterMobileInnovationPage() {
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
          className="mb-16 h-96 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 rounded-2xl border border-white/10 flex items-center justify-center"
        >
          <div className="text-center">
            <Smartphone className="w-24 h-24 mx-auto text-accent mb-4 opacity-50" />
            <p className="text-foreground-secondary">Flutter Mobile Innovation</p>
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
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-accent" />
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
                              const language = part.split('\n')[0] || 'dart'
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
                    if (paragraph.startsWith('**')) {
                      return (
                        <div key={i} className="space-y-3">
                          {paragraph.split('\n\n').map((item, idx) => {
                            if (item.startsWith('**')) {
                              const [title, ...content] = item.split('\n')
                              return (
                                <div key={idx}>
                                  <p className="font-bold text-foreground mb-1">
                                    {title.replace(/\*\*/g, '')}
                                  </p>
                                  <p className="text-foreground-secondary leading-relaxed">
                                    {content.join('\n')}
                                  </p>
                                </div>
                              )
                            }
                            return null
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
                title: 'Teamwork Lessons from Ikigugu Internship',
                excerpt: 'Key insights about collaboration and communication gained during my internship.',
                link: '/blog/teamwork-lessons-ikigugu'
              },
              {
                title: 'Building Scalable Design Systems with React',
                excerpt: 'A comprehensive guide to creating maintainable design systems.',
                link: '/blog/design-systems-react'
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
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-200">
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
