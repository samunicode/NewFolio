// Types for blog platform system
import { MediaFile, SEOMetadata } from './common'

export interface Author {
  id: string
  name: string
  email: string
  avatar?: MediaFile
  bio?: string
  social?: Array<{ platform: string; url: string }>
}

export interface Tag {
  id: string
  name: string
  slug: string
  color?: string
  description?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  parent?: string
}

export interface Comment {
  id: string
  author: string
  email: string
  content: string
  createdAt: Date
  approved: boolean
  parentId?: string
  replies: Comment[]
  ipAddress?: string
}

export interface BlogReactions {
  likes: number
  loves: number
  shares: number
  views: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string // Markdown content
  excerpt: string
  featuredImage?: MediaFile
  tags: Tag[]
  category: Category
  author: Author
  publishedAt: Date
  updatedAt: Date
  status: 'draft' | 'published' | 'archived'
  seo: SEOMetadata
  reactions: BlogReactions
  comments: Comment[]
  readingTime?: number
  featured?: boolean
}

export interface BlogSystemProps {
  postsPerPage: number
  enableComments: boolean
  enableReactions: boolean
  enableSharing: boolean
  enableSearch: boolean
  moderateComments: boolean
}

export interface BlogSearchFilters {
  query?: string
  tags?: string[]
  categories?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  author?: string
}

export interface BlogPaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface TimelineNavigation {
  year: number
  months: Array<{
    month: number
    postCount: number
  }>
}