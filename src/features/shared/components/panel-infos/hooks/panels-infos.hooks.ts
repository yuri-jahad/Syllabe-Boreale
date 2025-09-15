import { useState, useEffect, useRef, useCallback } from 'react'

interface UsePingOptions {
  interval?: number
  throttle?: number
  enabled?: boolean
}

let globalPingState = {
  ping: null as number | null,
  isLoading: false,
  error: null as Error | null,
  lastMeasured: 0
}

let globalInterval: number | null = null
let globalSubscribers = new Set<() => void>()
let globalLastPingTime = 0
let globalOptions = { interval: 10000, throttle: 5000, enabled: true }

const notifySubscribers = () => {
  globalSubscribers.forEach(callback => callback())
}

const measureGlobalPing = async () => {
  if (!globalOptions.enabled) return

  const now = Date.now()

  if (now - globalLastPingTime < globalOptions.throttle) return

  globalLastPingTime = now
  globalPingState.isLoading = true
  globalPingState.error = null
  notifySubscribers()

  try {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (typeof connection.rtt === 'number' && connection.rtt > 0) {
        globalPingState.ping = Math.round(connection.rtt)
        globalPingState.isLoading = false
        globalPingState.error = null
        globalPingState.lastMeasured = Date.now()
        notifySubscribers()
        return
      }
    }

    const endpoints = [
      'https://www.google.com/generate_204',
      'https://httpbin.org/status/204'
    ]

    const promises = endpoints.map(async url => {
      try {
        const start = performance.now()
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 800)

        await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
          signal: controller.signal
        })

        clearTimeout(timeoutId)
        return Math.round(performance.now() - start)
      } catch {
        return null
      }
    })

    const results = await Promise.all(promises)
    const validResults = results.filter(r => r !== null) as number[]

    if (validResults.length > 0) {
      globalPingState.ping = Math.min(...validResults)
      globalPingState.isLoading = false
      globalPingState.error = null
      globalPingState.lastMeasured = Date.now()
      notifySubscribers()
    } else {
      throw new Error('All ping tests failed')
    }
  } catch (error) {
    globalPingState.ping = null
    globalPingState.isLoading = false
    globalPingState.error = error as Error
    notifySubscribers()
  }
}

const startGlobalPing = () => {
  if (globalInterval) return
  measureGlobalPing()
  globalInterval = window.setInterval(measureGlobalPing, globalOptions.interval)
}

const stopGlobalPing = () => {
  if (!globalInterval) return
  clearInterval(globalInterval)
  globalInterval = null
}

let visibilityHandlerSet = false
const setupGlobalVisibility = () => {
  if (visibilityHandlerSet) return
  visibilityHandlerSet = true

  document.addEventListener('visibilitychange', () => {
    if (globalSubscribers.size === 0) return
    if (document.visibilityState === 'visible') {
      startGlobalPing()
    } else {
      stopGlobalPing()
    }
  })
}

export default function usePing (options: UsePingOptions = {}) {
  const [, forceUpdate] = useState({})
  const forceUpdateCallback = useCallback(() => forceUpdate({}), [])
  const subscriberRef = useRef<() => void | null>(null)

  useEffect(() => {
    globalOptions = { ...globalOptions, ...options }
    subscriberRef.current = forceUpdateCallback
    globalSubscribers.add(forceUpdateCallback)
    setupGlobalVisibility()

    if (globalSubscribers.size === 1) {
      startGlobalPing()
    }

    return () => {
      if (subscriberRef.current) {
        globalSubscribers.delete(subscriberRef.current)
      }
      if (globalSubscribers.size === 0) {
        stopGlobalPing()
      }
    }
  }, [])

  return {
    ping: globalPingState.ping,
    isLoading: globalPingState.isLoading,
    error: globalPingState.error
  }
}
