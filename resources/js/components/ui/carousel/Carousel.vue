<script setup>
import { watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideCarousel } from '.'

const props = defineProps({
  opts: { type: Object, default: () => ({}) },
  plugins: { type: Array, default: () => [] },
  orientation: { type: String, default: 'horizontal' },
  class: { type: String, default: '' },
})

const emit = defineEmits(['init-api'])

const { emblaApi, onInit } = provideCarousel({
  opts: props.opts,
  orientation: props.orientation,
  plugins: props.plugins,
})

watch(emblaApi, (api) => {
  if (api) {
    onInit(api)
    emit('init-api', api)
  }
})
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
  >
    <slot />
  </div>
</template>
