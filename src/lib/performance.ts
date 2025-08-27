/**
 * Performance Optimization Utilities
 * React optimizations, caching, and performance monitoring
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react'

/**
 * Debounced callback hook for search and filtering
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    }) as T,
    [delay]
  )
}

/**
 * Memoized file tree filtering for performance
 */
export function useMemoizedFilter<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  dependencies: readonly unknown[]
) {
  return useMemo(() => {
    return data.filter(filterFn)
  }, [data, ...dependencies])
}

/**
 * Content caching utilities
 */
export class ContentCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

// Global content cache instance
export const globalContentCache = new ContentCache()

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0)
  const startTimeRef = useRef(performance.now())

  useEffect(() => {
    renderCountRef.current++
    const renderTime = performance.now() - startTimeRef.current
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Render #${renderCountRef.current}, Time: ${renderTime.toFixed(2)}ms`)
    }
    
    startTimeRef.current = performance.now()
  })

  return {
    renderCount: renderCountRef.current,
    logPerformance: (operation: string, duration: number) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${componentName}] ${operation}: ${duration.toFixed(2)}ms`)
      }
    }
  }
}

/**
 * Lazy loading hook for content
 */
export function useLazyContent(contentPath: string) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadContent = useCallback(async () => {
    if (!contentPath || content) return

    // Check cache first
    const cached = globalContentCache.get(contentPath)
    if (cached) {
      setContent(cached)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate content loading
      const loadedContent = await new Promise<string>((resolve) => {
        setTimeout(() => resolve(`Content for ${contentPath}`), 100)
      })

      globalContentCache.set(contentPath, loadedContent)
      setContent(loadedContent)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [contentPath, content])

  useEffect(() => {
    loadContent()
  }, [loadContent])

  return { content, loading, error, reload: loadContent }
}