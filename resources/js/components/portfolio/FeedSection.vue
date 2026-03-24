<script setup>
import { ref, computed } from 'vue'
import { Pin } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import FeedPostCard from '@/components/portfolio/FeedPostCard.vue'

const props = defineProps({
  posts: { type: Array, required: true },
})

const activeTab = ref('all')

const filteredPosts = computed(() => {
  if (activeTab.value === 'all') return props.posts
  return props.posts.filter((post) => post.type === activeTab.value)
})

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Projects', value: 'project' },
  { label: 'Skills', value: 'stack' },
  { label: 'Experience', value: 'experience' },
]
</script>

<template>
  <div class="flex-1">
    <div class="flex flex-wrap gap-2 mb-6">
      <Button
        v-for="tab in tabs"
        :key="tab.value"
        size="sm"
        :class="[
          'rounded-full lg:text-base lg:px-5 lg:py-2 lg:h-10',
          activeTab === tab.value
            ? 'bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600'
            : 'border-slate-300 text-slate-600 hover:bg-slate-200'
        ]"
        :variant="activeTab === tab.value ? 'default' : 'outline'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </Button>
    </div>

    <TransitionGroup name="feed" tag="div" class="space-y-6">
      <FeedPostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.feed-enter-active,
.feed-leave-active,
.feed-move {
  transition: all 0.3s ease;
}
.feed-enter-from,
.feed-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
