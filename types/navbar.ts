// Types for modern navigation system
export interface NavbarProps {
  searchEnabled?: boolean
  sticky?: boolean
  blurBackground?: boolean
  className?: string
  onSearchOpen?: () => void
}

export interface SearchWidgetProps {
  onSearchOpen: () => void
  shortcut?: string
  placeholder?: string
  className?: string
  showKeyboardShortcut?: boolean
}

export interface NavbarConfig {
  enableGlassmorphism: boolean
  showSearchWidget: boolean
  mobileBreakpoint: number
  scrollThreshold: number
}

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType
  external?: boolean
  mobile?: boolean
}