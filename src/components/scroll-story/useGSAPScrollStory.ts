import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap.js'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import type { RefObject } from 'react'
import type { StoryPhase } from '@/components/scroll-story/StoryTimeline'
import { getStoryPhase } from '@/components/scroll-story/StoryTimeline'

gsap.registerPlugin(ScrollTrigger)

type UseGSAPScrollStoryResult = {
  containerRef: RefObject<HTMLElement | null>
  sceneRef: RefObject<HTMLDivElement | null>
  productRef: RefObject<HTMLDivElement | null>
  glowRef: RefObject<HTMLDivElement | null>
  shadowRef: RefObject<HTMLDivElement | null>
  shapeARef: RefObject<HTMLDivElement | null>
  shapeBRef: RefObject<HTMLDivElement | null>
  phase: StoryPhase
  progress: number
  reducedMotion: boolean
  timeline: gsap.core.Timeline | null
}

export function useGSAPScrollStory(): UseGSAPScrollStoryResult {
  const containerRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const productRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const shadowRef = useRef<HTMLDivElement | null>(null)
  const shapeARef = useRef<HTMLDivElement | null>(null)
  const shapeBRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [phase, setPhase] = useState<StoryPhase>('phase-1')
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    const activeContainer = containerRef.current

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        setPhase('phase-4')
        setProgress(1)
        setTimeline(null)
        timelineRef.current?.kill()
        timelineRef.current = null
        return
      }

      if (!containerRef.current || !productRef.current || !glowRef.current || !shadowRef.current || !shapeARef.current || !shapeBRef.current) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1400',
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self: ScrollTrigger) => {
            const nextPhase = getStoryPhase(self.progress)
            setPhase(nextPhase)
            setProgress(self.progress)
          },
        },
      })

      tl.to(productRef.current, {
        y: -18,
        scale: 0.94,
        rotate: -2,
        opacity: 0.35,
        duration: 0.35,
        ease: 'power2.out',
      })
      tl.to([shapeARef.current, shapeBRef.current], {
        y: -24,
        x: 16,
        opacity: 0.8,
        scale: 1.08,
        duration: 0.35,
        ease: 'power2.out',
      })
      tl.to(productRef.current, {
        y: 6,
        scale: 0.98,
        rotate: -0.75,
        opacity: 0.7,
        duration: 0.35,
        ease: 'power2.out',
      })
      tl.to(productRef.current, {
        y: -6,
        scale: 1.02,
        rotate: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      tl.to([glowRef.current, shadowRef.current], {
        opacity: 0.8,
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
      })

      timelineRef.current = tl
      setTimeline(tl)
    }, containerRef)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
      ctx.revert()
      timelineRef.current?.kill()
      timelineRef.current = null
      setTimeline(null)
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => {
        if (trigger.trigger === activeContainer) {
          trigger.kill()
        }
      })
    }
  }, [reducedMotion])

  return useMemo(
    () => ({
      containerRef,
      sceneRef,
      productRef,
      glowRef,
      shadowRef,
      shapeARef,
      shapeBRef,
      phase,
      progress,
      reducedMotion,
      timeline,
    }),
    [phase, progress, reducedMotion, timeline],
  )
}
