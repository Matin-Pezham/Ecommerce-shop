import type { ReactNode, RefObject } from 'react'

type PinnedSceneProps = {
  children: ReactNode
  sceneRef: RefObject<HTMLDivElement | null>
}

export function PinnedScene({ children, sceneRef }: PinnedSceneProps) {
  return (
    <div ref={sceneRef} className="sticky top-[calc(var(--header-height)+1rem)] flex min-h-[calc(100svh-var(--header-height)-2rem)] items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative flex h-full w-full max-w-7xl items-center justify-center rounded-[2.25rem] border border-white/70 bg-white/35 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-[36px]">
        {children}
      </div>
    </div>
  )
}
