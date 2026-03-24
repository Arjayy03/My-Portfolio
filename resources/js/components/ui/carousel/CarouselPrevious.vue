<script setup>
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useCarousel } from '.'

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type: String, default: 'outline' },
  size: { type: String, default: 'icon' },
})

const { scrollPrev, canScrollPrev, orientation } = useCarousel()
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :disabled="!canScrollPrev"
    :class="cn(
      'absolute h-8 w-8 rounded-full',
      orientation === 'horizontal'
        ? '-left-4 top-1/2 -translate-y-1/2'
        : '-top-4 left-1/2 -translate-x-1/2 rotate-90',
      props.class
    )"
    @click="scrollPrev"
  >
    <ChevronLeft class="h-4 w-4" />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>
