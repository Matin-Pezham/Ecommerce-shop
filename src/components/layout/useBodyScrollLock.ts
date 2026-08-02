import { useEffect } from 'react'

type BodyStyleSnapshot = {
  overflow: string
  touchAction: string
}

let activeLocks = 0
let previousBodyStyles: BodyStyleSnapshot | null = null

function lockBodyScroll() {
  if (typeof document === 'undefined') {
    return
  }

  const body = document.body

  if (activeLocks === 0) {
    previousBodyStyles = {
      overflow: body.style.overflow,
      touchAction: body.style.touchAction,
    }
  }

  activeLocks += 1
  body.style.overflow = 'hidden'
  body.style.touchAction = 'none'
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') {
    return
  }

  if (activeLocks === 0) {
    return
  }

  activeLocks -= 1

  if (activeLocks > 0) {
    return
  }

  const body = document.body
  body.style.overflow = previousBodyStyles?.overflow ?? ''
  body.style.touchAction = previousBodyStyles?.touchAction ?? ''
  previousBodyStyles = null
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      return undefined
    }

    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [locked])
}