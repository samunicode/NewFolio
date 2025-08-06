// Types for Content Management System
import { MediaFile, SocialLink } from './common'

export interface CMSConfig {
  provider: 'strapi' | 'local'
  apiUrl?: string
  authToken?: string
  fallbackToLocal: boolean
  retryAttempts: number
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  avatar: MediaFile
  location: string
  email: string
  social: SocialLink[]
  resume: MediaFile
  skills: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  thumbnail: MediaFile
  images?: MediaFile[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  startDate?: Date
  endDate?: Date
  status: 'completed' | 'in-progress' | 'planned'
}

export interface Experience {
  id: string
  title: string
  company: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance'
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  technologies: string[]
  achievements: string[]
  location?: string
  companyUrl?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  current: boolean
  gpa?: string
  description?: string
  achievements?: string[]
  location?: string
}

export interface CertificationSection {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialId?: string
  credentialUrl?: string
  description?: string
  skills: string[]
}

export interface Skill {
  id: string
  name: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
  icon?: string
}

export interface ContentData {
  personal: PersonalInfo
  projects: Project[]
  experience: Experience[]
  education: Education[]
  certifications: CertificationSection[]
  skills: Skill[]
  metadata: any
}