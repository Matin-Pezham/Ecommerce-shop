import { ScrollContainer } from '@/components/scroll-story/ScrollContainer'
import { PinnedScene } from '@/components/scroll-story/PinnedScene'
import { ProductVisual } from '@/components/scroll-story/ProductVisual'
import { ScrollTextLayer } from '@/components/scroll-story/ScrollTextLayer'
import { useGSAPScrollStory } from '@/components/scroll-story/useGSAPScrollStory'

export function ScrollStorySection() {
  const { containerRef, sceneRef, productRef, glowRef, shadowRef, shapeARef, shapeBRef, phase, reducedMotion } = useGSAPScrollStory()

  return (
    <ScrollContainer containerRef={containerRef}>
      <PinnedScene sceneRef={sceneRef}>
        <ProductVisual
          productRef={productRef}
          glowRef={glowRef}
          shadowRef={shadowRef}
          shapeARef={shapeARef}
          shapeBRef={shapeBRef}
          phase={phase}
          reducedMotion={reducedMotion}
        />
        <ScrollTextLayer phase={phase} />
      </PinnedScene>
    </ScrollContainer>
  )
}
