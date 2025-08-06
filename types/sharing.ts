// Types for swipeable sharing dock system
import { Transition } from './common'

export interface SharingOption {
  name: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  color?: string
  value?: string
}

export interface SharingDockProps {
  options: SharingOption[]
  currentUrl: string
  title: string
  description: string
  transition?: Transition
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export interface ShareUrlConfig {
  baseUrl: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  customParams?: Record<string, string>
}

export interface WhatsAppShareConfig {
  phoneNumber?: string
  messageTemplate: string
  includeUrl: boolean
}

export interface LinkedInShareConfig {
  url: string
  title: string
  summary?: string
  source?: string
}

export interface SocialSharePlatform {
  name: string
  baseUrl: string
  params: Record<string, string>
  icon: React.ComponentType
  color: string
}

export interface SharingState {
  isOpen: boolean
  selectedOption?: string
  isSharing: boolean
  error?: string
}