import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from '@/mocks/server'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}

if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  class ResizeObserverMock implements ResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      void callback
    }

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }

  window.ResizeObserver = ResizeObserverMock
}

if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'undefined') {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin = '0px'
    readonly scrollMargin = '0px'
    readonly thresholds: ReadonlyArray<number> = [0]

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      void callback
      void options
    }

    disconnect(): void {}
    observe(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
    unobserve(): void {}
  }

  window.IntersectionObserver = IntersectionObserverMock
}

if (typeof window !== 'undefined' && typeof window.scrollTo === 'undefined') {
  window.scrollTo = () => {}
}
