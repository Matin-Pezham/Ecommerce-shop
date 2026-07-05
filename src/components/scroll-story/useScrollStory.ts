import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { ScrollPhase, ScrollStoryState } from '@/components/scroll-story/scrollStoryTypes'

export function useScrollStory() {
  const { scrollYProgress } = useScroll()
  const [state, setState] = useState<ScrollStoryState>({ phase: 'abstract', progress: 0 })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(progress, [0, 0.25, 0.6, 1], [0.16, 0.45, 0.9, 1])
  const scale = useTransform(progress, [0, 0.3, 0.7, 1], [0.82, 0.94, 1.02, 1.05])
  const blur = useTransform(progress, [0, 0.35, 0.7, 1], [28, 10, 3, 0])
  const rotate = useTransform(progress, [0, 0.5, 1], [-4, -1.2, 0])
  const y = useTransform(progress, [0, 0.45, 1], [32, 10, 0])
  const glow = useTransform(progress, [0, 0.4, 0.8, 1], [0.1, 0.3, 0.55, 0.75])
  const shadow = useTransform(progress, [0, 0.35, 0.7, 1], [0.12, 0.2, 0.32, 0.4])

  useMotionValueEvent(progress, 'change', (value) => {
    let phase: ScrollPhase = 'abstract'
    if (value > 0.25) phase = 'emerging'
    if (value > 0.6) phase = 'revealed'
    if (value > 0.85) phase = 'final'

    setState({ phase, progress: value })
  })

  useEffect(() => {
    return () => {
      setState({ phase: 'abstract', progress: 0 })
    }
  }, [])

  return useMemo(
    () => ({
      state,
      progress,
      opacity,
      scale,
      blur,
      rotate,
      y,
      glow,
      shadow,
    }),
    [blur, glow, opacity, progress, rotate, scale, shadow, state, y],
  )
}
