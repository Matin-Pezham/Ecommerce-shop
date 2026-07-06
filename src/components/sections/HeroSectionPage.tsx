import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProductAutoMotionSection } from '@/components/sections/ProductAutoMotionSection'
import { ScrollStorySection } from '@/components/scroll-story/ScrollStorySection'
import { StoryBridgeSection } from '@/components/sections/StoryBridgeSection'
import { SectionWrapper } from '@/components/layout/Section'

export function HeroSectionPage() {
  return (
    <div>
      <SectionWrapper as="div" size="xl" background="default" className="pb-0">
        <HeroSection />
      </SectionWrapper>
      <SectionWrapper id="experience" as="div" size="md" background="default" className="pt-0 pb-0">
        <ScrollStorySection />
      </SectionWrapper>
      <SectionWrapper id="story" as="div" size="sm" background="default" className="pt-0 pb-0">
        <ProductAutoMotionSection />
      </SectionWrapper>
      <SectionWrapper as="div" size="md" background="surface" className="pt-0 pb-0">
        <StoryBridgeSection />
      </SectionWrapper>
      <SectionWrapper as="div" size="lg" background="surface" className="pt-0">
        <FeaturedProductsSection />
      </SectionWrapper>
    </div>
  )
}
