<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Home, FolderGit2, BookOpen, FileText } from 'lucide-vue-next'

const navRef = ref(null)

const props = defineProps({
  show: { type: Boolean, required: true },
})

const emit = defineEmits(['close'])

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Gallery', icon: FolderGit2, soon: true },
  { label: 'Blog', icon: BookOpen, soon: true },
  { label: 'Resume', icon: FileText, soon: true },
]

const tooltip = ref(null)

function showTooltip(label) {
  tooltip.value = label
  setTimeout(() => tooltip.value = null, 1800)
}

function handleClickOutside(e) {
  if (props.show && navRef.value && !navRef.value.contains(e.target)) {
    emit('close')
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200"
    enter-from-class="opacity-0 scale-95 -translate-y-2"
    leave-active-class="transition-all duration-150"
    leave-to-class="opacity-0 scale-95 -translate-y-2"
  >
    <div
      v-if="show"
      ref="navRef"
      class="absolute top-14 right-4 z-50 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-2 min-w-[220px]"
    >
      <!-- Nav Items -->
      <nav class="flex flex-col">
        <template v-for="item in navItems" :key="item.label">
          <a
            v-if="item.href"
            :href="item.href"
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <component :is="item.icon" class="w-4 h-4 text-slate-500" />
            {{ item.label }}
          </a>
          <div v-else class="relative">
            <button
              class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-100 transition-colors"
              @click="showTooltip(item.label)"
            >
              <component :is="item.icon" class="w-4 h-4 text-slate-300" />
              {{ item.label }}
            </button>
            <Transition enter-active-class="transition-all duration-150" enter-from-class="opacity-0 scale-95" leave-active-class="transition-all duration-100" leave-to-class="opacity-0 scale-95">
              <span v-if="tooltip === item.label" class="absolute left-1/2 -translate-x-1/2 -top-8 bg-slate-800 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap">
                Coming soon
              </span>
            </Transition>
          </div>
        </template>
      </nav>

      <!-- Divider -->
      <div class="my-2 border-t border-slate-100" />

      <!-- Profile -->
      <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
        <Avatar class="w-8 h-8">
          <AvatarImage src="/images/dadivas.png" alt="Profile" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-semibold text-slate-700 leading-tight">Arjay A. Dadivas</p>
          <p class="text-xs text-slate-400">View Profile</p>
        </div>
      </a>
    </div>
  </Transition>
</template>
