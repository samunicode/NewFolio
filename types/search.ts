// Types for intelligent search system
import { ContentType } from './common'

export interface SearchResult {
  id: string
  title: string
  content: string
  type: ContentType
  url: string
  relevance: number
  context: string
  highlights?: string[]
  metadata?: Record<string, any>
}

export interface SearchSystemProps {
  enableAI: boolean
  geminiApiKey?: string
  indexSources: string[]
  maxResults: number
  debounceMs?: number
}

export interface SearchIndex {
  id: string
  title: string
  content: string
  type: ContentType
  url: string
  keywords: string[]
  lastUpdated: Date
  metadata: Record<string, any>
}

export interface AISearchContext {
  userQuery: string
  searchResults: SearchResult[]
  contextualInfo?: string
  suggestions: string[]
  calculations?: string
  processingTime: number
}

export interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  maxResults?: number
  enableKeyboardShortcuts?: boolean
}

export interface SearchState {
  query: string
  results: SearchResult[]
  isLoading: boolean
  selectedIndex: number
  showSuggestions: boolean
  error?: string
}

export interface SearchConfig {
  enableFuzzySearch: boolean
  fuzzyThreshold: number
  enableAI: boolean
  aiProvider: 'gemini' | 'openai' | 'local'
  cacheResults: boolean
  cacheDuration: number
}

export interface CalculationResult {
  expression: string
  result: string | number
  isValid: boolean
}

export interface ContextualSearchResult {
  query: string
  answer: string
  confidence: number
  sources: string[]
}