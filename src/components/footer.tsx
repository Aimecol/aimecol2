'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Instagram, X, Facebook, Smile } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Particles from './ui/Particles'
import { ThemeToggle } from './ui/theme-toggle'

const Hyperspeed = dynamic(() => import('./hyperspeed'), { ssr: false })

const socialLinks = [
  { icon: Github, href: 'https://github.com/Aimecol', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aime-claudien-mazimpaka-61801b356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  { icon: X, href: 'https://x.com/aimecol314?t=1If7bdLkVIo777dc2-39XQ&s=09', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/mazimpaka_aimecol?igsh=MXI3anJ3enJ2eDFqaw==', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/17Ckwc3Ngj/', label: 'Facebook' },
  { icon: Mail, href: 'mailto:aimecol314@gmail.com', label: 'Email' }
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface-darker border-t border-white/10 relative overflow-hidden dark:bg-surface-darker dark:border-white/10 light:bg-surface-light light:border-black/10 transition-colors duration-300">
      <Hyperspeed />
      <div className="absolute inset-0 z-0 opacity-90">
        <Particles
          particleCount={500}
          particleSpread={10}
          speed={0.06}
          particleColors={['#D77B35', '#004CFF', '#C85A23']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.9}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={0.8}
          cameraDistance={30}
          disableRotation={false}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="https://images.aimecol.com/uploads/large/aimecol_691c4680253c7_large.jpg" alt="Logo" width={150} height={50} />
            </Link>
            <p className="text-foreground-secondary mb-6 max-w-md">
              Full-stack developer and designer passionate about creating digital experiences 
              that solve real problems and delight users.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-surface rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-primary mb-4">Get in Touch</h3>
            <div className="space-y-2 text-foreground-secondary">
              <p>support@aimecol.com</p>
              <p>aimecol314@gmail.com</p>
              <p>Remote, Worldwide</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Available for projects</span>
              </div>
              <div className='flex align-center gap-2'>Theme: <ThemeToggle /></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-foreground-secondary text-sm mb-4 md:mb-0">
            <span>© 2025 Aimecol. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and lots of coffee </span> 
            <Smile className="w-4 h-4 text-yellow-500 animate-pulse" />
            <Smile className="w-4 h-4 text-yellow-500 animate-pulse" />
            <Smile className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-surface fixed bottom-4 right-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
