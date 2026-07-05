export type StoryPhase = 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4'

export const storyPhaseCopy = {
  'phase-1': {
    eyebrow: 'Quiet reveal',
    headline: 'A cinematic unveiling in four acts.',
    body: 'The product emerges through light, shadow, and pressure before it becomes unmistakably present.',
  },
  'phase-2': {
    eyebrow: 'Form takes shape',
    headline: 'Depth begins to answer the light.',
    body: 'The silhouette sharpens, the finish glows, and the experience gains momentum.',
  },
  'phase-3': {
    eyebrow: 'The architecture appears',
    headline: 'Precision settles into place.',
    body: 'A refined object reveals its character with soft motion and measured restraint.',
  },
  'phase-4': {
    eyebrow: 'The experience arrives',
    headline: 'A premium object, fully revealed.',
    body: 'Every detail feels intentional, every transition deliberate, every moment considered.',
  },
} as const

export const storyTimelineEasing = 'power2.out' as const
