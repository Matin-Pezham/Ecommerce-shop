import type { ReactNode, RefObject } from 'react'

type PinnedSceneProps = {
  children: ReactNode
  sceneRef: RefObject<HTMLDivElement | null>
}

export function PinnedScene({ children, sceneRef }: PinnedSceneProps) {
  return (
    <div ref={sceneRef} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex h-full w-full max-w-7xl items-center justify-center rounded-[2.5rem] border border-white/70 bg-white/30 shadow-[0_35px_120px_rgba(15,23,42,0.08)] backdrop-blur-[36px]">
        {children}
      </div>
    </div>
  )
}
