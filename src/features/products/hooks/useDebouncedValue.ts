import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const effectiveDelay = typeof value === 'string' && value.trim().length === 0
      ? 0
      : delayMs

    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, effectiveDelay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [delayMs, value])

  return debouncedValue
}
