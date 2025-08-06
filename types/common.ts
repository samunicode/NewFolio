// Common types used across the portfolio enhancement system

export interface MediaFile {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
  size?: number
  mimeType?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
  username?: string
}

export interface SEOMetadata {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: MediaFile
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image'
}

export interface SiteMetadata {
  title: string
  description: string
  url: string
  author: string
  social: SocialLink[]
  defaultOgImage: MediaFile
}

export type ContentType = 'page' | 'blog' | 'project' | 'experience' | 'education' | 'certification'

export interface Transition {
  type: 'spring' | 'tween'
  duration: number
  bounce?: number
  ease?: string
}