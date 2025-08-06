# Implementation Plan

- [x] 1. Set up project dependencies and configuration
  - Install required packages: motion, react-icons, tailwind-merge, clsx, vaul, fuse.js (as specified in provided code)
  - Ensure lib/utils.ts has the cn() function: `import { clsx, type ClassValue } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }`
  - Configure Tailwind CSS with new animation utilities for blur effects and smooth transitions
  - Set up TypeScript interfaces for all new components and data structures
  - _Requirements: 1.5, 4.10, 4.11, 5.9, 6.11_

- [x] 2. Implement progressive blur scroll effect system
  - Create `ScrollBlurOverlay` component with useScroll hook integration
  - Implement CSS backdrop-filter blur with gradient mask for bottom border
  - Add responsive blur intensity based on scroll position and content height
  - Write unit tests for scroll detection and blur opacity calculations
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 3. fix navigation bar
  - Fix existing navbar component add ⌘+K widget to it modern looking
  - Add ⌘+K widget to navbar component
  - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.7_

- [ ] 4. Build Cmd+K search widget for navbar
  - Create `SearchWidget` component with keyboard shortcut indicator styling
  - Implement hover animations and visual feedback with spring transitions
  - Add click handler to open search modal with smooth transition
  - Style keyboard key indicator with rounded corners and shadows
  - _Requirements: 5.3, 5.4, 5.8, 5.9, 5.10_

- [ ] 5. Set up content management system architecture
  - Evaluate and configure Strapi CMS on VPS with custom content types
  - Create PersonalInfo, Project, Experience, Education, and Certification content types
  - Implement authentication and role-based access control for admin interface
  - Build fallback system using local JSON files for development and error handling
  - _Requirements: 2.1, 2.7, 2.8, 2.9_

- [ ] 6. Create mobile-friendly CMS admin interface
  - Design responsive admin interface optimized for mobile devices
  - Implement touch-friendly controls for content editing and media management
  - Add real-time preview functionality for content changes
  - Set up file upload system for images, PDFs, and resume management
  - _Requirements: 2.2, 2.4, 2.5, 2.10, 2.11_

- [ ] 7. Build content data fetching and caching system
  - Create API routes for fetching content from Strapi CMS
  - Implement ISR (Incremental Static Regeneration) for automatic updates
  - Build caching strategies with fallback to local JSON on API failures
  - Add data validation and error handling for malformed content
  - _Requirements: 2.3, 2.6, 2.12_

- [ ] 8. Implement blog platform foundation
  - Create BlogPost, Comment, and Category data models with TypeScript interfaces
  - Design card-based blog layout with masonry grid system
  - Implement pagination with smooth transitions and loading states
  - Build timeline navigation component for chronological browsing by year/month
  - _Requirements: 3.1, 3.3, 3.7, 3.12_

- [ ] 9. Build blog search and filtering system
  - Implement real-time search with debounced input across all blog posts
  - Create filtering capabilities by tags, categories, and date ranges
  - Add search result highlighting and context snippets
  - Integrate with main search system for unified search experience
  - _Requirements: 3.2, 3.10, 6.3, 6.10_

- [ ] 10. Create blog interaction features
  - Implement comment system with moderation capabilities and nested replies
  - Add reaction buttons (like, love, etc.) with real-time updates
  - Build social sharing integration for multiple platforms (Twitter, LinkedIn, Facebook)
  - Create mobile-friendly blog editor for content management
  - _Requirements: 3.4, 3.5, 3.6, 3.9_

- [ ] 11. Replace Hashnode integration with CMS blog system
  - Remove existing Hashnode API calls from main page
  - Implement new blog API integration to fetch top 5 recent posts
  - Update blog post display components to use new data structure
  - Add error handling and fallback content for main page blog section
  - _Requirements: 3.8, 3.13_

- [ ] 12. Implement swipeable sharing dock component using provided code
  - Create `SharingDock` component by adapting the provided `DynamicScrollIslandTOC` architecture
  - Use exact code structure with TOC_INTERFACE adapted for sharing options (name, icon, action)
  - Implement motion/react animations with spring transition: { type: "spring", duration: 0.5, bounce: 0.1 }
  - Use provided styling: black background, white/80 opacity text, borderRadius: 24, z-index: 51
  - Replace TOC-specific elements (Progress, Text, Items) with sharing-specific components
  - _Requirements: 4.1, 4.2, 4.6, 4.8, 4.10, 4.11_

- [ ] 13. Build sharing functionality and URL generation
  - Create sharing options data structure matching TOC_INTERFACE format: { name: string, value?: string, icon: React.ComponentType, action: () => void }
  - Implement custom URL generation service with dynamic parameters and UTM tracking
  - Add WhatsApp deep linking with pre-filled message templates using sharing option actions
  - Implement LinkedIn sharing with Open Graph metadata integration
  - Replace Progress component with sharing button, Text component with sharing title, Items component with sharing options grid
  - _Requirements: 4.3, 4.4, 4.5, 4.9_

- [ ] 14. Create intelligent search system foundation
  - Set up Google Gemini API integration for AI-powered search understanding
  - Build local search indexing system using Fuse.js for fuzzy search
  - Create search index from all website content (blog posts, projects, experience, etc.)
  - Implement search result ranking and relevance scoring
  - _Requirements: 6.7, 6.9, 6.10_

- [ ] 15. Build Cmd+K search modal interface
  - Create `SmartSearch` modal component with smooth fade-in/out animations
  - Implement real-time search with debounced input and loading states
  - Add keyboard navigation support (arrow keys, enter, escape)
  - Build contextual search results with highlighted matching text
  - _Requirements: 6.1, 6.2, 6.11, 6.12_

- [ ] 16. Implement advanced search features
  - Add mathematical calculation support (e.g., "2+2" shows "4")
  - Build contextual information display (e.g., "Sameer's current job" results)
  - Implement search suggestions and alternative terms for no results
  - Add search result navigation with smooth scrolling to relevant sections
  - _Requirements: 6.4, 6.5, 6.6, 6.8_

- [ ] 17. Integrate all systems and test functionality
  - Connect all components and ensure proper data flow between systems
  - Implement error boundaries and fallback mechanisms for all features
  - Add loading states and skeleton components for better UX
  - Test mobile responsiveness and touch interactions across all features
  - _Requirements: All requirements integration testing_

- [ ] 18. Optimize performance and accessibility
  - Implement code splitting for blog and search features to reduce bundle size
  - Add service worker for offline functionality and caching
  - Ensure WCAG 2.1 AA compliance with proper ARIA labels and keyboard navigation
  - Optimize images and implement lazy loading for better Core Web Vitals
  - _Requirements: Performance and accessibility compliance_

- [ ] 19. Write comprehensive tests and documentation
  - Create unit tests for all components using React Testing Library
  - Write integration tests for CMS, search, and blog functionality
  - Add E2E tests with Playwright for critical user journeys
  - Document API endpoints, component props, and usage examples
  - _Requirements: Testing strategy implementation_

- [ ] 20. Deploy and configure production environment
  - Set up Strapi CMS on VPS with production database and security configurations
  - Configure CDN for static assets and image optimization
  - Set up monitoring and error tracking for production issues
  - Implement backup strategies for content and database
  - _Requirements: Production deployment and monitoring_
## Impl
ementation Reference Code

### Swipeable Dock Base Code (components/dynamic-toc-filter.tsx)
The sharing dock implementation should be based on the provided `DynamicScrollIslandTOC` component with the following key elements:

**Core Structure:**
- Uses `motion/react` for animations with MotionConfig and AnimatePresence
- Implements layoutId animations for smooth transitions between states
- Uses backdrop blur overlay when opened: `backdrop-blur-[4px]`
- Spring transition configuration: `{ type: "spring", duration: 0.5, bounce: 0.1 }`

**Key Components to Adapt:**
1. **Main Container**: Black background with borderRadius: 24, z-index: 51
2. **Progress Component**: Replace with sharing button/trigger
3. **Text Component**: Replace with sharing title and icon
4. **Items Component**: Replace with sharing options grid
5. **Scroll Progress**: Replace with sharing-specific functionality

**Animation Pattern:**
- Closed state: `min-w-[var(--width)]` with compact layout
- Open state: `min-h-[var(--height-opened)] w-[var(--width-opened)]`
- Uses `layoutId` for smooth morphing between states
- Escape key closes the dock
- Click outside closes the dock

**Styling Classes:**
- Container: `"relative z-51 cursor-pointer select-none text-white/80"`
- Closed state: `"relative flex h-10 cursor-pointer items-center overflow-hidden px-1 bg-black"`
- Open state: `"cursor-pointer justify-center overflow-hidden p-5 pt-14 bg-black"`

This code structure should be adapted to create the sharing dock while maintaining the same animation patterns and user interaction model.