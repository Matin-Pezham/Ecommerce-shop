export type StoryPhase = 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4'

export function getStoryPhase(progress: number): StoryPhase {
  if (progress >= 0.75) return 'phase-4'
  if (progress >= 0.5) return 'phase-3'
  if (progress >= 0.25) return 'phase-2'
  return 'phase-1'
}
