# Aimecol Portfolio

A modern, production-ready portfolio website built with Next.js 16, showcasing full-stack development expertise through execution rather than just listing skills.

![Aimecol Portfolio](https://img.shields.io/badge/Next.js-16.0.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer)

## Features

### Modern Architecture
- **Next.js 16** with App Router and Server Components
- **TypeScript** for type safety and better developer experience
- **Server Actions** for contact form handling
- **Dynamic Routes** for project case studies (`/projects/[slug]`)
- **Incremental Static Regeneration** ready

### Design & UX
- **Custom Brand Colors** - Copper orange (#D77B35) and electric blue (#004CFF)
- **Dark/Light Mode** with smooth transitions using next-themes
- **Responsive Design** - Mobile-first approach
- **Framer Motion** animations with 60fps performance
- **Glassmorphism** effects and gradient backgrounds
- **Custom scrollbar** and micro-interactions

### Performance
- **Image Optimization** with next/image
- **SEO Optimized** with dynamic metadata
- **Fast Page Loads** with proper loading states
- **Accessibility Compliant** (WCAG 2.1 AA)
- **Core Web Vitals** optimized

### Pages & Sections

#### Homepage
- **Hero Section** with animated gradient background
- **Rotating Role Text** - "Web Apps → Mobile Apps → Design Systems → Innovation"
- **3D Floating Elements** with CSS animations
- **Featured Work** grid with hover effects
- **Skills Section** with interactive cards

#### Projects Page
- **Filterable Grid** - Filter by category (Web App, Mobile, Design, Innovation)
- **Smooth Animations** with staggered loading
- **Project Cards** with hover overlays and quick actions
- **Responsive Layout** - Masonry grid on desktop, stack on mobile

#### Project Detail Pages
- **Dynamic Routes** - `/projects/[slug]`
- **Comprehensive Case Studies** - Problem, Solution, Impact, Features
- **Technical Implementation** details
- **Live Demo & GitHub** links
- **SEO Optimized** with dynamic OG images

#### About Page
- **Interactive Timeline** of professional journey
- **Animated Skill Bars** with proficiency levels
- **Tools & Technologies** categorized display
- **Personal Touch** section with hobbies and interests

#### Contact Page
- **Interactive Form** with real-time validation
- **Multiple Contact Methods** - Email, Discord, Calendar booking
- **Social Links** with hover animations
- **Availability Status** indicator

### Technical Implementation

#### Design System
```css
/* Brand Colors */
--primary-copper: #D77B35;
--primary-deep-orange: #C85A23;
--accent-blue: #004CFF;

/* Custom Utilities */
.gradient-text { /* Copper to blue gradient */ }
.glass { /* Glassmorphism effect */ }
.animated-gradient { /* Moving background */ }
```

#### Component Architecture
```
/components
  /ui              # Reusable UI components
  /sections        # Page-specific sections
  navigation.tsx   # Responsive nav with theme toggle
  footer.tsx       # Site footer with social links
  theme-provider.tsx # Dark/light mode provider
```

#### Animation System
- **Framer Motion** for page transitions and micro-interactions
- **Scroll-triggered animations** with `whileInView`
- **Staggered children** for list animations
- **Custom easing** curves for smooth motion

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aimecol/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
aimecol/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── (main)/         # Main layout group
│   │   ├── projects/       # Projects page & dynamic routes
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── globals.css     # Global styles & design system
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Homepage
│   │   ├── loading.tsx     # Global loading UI
│   │   └── not-found.tsx   # Custom 404 page
│   └── components/         # Reusable components
│       ├── hero-section.tsx
│       ├── featured-work.tsx
│       ├── skills-section.tsx
│       ├── navigation.tsx
│       ├── footer.tsx
│       └── theme-provider.tsx
├── public/                 # Static assets
├── package.json
└── README.md
```

## Key Features Showcase

### 1. **Modern React Patterns**
- Server Components for better performance
- Client Components only where needed
- Proper TypeScript integration
- Custom hooks for reusable logic

### 2. **Advanced Animations**
- Page transitions with Framer Motion
- Scroll-triggered animations
- Micro-interactions on hover/click
- Loading states and skeleton screens

### 3. **Production-Ready Code**
- Error boundaries and proper error handling
- SEO optimization with dynamic metadata
- Accessibility compliance
- Performance monitoring ready

### 4. **Developer Experience**
- TypeScript for type safety
- ESLint configuration
- Clean code structure
- Comprehensive documentation

## Unique Touches

- **Custom 404 Page** with random fun facts
- **Loading Messages** that rotate with personality
- **Easter Eggs** and delightful micro-interactions
- **Availability Status** in contact section
- **Coffee Enthusiast** personal touches
- **Smooth Theme Transitions** between dark/light modes

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 95+ across all categories

## Deployment

This project is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: hello@aimecol.dev
- **LinkedIn**: [linkedin.com/in/aimecol](https://linkedin.com/in/aimecol)
- **GitHub**: [github.com/aimecol](https://github.com/aimecol)
- **Portfolio**: [aimecol.dev](https://aimecol.dev)

---

**Built with ❤️ and lots of ☕ by Aimecol**
