import '@testing-library/jest-dom'
import React from 'react'

// Mock Framer Motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, style, ...props }: any) => React.createElement('div', { style, ...props }, children),
  },
  useScroll: () => ({
    scrollY: { 
      get: () => 0, 
      on: (event: string, callback: (value: number) => void) => {
        return () => {} // unsubscribe function
      }
    },
    scrollYProgress: { 
      get: () => 0,
      on: (event: string, callback: (value: number) => void) => {
        return () => {} // unsubscribe function
      }
    }
  }),
  useTransform: (value: any, input: number[], output: number[]) => ({
    get: () => output[0]
  })
}))

// Mock window scroll properties
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

Object.defineProperty(document.documentElement, 'scrollHeight', {
  writable: true,
  value: 1000,
})

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  value: 800,
})