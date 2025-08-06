import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono, Iceland, Merriweather, Caveat } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const iceland = Iceland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-iceland",
  display: "swap",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
})

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  // --- Basic SEO ---
  title: {
    default: 'Sameer C.', // Default title for the entire site
    template: '%s | Sameer C.', // Template for dynamic titles on individual pages
  },
  description: "Hi I'm Sameer, a passionate Developer and ML enthusiast. Check out my portfolio website to know more about my work or possible collab!",
  keywords: [
    'Sameer',
    'Developer',
    'ML Enthusiast',
    'Portfolio',
    'Web Development',
    'Machine Learning',
    'AI',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Data Science',
    'Front-end',
    'Back-end',
    'Full-stack',
    'India',
    'sameer.nz',
    'Collaboration',
    'Programming',
    'Coding',
  ],
  authors: [{ name: 'Sameer C.' }],
  creator: 'Sameer C.',
  publisher: 'Sameer C.',
  alternates: {
    canonical: 'https://sameer.nz',
  },

  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  openGraph: {

    title: 'Sameer C.',
    description: "Hi I'm Sameer, a passionate Developer and ML enthusiast. Check out my portfolio website to know more about my work or possible collab!",
    url: 'https://sameer.nz',
    siteName: 'Sameer C. Portfolio',
    images: [
      {
        url: '/banner.png', // 
        width: 1200, // Standard width for OG image
        height: 630, // Standard height for OG image
        alt: 'Sameer C. Portfolio Banner Image',
        type: 'image/png', // Or 'image/png' depending on your image type
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Twitter Cards ---
  twitter: {
    card: 'summary_large_image', // Or 'summary' for smaller images
    title: 'Sameer C. - Portfolio',
    description: "Hi I'm Sameer, a passionate Developer and ML enthusiast. Check out my portfolio website to know more about my work or possible collab!",
    images: {
      url: '/banner.png', 
      alt: 'Sameer C. Portfolio Twitter Card Image',
    },
  },

  // --- Search Engine Specific Metadata ---
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1, // -1 allows full preview
      'max-image-preview': 'large', // Shows large image previews
      'max-snippet': -1, // Shows full snippets
    },
  },

  // --- Application Name (Often used for PWAs and tab names) ---
  applicationName: 'Sameer C.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${iceland.variable} ${merriweather.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-title" content="Sameer C." />
      </head>
      <body className="font-inter">{children}</body>
    </html>
  )
}
