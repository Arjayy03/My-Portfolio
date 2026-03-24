<script setup>
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-vue-next'
import { useCarousel } from '.'

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type: String, default: 'outline' },
  size: { type: String, default: 'icon' },
})

const { scrollNext, canScrollNext, orientation } = useCarousel()
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute h-8 w-8 rounded-full',
      orientation === 'horizontal'
        ? '-right-4 top-1/2 -translate-y-1/2'
        : '-bottom-4 left-1/2 -translate-x-1/2 rotate-90',
      props.class
    )"
    @click="scrollNext"
  >
    <ChevronRight class="h-4 w-4" />
    <span class="sr-only">Next slide</span>
  </Button>
</template>
