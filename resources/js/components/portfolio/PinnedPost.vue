<script setup>
import { ref, watch } from 'vue'
import { Pin } from 'lucide-vue-next'
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/ui/carousel'
import FeedPostCard from '@/components/portfolio/FeedPostCard.vue'

const props = defineProps({
  posts: { type: Array, required: true },
})

const colors = ['bg-red-50', 'bg-yellow-50', 'bg-blue-50']
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center gap-2 mb-3 px-1">
      <Pin class="w-4 h-4 text-muted-foreground" />
      <span class="text-sm lg:text-xl font-semibold text-muted-foreground">Pinned Posts</span>
    </div>

    <Carousel class="w-full" :opts="{ loop: false, align: 'start' }" @init-api="(api) => carouselApi = api">
      <CarouselContent>
        <CarouselItem v-for="(post, i) in posts" :key="post.id" class="basis-[75%] md:basis-[55%] lg:basis-[45%]">
          <div class="h-48 lg:h-56">
            <FeedPostCard :post="post" compact :bg="colors[i % colors.length]" class="h-full" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselNext class="right-2" />
    </Carousel>
  </div>
</template>
