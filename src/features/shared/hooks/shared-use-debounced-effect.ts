import { useEffect, useRef } from 'react'

export function useDebouncedEffect (
  searchFn: () => void,
  dependencies: any[],
  delay: number = 200
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(searchFn, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [...dependencies, delay])
}
