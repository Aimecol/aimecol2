import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ClickSpark from "@/components/click-spark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aimecol.com'),
  title: "Aimecol - Full-Stack Developer & Designer | React, Next.js, Web Development",
  description: "Aimecol is a passionate full-stack developer and designer creating high-performance digital experiences. Specializing in React, Next.js, TypeScript, mobile apps, fraud detection systems, and scalable design systems. Based in East Africa with expertise in web development, UI/UX design, and innovation.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "UI/UX designer",
    "web design",
    "mobile app developer",
    "design systems",
    "fraud detection",
    "machine learning",
    "East Africa developer",
    "web development services",
    "portfolio"
  ],
  authors: [{ name: "Aimecol", url: "https://aimecol.com" }],
  creator: "Aimecol",
  publisher: "Aimecol",
  applicationName: "Aimecol Portfolio",
  category: "Technology",
  classification: "Portfolio",
  icons: {
    icon: [
      { url: "https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg", sizes: "any", type: "image/png" }
    ],
    apple: "https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg",
    shortcut: "https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aimecol Portfolio",
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aimecol.com",
    title: "Aimecol - Full-Stack Developer & Designer",
    description: "Full-stack developer and designer creating high-performance digital experiences with React, Next.js, and modern technologies.",
    siteName: "Aimecol Portfolio",
    images: [
      {
        url: "https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg",
        width: 1200,
        height: 630,
        alt: "Aimecol Portfolio",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aimecol - Full-Stack Developer & Designer",
    description: "Creating high-performance digital experiences with React, Next.js, and modern web technologies.",
    creator: "@aimecol",
    images: ["https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg"],
    site: "@aimecol",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aimecol.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aimecol",
    url: "https://aimecol.com",
    image: "https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg",
    description: "Full-stack developer and designer creating high-performance digital experiences",
    jobTitle: "Full-Stack Developer & Designer",
    sameAs: [
      "https://twitter.com/aimecol",
      "https://github.com/aimecol",
      "https://linkedin.com/in/aimecol"
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Web Development",
      "UI/UX Design",
      "Design Systems",
      "Machine Learning"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#ff6b35" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon links */}
        <link rel="icon" href="https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg" />
        <link rel="shortcut icon" href="https://images.aimecol.com/uploads/large/logo_6917250e1bad5_large.jpg" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ClickSpark
            sparkColor='#ff6b35'
            sparkSize={8}
            sparkRadius={20}
            sparkCount={12}
            duration={500}
            extraScale={1.2}
          >
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
