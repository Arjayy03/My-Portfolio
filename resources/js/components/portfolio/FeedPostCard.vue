<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FolderGit2, Wrench, Building2, Pin, Heart, MessageCircle, Share2, Ellipsis, ExternalLink, Bookmark, Send, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

defineProps({
  post: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  bg: { type: String, default: '' },
})

function getIcon(type) {
  if (type === 'project') return FolderGit2
  if (type === 'stack') return Wrench
  if (type === 'experience') return Building2
  return Pin
}

const carouselApi = ref(null)
const currentIndex = ref(0)
const liked = ref(false)

// Lightbox
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(i) {
  lightboxIndex.value = i
  lightboxOpen.value = true
}
function lightboxPrev(images) {
  lightboxIndex.value = (lightboxIndex.value - 1 + images.length) % images.length
}
function lightboxNext(images) {
  lightboxIndex.value = (lightboxIndex.value + 1) % images.length
}

// Comment
const RANDOM_NAMES = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Drew']
const showComments = ref(false)
const commentMessage = ref('')
const comments = ref([])

function submitComment() {
  if (!commentMessage.value.trim()) return
  const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
  comments.value.push({ name, message: commentMessage.value.trim() })
  commentMessage.value = ''
}

// Share
const shareToast = ref(false)

async function handleShare() {
  if (navigator.share) {
    await navigator.share({ title: document.title, url: window.location.href })
  } else {
    await navigator.clipboard.writeText(window.location.href)
    shareToast.value = true
    setTimeout(() => shareToast.value = false, 2500)
  }
}

const cardRef = ref(null)

function handleClickOutside(e) {
  if (showComments.value && cardRef.value && !cardRef.value.$el.contains(e.target)) {
    showComments.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

watch(carouselApi, (api) => {
  if (!api) return
  api.on('select', () => { currentIndex.value = api.selectedScrollSnap() })
})
</script>

<template>
  <Card ref="cardRef" :class="[compact ? 'rounded-2xl p-4 h-full' : 'rounded-3xl p-6', bg]">
    <CardContent class="pt-0 p-0">
      <div v-if="!compact" class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <component :is="getIcon(post.type)" class="w-5 h-5 text-muted-foreground" />
        </div>
        <div class="flex-1">
          <p class="text-sm lg:text-base font-semibold">{{ post.title }}</p>
          <p class="text-xs lg:text-sm text-muted-foreground">{{ post.subtitle }}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Ellipsis class="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem class="gap-2 cursor-pointer">
              <ExternalLink class="w-4 h-4" /> Learn More
            </DropdownMenuItem>
            <DropdownMenuItem class="gap-2 cursor-pointer">
              <Bookmark class="w-4 h-4" /> Save Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div v-else class="mb-3">
        <p class="text-sm font-semibold">{{ post.title }}</p>
        <p class="text-xs text-muted-foreground">{{ post.subtitle }}</p>
      </div>
      <p :class="compact ? 'text-xs text-muted-foreground leading-relaxed' : 'text-sm lg:text-base text-muted-foreground leading-relaxed'">{{ post.content }}</p>
      <a v-if="post.link && !compact" :href="post.link" target="_blank" class="inline-flex items-center gap-1.5 mt-2 text-xs text-blue-500 hover:underline">
        <ExternalLink class="w-3.5 h-3.5" /> {{ post.link }}
      </a>
      <div v-if="post.images && post.images.length" class="mt-4">
        <Carousel class="w-full" :opts="{ loop: true }" @init-api="(api) => carouselApi = api">
          <CarouselContent>
            <CarouselItem v-for="(img, i) in post.images" :key="i">
              <div class="relative group cursor-pointer" @click="openLightbox(i)">
                <img :src="img" :alt="`${post.title} screenshot ${i + 1}`"
                  class="w-full h-64 lg:h-72 object-cover rounded-2xl" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
                    <Maximize2 class="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div class="flex justify-center gap-1.5 mt-3">
          <button
            v-for="(img, i) in post.images"
            :key="i"
            :class="['w-2 h-2 rounded-full transition-all', currentIndex === i ? 'bg-foreground w-4' : 'bg-muted-foreground/40']"
            @click="carouselApi?.scrollTo(i)"
          />
        </div>
      </div>
      <div v-if="post.tags && post.tags.length" :class="compact ? 'mt-3 flex flex-wrap gap-1.5' : 'mt-6 flex flex-wrap gap-2'">
        <Badge v-for="tag in post.tags" :key="tag" variant="secondary" :class="compact ? 'rounded-full text-xs px-2 py-0.5 bg-white text-slate-600' : 'rounded-full lg:text-sm lg:px-3 lg:py-1 bg-slate-200 text-slate-600 hover:bg-slate-300'">
          {{ tag }}
        </Badge>
      </div>
      <div v-if="!compact" class="mt-8 pt-4 border-t flex items-center gap-4">
        <button class="flex items-center gap-1.5 transition-colors" :class="liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'" @click="liked = !liked">
          <Heart class="w-4 h-4" :class="liked ? 'fill-red-500' : ''" />
          <span class="text-xs">Like</span>
        </button>
        <button class="flex items-center gap-1.5 transition-colors" :class="showComments ? 'text-blue-500' : 'text-muted-foreground hover:text-blue-400'" @click="showComments = !showComments">
          <MessageCircle class="w-4 h-4" />
          <span class="text-xs">Comment</span>
        </button>
        <button class="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" @click="handleShare">
          <Share2 class="w-4 h-4" />
          <span class="text-xs">Share</span>
        </button>
      </div>

      <!-- Comment Section -->
      <div v-if="!compact && showComments" class="mt-4 space-y-3">
        <div v-if="comments.length" class="space-y-2">
          <div v-for="(c, i) in comments" :key="i" class="flex items-start gap-2 text-sm">
            <div class="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-semibold">
              {{ c.name[0].toUpperCase() }}
            </div>
            <div class="bg-muted rounded-2xl px-3 py-2">
              <p class="font-semibold text-xs">{{ c.name }}</p>
              <p class="text-muted-foreground text-xs">{{ c.message }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <input v-model="commentMessage" placeholder="Write a comment..." class="flex-1 text-sm rounded-xl border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400" @keyup.enter="submitComment" />
            <button class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors" @click="submitComment">
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0" leave-active-class="transition-all duration-200" leave-to-class="opacity-0">
          <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" @click.self="lightboxOpen = false">
            <button class="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" @click="lightboxOpen = false">
              <X class="w-5 h-5" />
            </button>
            <button v-if="post.images.length > 1" class="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" @click="lightboxPrev(post.images)">
              <ChevronLeft class="w-5 h-5" />
            </button>
            <img :src="post.images[lightboxIndex]" :alt="`${post.title} screenshot ${lightboxIndex + 1}`"
              class="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl" />
            <button v-if="post.images.length > 1" class="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" @click="lightboxNext(post.images)">
              <ChevronRight class="w-5 h-5" />
            </button>
            <div v-if="post.images.length > 1" class="absolute bottom-4 flex gap-1.5">
              <span v-for="(_, i) in post.images" :key="i" :class="['w-2 h-2 rounded-full transition-all', lightboxIndex === i ? 'bg-white w-4' : 'bg-white/40']" />
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Share Toast -->
      <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-2" leave-active-class="transition-all duration-300" leave-to-class="opacity-0 translate-y-2">
        <div v-if="shareToast" class="mt-3 flex items-center justify-between gap-2 rounded-xl bg-slate-800 text-white text-xs px-4 py-2.5">
          <span>Link copied to clipboard!</span>
          <button @click="shareToast = false"><X class="w-3.5 h-3.5" /></button>
        </div>
      </Transition>
    </CardContent>
  </Card>
</template>
