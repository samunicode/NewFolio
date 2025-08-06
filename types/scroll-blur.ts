// Types for progressive blur scroll effect system
import { RefObject } from 'react'

export interface ScrollBlurProps {
  target?: RefObject<HTMLElement>
  intensity?: number
  fadeDistance?: number
  className?: string
  disabled?: boolean
}

export interface ScrollState {
  scrollY: number
  scrollHeight: number
  clientHeight: number
  isAtBottom: boolean
  blurOpacity: number
  shouldShowBlur: boolean
}

export interface ScrollBlurConfig {
  blurIntensity: number
  fadeThreshold: number
  transitionDuration: number
  enableOnMobile: boolean
}