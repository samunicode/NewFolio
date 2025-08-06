"use client"

import React, { useEffect, useState, RefObject } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ScrollBlurProps, ScrollState } from '@/types/scroll-blur'

export function ScrollBlurOverlay({
  target,
  intensity = 4,
  fadeDistance = 100,
  className,
  disabled = false
}: ScrollBlurProps) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollHeight: 0,
    clientHeight: 0,
    isAtBottom: false,
    blurOpacity: 0,
    shouldShowBlur: false
  })

  // Use Framer Motion's useScroll hook with throttling to reduce flickering
  const { scrollYProgress } = useScroll({
    target: target || undefined,
    offset: ["start start", "end end"]
  })

  // Transform scroll progress to blur opacity with smoother transitions
  const blurOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  )

  useEffect(() => {
    if (disabled) return

    let ticking = false
    let lastScrollY = 0
    let lastOpacity = 0

    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      
      // Skip update if scroll change is minimal (performance optimization)
      if (Math.abs(currentScrollY - lastScrollY) < 2) {
        ticking = false
        return
      }
      
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollableHeight = documentHeight - windowHeight

      // Check if we're at the bottom (with larger threshold to reduce flickering)
      const isAtBottom = currentScrollY >= scrollableHeight - 20

      // Calculate if content is scrollable
      const shouldShowBlur = documentHeight > windowHeight && !isAtBottom

      // Calculate blur opacity based on scroll position with smoother transitions
      let calculatedOpacity = 0
      if (shouldShowBlur) {
        if (currentScrollY < fadeDistance) {
          // Smoother fade in from top
          calculatedOpacity = Math.min((currentScrollY / fadeDistance) ** 0.8, 1)
        } else if (currentScrollY > scrollableHeight - fadeDistance) {
          // Smoother fade out near bottom
          calculatedOpacity = Math.max(((scrollableHeight - currentScrollY) / fadeDistance) ** 0.8, 0)
        } else {
          // Full opacity in middle
          calculatedOpacity = 1
        }
      }

      // Only update if there's a meaningful change (increased threshold for performance)
      if (Math.abs(calculatedOpacity - lastOpacity) < 0.02 && 
          Math.abs(currentScrollY - lastScrollY) < 5) {
        ticking = false
        return
      }

      lastScrollY = currentScrollY
      lastOpacity = calculatedOpacity

      setScrollState({
        scrollY: currentScrollY,
        scrollHeight: documentHeight,
        clientHeight: windowHeight,
        isAtBottom,
        blurOpacity: calculatedOpacity,
        shouldShowBlur
      })

      ticking = false
    }

    // High-performance throttled scroll handler
    const handleScroll = () => {
      if (!ticking) {
        // Use setTimeout instead of rAF for better performance on scroll
        setTimeout(updateScrollState, 8) // ~120fps max
        ticking = true
      }
    }

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateScrollState, 200)
    }

    // Initial calculation with delay to avoid layout thrashing
    setTimeout(updateScrollState, 100)

    // Use passive listeners for better scroll performance
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      capture: false 
    })
    window.addEventListener('resize', handleResize, { 
      passive: true 
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [fadeDistance, disabled])

  // Don't render if disabled or shouldn't show blur
  if (disabled || !scrollState.shouldShowBlur) {
    return null
  }

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 pointer-events-none carousel-safe",
        "h-28",
        className
      )}
      style={{
        zIndex: 40,
        background: `
          linear-gradient(to top,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.3) 40%,
            rgba(0, 0, 0, 0.1) 70%,
            transparent 100%
          ),
          linear-gradient(to top,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 30%,
            transparent 60%
          )
        `,
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 1px 0 0 rgba(255, 255, 255, 0.06),
          inset -1px 0 0 rgba(255, 255, 255, 0.06),
          0 -1px 8px rgba(255, 255, 255, 0.03)
        `,
        backdropFilter: `blur(${Math.min(intensity, 8)}px)`,
        WebkitBackdropFilter: `blur(${Math.min(intensity, 8)}px)`,
        borderRadius: '0 0 24px 24px',
        willChange: 'opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        isolation: 'isolate',
        contain: 'layout style paint size',
        maskImage: `
          linear-gradient(to top,
            black 0%,
            black 50%,
            rgba(0,0,0,0.8) 65%,
            rgba(0,0,0,0.5) 75%,
            rgba(0,0,0,0.25) 85%,
            rgba(0,0,0,0.1) 92%,
            transparent 100%
          )
        `,
        WebkitMaskImage: `
          linear-gradient(to top,
            black 0%,
            black 50%,
            rgba(0,0,0,0.8) 65%,
            rgba(0,0,0,0.5) 75%,
            rgba(0,0,0,0.25) 85%,
            rgba(0,0,0,0.1) 92%,
            transparent 100%
          )
        `
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: scrollState.blurOpacity,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
    />
  )
}

// Hook for accessing scroll state in other components
export function useScrollBlur(target?: RefObject<HTMLElement>) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollHeight: 0,
    clientHeight: 0,
    isAtBottom: false,
    blurOpacity: 0,
    shouldShowBlur: false
  })

  const { scrollY, scrollYProgress } = useScroll({
    target: target || undefined
  })

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollableHeight = documentHeight - windowHeight
      const isAtBottom = latest >= scrollableHeight - 10
      const shouldShowBlur = documentHeight > windowHeight && !isAtBottom

      setScrollState({
        scrollY: latest,
        scrollHeight: documentHeight,
        clientHeight: windowHeight,
        isAtBottom,
        blurOpacity: scrollYProgress.get(),
        shouldShowBlur
      })
    })

    return unsubscribe
  }, [scrollY, scrollYProgress])

  return scrollState
}