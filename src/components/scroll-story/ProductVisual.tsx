import type { RefObject } from 'react'
import type { StoryPhase } from '@/components/scroll-story/StoryTimeline'

type ProductVisualProps = {
  productRef: RefObject<HTMLDivElement | null>
  glowRef: RefObject<HTMLDivElement | null>
  shadowRef: RefObject<HTMLDivElement | null>
  shapeARef: RefObject<HTMLDivElement | null>
  shapeBRef: RefObject<HTMLDivElement | null>
  phase: StoryPhase
  reducedMotion: boolean
}

export function ProductVisual({ productRef, glowRef, shadowRef, shapeARef, shapeBRef, phase, reducedMotion }: ProductVisualProps) {
  return (
    <div className="relative mx-auto flex h-[60vh] w-full max-w-[760px] items-center justify-center">
      <div
        ref={shapeARef}
        className="absolute left-[10%] top-[18%] h-24 w-24 rounded-full border border-white/70 bg-white/70 blur-3xl"
      />
      <div
        ref={shapeBRef}
        className="absolute bottom-[16%] right-[12%] h-36 w-36 rounded-full border border-white/70 bg-stone-200/70 blur-3xl"
      />
      <div
        ref={glowRef}
        className="absolute inset-x-[12%] top-[12%] h-[72%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)] blur-3xl"
        style={{ opacity: reducedMotion ? 0.45 : phase === 'phase-4' ? 0.72 : 0.24 }}
      />
      <div
        ref={shadowRef}
        className="absolute bottom-[8%] h-16 w-[70%] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.16),transparent_70%)] blur-3xl"
        style={{ opacity: reducedMotion ? 0.4 : phase === 'phase-4' ? 0.52 : 0.22 }}
      />
      <div
        ref={productRef}
        className="relative h-[420px] w-[270px] rounded-[2.75rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(236,231,222,0.92))] p-6 shadow-[0_35px_140px_rgba(15,23,42,0.12)] sm:h-[480px] sm:w-[300px]"
        style={{ opacity: reducedMotion ? 1 : phase === 'phase-1' ? 0.3 : phase === 'phase-2' ? 0.65 : phase === 'phase-3' ? 0.9 : 1 }}
      >
        <div className="absolute inset-0 rounded-[2.75rem] border border-white/80" />
        <div className="absolute inset-x-[16%] top-[8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),transparent_72%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-between">
          <div className="h-24 w-24 rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(233,229,220,0.9))] shadow-[0_10px_30px_rgba(15,23,42,0.12)]" />
          <div className="h-[55%] w-[42%] rounded-[1.6rem] border border-[color:var(--color-border)] bg-[linear-gradient(160deg,#f4efe8,#d8d2c8)]" />
          <div className="h-8 w-20 rounded-full border border-[color:var(--color-border)] bg-white/80" />
        </div>
      </div>
    </div>
  )
}
