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
  Layers,
  Grid,
  Palette,
  Code,
  TrendingUp,
  CheckCircle,
  Zap,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPost = {
  title: 'Building Scalable Design Systems with React',
  date: '2024-09-08',
  readTime: '12 min read',
  category: 'Design',
  author: {
    name: 'Aime Claudien',
    title: 'Full-Stack Developer',
    image: '/avatars/aime.jpg'
  },
  views: 987,
  likes: 78,
  tags: ['Design Systems', 'React', 'Component Library', 'UI/UX'],
  excerpt: 'A comprehensive guide to creating maintainable design systems that grow with your product and team.'
}

const sections = [
  {
    id: 'introduction',
    title: 'Why Design Systems Matter',
    icon: Layers,
    content: `
Design systems are the backbone of modern product development. They bridge the gap between design and engineering, create consistency across products, and scale teams' productivity exponentially.

But building a design system is hard. I've seen teams create beautiful Figma libraries that don't translate to code. I've seen comprehensive component libraries that become unmaintainable nightmares. I've seen design systems that solve today's problems but crumble under tomorrow's requirements.

Over the past three years, I've built design systems for three different companies and learned what separates successful, scalable design systems from expensive mistakes. This post shares those lessons.

A good design system does four things:
1. **Accelerates development** - Teams ship features faster
2. **Ensures consistency** - Users have a cohesive experience
3. **Reduces cognitive load** - Developers don't remake decisions
4. **Scales with the team** - Adding contributors shouldn't break things

Let's dive into how to build one that actually works.
    `
  },
  {
    id: 'foundations',
    title: 'Start with Foundations, Not Components',
    icon: Grid,
    content: `
The biggest mistake I see is teams jumping straight to building button components. This is backwards.

Great design systems start with **foundations**: the atomic design tokens that everything else builds on. These include:
- Color palette and semantic colors
- Typography scale
- Spacing system
- Shadows and elevation
- Border radiuses and other primitives

**Why foundations first?**

When you nail foundations, components are just compositions of those foundations. When you skip this step, every component reimplements these decisions, leading to inconsistency and maintenance chaos.

**Building Your Color System**

\`\`\`typescript
// tokens/colors.ts
export const colors = {
  // Primitive colors
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic colors
  primary: {
    light: '#D77B35',
    base: '#C85A23',
    dark: '#B64928',
    contrast: '#FFFFFF',
  },
  
  success: {
    light: '#86EFAC',
    base: '#22C55E',
    dark: '#16A34A',
  },
  
  warning: {
    light: '#FCD34D',
    base: '#FBBF24',
    dark: '#F59E0B',
  },
  
  error: {
    light: '#FCA5A5',
    base: '#EF4444',
    dark: '#DC2626',
  },
}

// In Tailwind config
export const tailwindColors = {
  primary: colors.primary.base,
  'primary-light': colors.primary.light,
  'primary-dark': colors.primary.dark,
  success: colors.success.base,
  // ... rest of colors
}
\`\`\`

**Building Your Typography System**

\`\`\`typescript
// tokens/typography.ts
export const typography = {
  // Text sizes - using fluid sizing
  xs: {
    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
    lineHeight: '1.5rem',
  },
  sm: {
    fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
    lineHeight: '1.5rem',
  },
  base: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    lineHeight: '1.5rem',
  },
  lg: {
    fontSize: 'clamp(1.125rem, 1.8vw, 1.25rem)',
    lineHeight: '1.75rem',
  },
  xl: {
    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
    lineHeight: '1.75rem',
  },
  '2xl': {
    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
    lineHeight: '2.25rem',
  },
  
  // Font weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

// Tailwind variant
@layer base {
  .text-xs { @apply text-[clamp(0.75rem,1vw,0.875rem)] leading-6; }
  .text-sm { @apply text-[clamp(0.875rem,1.2vw,1rem)] leading-6; }
  .text-base { @apply text-[clamp(1rem,1.5vw,1.125rem)] leading-6; }
  .text-lg { @apply text-[clamp(1.125rem,1.8vw,1.25rem)] leading-7; }
  .text-xl { @apply text-[clamp(1.25rem,2vw,1.5rem)] leading-7; }
  .text-2xl { @apply text-[clamp(1.5rem,2.5vw,1.875rem)] leading-9; }
}
\`\`\`

**Spacing Scale**

\`\`\`typescript
// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
}
\`\`\`

**Key principle:** Use 8px base unit. All spacing should be multiples of 8 for visual consistency.
    `
  },
  {
    id: 'component-architecture',
    title: 'Component Architecture & Organization',
    icon: Code,
    content: `
Once you have solid foundations, components become predictable and maintainable.

**Folder Structure**

\`\`\`
src/
├── components/
│   ├── primitives/          # Base building blocks
│   │   ├── Button/
│   │   ├── Text/
│   │   ├── Box/
│   │   └── Icon/
│   │
│   ├── patterns/            # Combinations of primitives
│   │   ├── Card/
│   │   ├── Form/
│   │   ├── Modal/
│   │   └── Dropdown/
│   │
│   └── features/            # Business-specific components
│       ├── Header/
│       ├── Sidebar/
│       └── UserProfile/
│
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
│
└── styles/
    ├── globals.css
    └── theme.css
\`\`\`

**Component Organization Pattern**

\`\`\`typescript
// components/primitives/Button/Button.tsx
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-contrast hover:bg-primary-dark',
        secondary: 'bg-surface border border-white/10 text-foreground hover:bg-surface/80',
        outline: 'border border-primary text-primary hover:bg-primary/5',
        ghost: 'text-foreground hover:bg-surface/50',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Button.displayName = 'Button'

// components/primitives/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Click me',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
\`\`\`

**Why this structure works:**
- Primitives are reusable building blocks
- Patterns compose primitives for common UI problems
- Features are specific to your product
- Clear separation makes maintenance predictable
    `
  },
  {
    id: 'documentation',
    title: 'Documentation with Storybook',
    icon: BookOpen,
    content: `
Documentation isn't optional for design systems—it's essential. Storybook is the industry standard.

**Storybook Setup**

\`\`\`bash
npx storybook@latest init

# Configure for React
# Install @storybook/react @storybook/addon-essentials
\`\`\`

**Writing Effective Stories**

\`\`\`typescript
// components/patterns/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from './Card'
import { Button } from '@/components/primitives/Button'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold">Card Title</h3>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card>
      <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20" />
      <CardHeader>
        <h3 className="text-lg font-bold">Featured Post</h3>
        <p className="text-sm text-foreground-secondary">
          Posted on November 14, 2024
        </p>
      </CardHeader>
      <CardContent>
        <p>
          This is a featured card example showing how images integrate with content.
        </p>
      </CardContent>
    </Card>
  ),
}

export const Interactive: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 className="text-lg font-bold">Interactive Card</h3>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see interactive states.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards support hover states for interactivity.',
      },
    },
  },
}
\`\`\`

**Storybook Configuration**

\`\`\`typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y', // Accessibility
    '@chromatic-com/storybook', // Visual regression testing
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true, // Auto-generate documentation
  },
}

export default config
\`\`\`

**Documentation Best Practices:**
- Write a story for each variant
- Document the "happy path" usage
- Show edge cases (empty states, loading, error)
- Explain when to use each variant
- Show accessibility considerations
- Include keyboard navigation examples
    `
  },
  {
    id: 'scaling',
    title: 'Scaling Your Design System',
    icon: TrendingUp,
    content: `
A good design system starts small but must be built to scale. Here's how to maintain quality as it grows.

**Versioning Strategy**

\`\`\`typescript
// package.json
{
  "name": "@company/design-system",
  "version": "1.2.3",
  "description": "Company-wide design system and component library"
}
\`\`\`

Follow semantic versioning:
- **Major** (1.0.0): Breaking changes (component API changes)
- **Minor** (1.1.0): New features (new component variants)
- **Patch** (1.0.1): Bug fixes and minor improvements

**Publishing to npm**

\`\`\`bash
# Create scoped package
npm init --scope=@yourcompany

# Build and publish
npm run build
npm publish

# Use in projects
npm install @yourcompany/design-system
\`\`\`

**Monorepo Structure for Multiple Packages**

\`\`\`
design-system/
├── packages/
│   ├── ui/                    # React components
│   │   └── package.json
│   ├── tokens/               # Design tokens
│   │   └── package.json
│   ├── icons/               # Icon library
│   │   └── package.json
│   └── storybook/           # Documentation site
│       └── package.json
├── pnpm-workspace.yaml
└── package.json
\`\`\`

**Changelog Management**

\`\`\`markdown
# CHANGELOG.md

## [1.2.3] - 2024-11-14

### Added
- New \`variant="gradient"\` option for Button component
- Icon component now supports custom colors
- Added accessibility documentation

### Changed
- Updated Button component CSS for better performance
- Improved Modal animation timing

### Fixed
- Fixed Button hover state on mobile devices
- Resolved TypeScript types for Card component

### Deprecated
- The \`ButtonGroup\` component is deprecated in favor of \`ButtonToolbar\`
\`\`\`

**Governance & Contribution Guidelines**

\`\`\`markdown
# CONTRIBUTING.md

## Component Submission Checklist
- [ ] Component includes TypeScript types
- [ ] Component has Storybook stories for all variants
- [ ] Component includes accessibility features (aria labels, keyboard nav)
- [ ] Component is tested with @testing-library/react
- [ ] Component follows the style guide
- [ ] CHANGELOG.md is updated
- [ ] Prop documentation is complete

## Design System Review Process
1. Open pull request with new component/feature
2. Design team reviews for consistency
3. Engineering team reviews for maintainability
4. Code review approval required
5. Tests must pass
6. Merge and publish new version
\`\`\`

**Testing Strategy**

\`\`\`typescript
// components/primitives/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies variant styles', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    expect(container.querySelector('button')).toHaveClass('border-primary')
  })

  it('is accessible via keyboard', async () => {
    render(<Button>Keyboard</Button>)
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
  })
})
\`\`\`
    `
  },
  {
    id: 'theming',
    title: 'Theme Support & Customization',
    icon: Palette,
    content: `
A scalable design system must support theming—multiple color schemes, dark/light modes, and brand customization.

**Theme System Setup**

\`\`\`typescript
// tokens/themes.ts
export const themes = {
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    foreground: '#1A1A1A',
    foreground-secondary: '#666666',
    primary: '#D77B35',
    accent: '#004CFF',
  },
  dark: {
    background: '#0C0C0C',
    surface: '#1A1A1A',
    foreground: '#EDEDED',
    foreground-secondary: '#A0A0A0',
    primary: '#D77B35',
    accent: '#004CFF',
  },
  highContrast: {
    background: '#000000',
    surface: '#FFFFFF',
    foreground: '#000000',
    foreground-secondary: '#333333',
    primary: '#0000FF',
    accent: '#FF0000',
  },
}

// Global CSS with theme variables
/* globals.css */
:root {
  --background: var(--background-dark);
  --surface: var(--surface-dark);
  --foreground: var(--text-primary-dark);
  --foreground-secondary: var(--text-secondary-dark);
  --primary: var(--primary-copper);
  --accent: var(--accent-blue);
}

[data-theme="light"] {
  --background: var(--background-light);
  --surface: var(--surface-light);
  --foreground: var(--text-primary-light);
  --foreground-secondary: var(--text-secondary-light);
}

[data-theme="high-contrast"] {
  --background: #000000;
  --surface: #FFFFFF;
  --foreground: #000000;
  --primary: #0000FF;
}
\`\`\`

**Theme Provider Component**

\`\`\`typescript
// components/theme-provider.tsx
'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  )
}

// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

**Custom Theme Creation**

Teams can create custom themes by extending the base:

\`\`\`typescript
// brands/partner-brand/theme.ts
import { themes } from '@/tokens/themes'

export const partnerTheme = {
  ...themes.light,
  primary: '#FF6B35',        // Partner brand color
  accent: '#004E89',
  surface: '#F5F5F5',
}

// Usage
<div data-theme="partner-brand">
  {/* Components use partner theme */}
</div>
\`\`\`
    `
  },
  {
    id: 'migration',
    title: 'Adopting a Design System Across Teams',
    icon: Zap,
    content: `
The biggest challenge isn't building a design system—it's getting teams to actually use it.

**Adoption Strategy**

**Phase 1: Foundation (Weeks 1-4)**
- Launch with 8-10 core components
- Provide clear documentation
- Set up Storybook environment
- Train design and engineering leads

**Phase 2: Migration (Weeks 5-12)**
- Pick one feature to migrate completely
- Create migration guides for each component
- Pair with teams during migration
- Document learnings

**Phase 3: Scale (Weeks 13+)**
- Gradual migration across remaining projects
- Collect feedback and iterate
- Add components based on demand
- Establish contribution process

**Codemods for Automated Migration**

When you need to update components across many codebases:

\`\`\`typescript
// codemod to update old Button API to new one
export default function transform(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  root.find(j.JSXOpeningElement, {
    name: { name: 'Button' }
  }).forEach(path => {
    const { node } = path
    
    // Update old 'color' prop to 'variant'
    node.attributes.forEach(attr => {
      if (attr.name?.name === 'color') {
        attr.name.name = 'variant'
      }
    })
  })

  return root.toSource()
}
\`\`\`

**Measuring Adoption**

\`\`\`typescript
// scripts/measure-adoption.ts
import fs from 'fs'
import path from 'path'

function scanForComponents(dir: string) {
  const components = {
    fromLibrary: 0,
    custom: 0,
  }

  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8')
    
    if (content.includes("from '@company/design-system'")) {
      components.fromLibrary++
    }
    if (content.includes('function ') && content.includes('Component')) {
      components.custom++
    }
  })

  const adoptionRate = components.fromLibrary / 
    (components.fromLibrary + components.custom)
  
  console.log(\`Adoption rate: \${(adoptionRate * 100).toFixed(2)}%\`)
}

scanForComponents('./src/components')
\`\`\`

**Change Communication**

\`\`\`markdown
# Design System Release Notes

## Button Component Update

### What Changed
- New \`gradient\` variant added
- Improved accessibility with better focus states
- Performance improvement: 20% smaller bundle size

### Migration Required?
No, this is fully backward compatible.

### New Usage
\`\`\`tsx
<Button variant="gradient">New Gradient Button</Button>
\`\`\`

### Questions?
- #design-system on Slack
- design-system@company.com
- Next design system meeting: Thursday 2PM
\`\`\`
    `
  },
  {
    id: 'best-practices',
    title: 'Design System Best Practices',
    icon: CheckCircle,
    content: `
**Do's:**
✓ Start with foundations, not components
✓ Document everything in Storybook
✓ Use TypeScript for type safety
✓ Version semantically
✓ Test components thoroughly
✓ Maintain backwards compatibility
✓ Communicate changes clearly
✓ Get buy-in from design and engineering
✓ Build in public (share progress)
✓ Iterate based on feedback

**Don'ts:**
✗ Build every possible component upfront
✗ Skip accessibility considerations
✗ Break existing APIs without migration path
✗ Let components grow unlimited variants
✗ Forget about edge cases
✗ Make documentation optional
✗ Build in isolation without feedback
✗ Publish before you're ready
✗ Ignore performance
✗ Forget about testing

**Common Pitfalls to Avoid**

1. **Premature Generalization**
   Problem: Building overly flexible components that become unmaintainable
   Solution: Start specific, refactor to general when patterns emerge

2. **Variant Explosion**
   Problem: Components grow 20+ variants and become hard to maintain
   Solution: Limit variants to 3-4. Use composition for complex needs

3. **Breaking Changes**
   Problem: Updating components breaks consuming projects
   Solution: Use deprecation periods, provide codemods, bump major versions

4. **Documentation Debt**
   Problem: Storybook falls behind the actual components
   Solution: Make documentation part of definition of done

5. **Adoption Resistance**
   Problem: Teams keep building their own components
   Solution: Make design system the default choice through education and tooling

**Metrics That Matter**

- **Adoption rate**: % of components from design system vs custom
- **Development velocity**: Time to build features before/after
- **Consistency score**: Visual/code consistency across projects
- **Maintenance burden**: Time spent fixing component bugs
- **Bundle impact**: Size before/after design system adoption
    `
  },
  {
    id: 'tools',
    title: 'Essential Tools & Technologies',
    icon: Code,
    content: `
**Component Development**
- **React 19+**: Core framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority (CVA)**: Variant management

**Documentation & Visualization**
- **Storybook**: Component documentation
- **Chromatic**: Visual regression testing
- **Next.js**: Marketing site for design system

**Testing**
- **Vitest**: Unit testing
- **@testing-library/react**: Component testing
- **Playwright**: E2E testing

**Publishing & Monorepo**
- **npm**: Package distribution
- **pnpm workspaces**: Monorepo management
- **Changesets**: Version management

**Design Integration**
- **Figma**: Design source of truth
- **Design Tokens Studio**: Sync design tokens to code

**My Recommended Tech Stack**

\`\`\`json
{
  "framework": "React 19",
  "language": "TypeScript",
  "styling": "Tailwind CSS + CVA",
  "components": "Radix UI primitives + custom",
  "documentation": "Storybook",
  "testing": "Vitest + Testing Library",
  "monorepo": "pnpm workspaces",
  "publishing": "npm",
  "CI/CD": "GitHub Actions",
  "design": "Figma + Design Tokens Studio"
}
\`\`\`

**Quick Setup Command**

\`\`\`bash
# Create new design system
pnpm create vite@latest @company/design-system -- --template react-ts

# Install dependencies
pnpm install

# Add Storybook
pnpm dlx storybook@latest init

# Add testing
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Add styling
pnpm add tailwindcss postcss autoprefixer class-variance-authority clsx tailwind-merge

# Initialize
pnpm dlx tailwindcss init -p
\`\`\`
    `
  },
  {
    id: 'conclusion',
    title: 'Building Together',
    icon: TrendingUp,
    content: `
A great design system isn't built in isolation—it's a team effort. It evolves based on what products actually need, not what you theoretically think they should need.

**What I've Learned**

1. **Start small, iterate aggressively** - Your first components won't be right. That's okay. Iterate quickly based on real usage.

2. **Documentation is part of the product** - Components without documentation are just code. Storybook isn't optional.

3. **Consistency is the superpower** - The real value isn't individual components—it's consistency across your entire product.

4. **Design systems are social structures** - The technical part is the easy part. The hard part is getting teams aligned and excited about using it.

5. **Measure impact** - Track metrics like adoption rate, development velocity, and consistency. Show the business value.

**Getting Started Today**

If you want to build a design system:

1. **Week 1**: Define your design foundations (colors, typography, spacing)
2. **Week 2-3**: Build 5-8 core components with Storybook stories
3. **Week 4**: Get design and engineering alignment
4. **Week 5+**: Start adopting in projects and iterate based on feedback

A successful design system compounds in value over time. The investment pays massive dividends—teams move faster, products feel more cohesive, and new team members can ramp up quickly.

The best design system is one that teams actually use and continuously improve. Build something useful, share it openly, and let it evolve with your organization.

Your future self will thank you for establishing a solid design system foundation today.

Happy building!
    `
  }
]

export default function DesignSystemsReactPage() {
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
            <Layers className="w-24 h-24 mx-auto text-primary mb-4 opacity-50" />
            <p className="text-foreground-secondary">Scalable Design Systems</p>
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

                    // Handle bullet lists
                    if (paragraph.includes('- **') || paragraph.includes('✓') || paragraph.includes('✗')) {
                      const items = paragraph.split('\n').filter(item => item.trim())
                      return (
                        <ul key={i} className="space-y-2 ml-4">
                          {items.map((item, idx) => (
                            <li key={idx} className="text-foreground-secondary leading-relaxed">
                              {item.replace(/^- \*\*/, '**').replace(/^\s*(✓|✗|[0-9]+\.)/, (match) => {
                                if (match.includes('✓')) return '✓ '
                                if (match.includes('✗')) return '✗ '
                                return match + ' '
                              })}
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
              <span>36 comments</span>
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
                title: 'Next.js Performance: From Good to Great',
                excerpt: 'Advanced techniques for optimizing Next.js applications.',
                link: '/blog/nextjs-performance-optimization'
              },
              {
                title: 'Integrating AI into Web Applications',
                excerpt: 'Practical approaches to adding AI capabilities to web apps.',
                link: '/blog/ai-integration-web-apps'
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
