export type ScrollPhase = 'abstract' | 'emerging' | 'revealed' | 'final'

export type ScrollStoryState = {
  phase: ScrollPhase
  progress: number
}
