<script setup>
import { cn } from '@/lib/utils'
import { useCarousel } from '.'

const props = defineProps({
  class: { type: String, default: '' },
})

const { orientation } = useCarousel()
</script>

<template>
  <div
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      props.class
    )"
    role="group"
    aria-roledescription="slide"
  >
    <slot />
  </div>
</template>
