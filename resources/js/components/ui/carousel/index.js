import { ref, provide, inject, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const CAROUSEL_KEY = Symbol('carousel')

export function useCarousel() {
  const context = inject(CAROUSEL_KEY)
  if (!context) throw new Error('useCarousel must be used within a Carousel component')
  return context
}

export function provideCarousel({ opts = {}, orientation = 'horizontal', plugins = [] } = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  )

  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  function onSelect() {
    canScrollPrev.value = emblaApi.value?.canScrollPrev() ?? false
    canScrollNext.value = emblaApi.value?.canScrollNext() ?? false
  }

  function scrollPrev() { emblaApi.value?.scrollPrev() }
  function scrollNext() { emblaApi.value?.scrollNext() }

  function onInit(api) {
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    onSelect()
  }

  const context = {
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    onInit,
    orientation,
  }

  provide(CAROUSEL_KEY, context)
  return context
}

export { default as Carousel } from './Carousel.vue'
export { default as CarouselContent } from './CarouselContent.vue'
export { default as CarouselItem } from './CarouselItem.vue'
export { default as CarouselPrevious } from './CarouselPrevious.vue'
export { default as CarouselNext } from './CarouselNext.vue'
