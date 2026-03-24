<script setup>
import { computed, ref } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BadgeCheck, Briefcase, Star, Heart, GraduationCap, Link, Phone, SquarePen, Send, CheckCircle2 } from 'lucide-vue-next'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import PinnedPost from '@/components/portfolio/PinnedPost.vue'
import FeedSection from '@/components/portfolio/FeedSection.vue'
import NavBar from '@/components/portfolio/NavBar.vue'

const showNav = ref(false)

const showContact = ref(false)
const contactForm = ref({ name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)
const sendError = ref(false)

async function submitContact() {
  sending.value = true
  sendError.value = false
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '303b562e-7afb-492d-900e-a31a79aef1c0',
        ...contactForm.value,
      }),
    })
    const data = await res.json()
    if (data.success) {
      sent.value = true
      contactForm.value = { name: '', email: '', message: '' }
    } else {
      sendError.value = true
    }
  } catch {
    sendError.value = true
  } finally {
    sending.value = false
  }
}

const posts = [
  {
    id: 1,
    type: 'pinned',
    title: 'Welcome',
    subtitle: 'Introduction',
    content: "Welcome to my portfolio! I'm a UI/UX Designer and Frontend Developer passionate about building clean, user-friendly interfaces. Feel free to explore my projects and reach out.",
    tags: [],
  },
  {
    id: 2,
    type: 'pinned',
    title: 'Open to Work',
    subtitle: 'Availability',
    content: "I'm currently open to Junior Frontend Developer or UI/UX Designer roles. If you have a project in mind or a role that fits, feel free to reach out!",
    tags: ['UI Designer', 'Full-time', 'Developer'],
  },
  {
    id: 3,
    type: 'pinned',
    title: 'Latest Achievement',
    subtitle: 'Milestone',
    content: 'Successfully launched Tresh, a full-stack IoT project with AI integration, serving real users, and recognized at our university’s thesis exhibit.',
    tags: ['Capstone', 'IoT', 'AI'],
  },
  {
    id: 9,
    type: 'experience',
    title: 'Full Stack Developer Intern',
    subtitle: 'Filipinas Multi-Line Corp.',
    content: 'Contributed to the development and enhancement of the Online Stock Position Report System. Implemented an Audit Log feature to track administrative and user activities, improving system monitoring and user management.',
    tags: [],
  },
  {
    id: 8,
    type: 'stack',
    title: 'Tech Stack',
    subtitle: 'Tools I use',
    content: 'I build interfaces and full-stack applications using modern frontend and backend tools.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Vue', 'React', 'Tailwind CSS', 'TypeScript', 'Bootstrap', 'Adobe Photoshop', 'Adobe Illustrator', 'AJAX', 'Vite', 'Shadcn', 'GitHub', 'MySQL'],
  },
  {
    id: 2,
    type: 'project',
    title: 'Tresh',
    subtitle: 'Featured Project',
    link: 'https://tresh.site/',
    content: 'An AI-enabled IoT smart trash bin that improves waste segregation and monitoring in guarded public establishments. Automatically classifies waste into biodegradable, recyclable, residual, and mixed-waste, then sorts and seals it into the appropriate bin.',
    tags: ['Laravel', 'Vue', 'IoT', 'AI'],
    images: ['/images/projects/tresh1.png', '/images/projects/tresh2.png', '/images/projects/tresh3.png', '/images/projects/tresh4.png', '/images/projects/tresh5.png'],
  },
  {
    id: 3,
    type: 'project',
    title: 'Stocker',
    subtitle: 'Stock Investment Simulator',
    content: 'A stock investment simulator designed to help beginners learn the fundamentals of investing and stock trading in a safe, risk-free environment. Users start with a virtual balance of up to ₱100,000 to buy and sell stocks and track their portfolio using fake stock data.',
    tags: ['Vue 3', 'Tailwind', 'Laravel'],
    images: ['/images/projects/stocker1.png', '/images/projects/stocker2.png'],
  },
  {
    id: 4,
    type: 'project',
    title: 'CuiSining',
    subtitle: 'Web-based 3D Simulation Game',
    content: 'A web-based 3D simulation game designed to assess the user\'s cooking knowledge and experience. Through interactive training, the game provides a set of instructions to guide players, helping them better understand cooking techniques and processes.',
    tags: ['3D', 'Web Game', 'Simulation'],
    images: ['/images/projects/cuisining1.png', '/images/projects/cuisining2.png', '/images/projects/cuisining3.png', '/images/projects/cuisining4.png', '/images/projects/cuisining5.png'],
  },
  {
    id: 5,
    type: 'project',
    title: 'Gas Leak Detection System',
    subtitle: 'IoT Project',
    content: 'An IoT-based gas leak detection system that monitors harmful gases like carbon monoxide (CO) and LPG in real time. Uses sensors and an ESP32 to measure gas levels (PPM), sends data to Firebase, and displays it in a mobile app for remote monitoring.',
    tags: ['IoT', 'ESP32', 'Firebase'],
    images: ['/images/projects/gas1.png', '/images/projects/gas2.png', '/images/projects/gas3.png'],
  },
  {
    id: 6,
    type: 'project',
    title: 'Duke',
    subtitle: 'Food Truck POS System',
    content: 'A Food Truck Point of Sale (POS) System developed using C# with a SQL Server database backend. Specifically designed to efficiently process customer payments at the admin counter.',
    tags: ['C#', 'SQL Server', 'POS'],
    images: ['/images/projects/duke1.png', '/images/projects/duke2.png', '/images/projects/duke3.png'],
  },
  {
    id: 10,
    type: 'project',
    title: 'Fit Fortress',
    subtitle: 'Fitness Platform',
    content: "A fitness platform designed to help you achieve your goals through personalized workout programs, nutrition plans, and progress tracking tools.",
    tags: [],
    images: ['/images/projects/fit1.png', '/images/projects/fit2.png', '/images/projects/fit3.png', '/images/projects/fit4.png'],
  },
  {
    id: 7,
    type: 'project',
    title: 'Portfolio Website',
    subtitle: 'Personal Branding',
    content: 'A modern personal portfolio showcasing my work, skills, and experience with a clean UI and responsive layout.',
    tags: ['Vue 3', 'Tailwind', 'shadcn-vue'],
    images: ['/images/projects/portfolio1.png', '/images/projects/portfolio2.png', '/images/projects/portfolio3.png'],
  },
]

const pinnedPosts = computed(() => posts.filter((p) => p.type === 'pinned'))
const feedPosts = computed(() => posts.filter((p) => p.type !== 'pinned'))
</script>

<template>
  <section class="pb-16">
    <div class="max-w-7xl mx-auto px-4 pt-4">
      <!-- Banner -->
      <div class="relative w-full h-64 md:h-80 lg:h-[350px] rounded-[3rem] bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400">
        <div class="absolute top-4 right-4 p-4">
          <button class="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 transition-colors" @click.stop="showNav = !showNav">
            <SquarePen class="w-4 h-4 text-black" />
          </button>
          <NavBar :show="showNav" @close="showNav = false" />
        </div>
        <!-- Avatar -->
        <div class="absolute -bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 lg:left-20">
          <Avatar class="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 border-4 border-white ring-2 ring-background">
            <AvatarImage src="/images/dadivas.png" alt="Profile" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <!-- Content Row -->
      <div class="mt-24 md:mt-32 lg:mt-32 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <!-- Left: Profile Info -->
        <div class="md:flex-1 text-center md:text-left md:pl-12 lg:pl-[78px]">
          <h1 class="text-2xl md:text-2xl lg:text-2xl font-bold">
            Arjay A. Dadivas
            <BadgeCheck class="inline ml-1 mb-1 w-5 h-5 text-blue-500" />
          </h1>

          <p class="text-muted-foreground mt-3 mb-1 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            UI/UX Designer • Frontend Developer
          </p>

          <p class="text-muted-foreground text-sm md:text-base max-w-xl mx-auto md:mx-0">
            Caloocan City, Philippines
          </p>

          <div class="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <Button class="px-6 py-3 text-sm lg:text-base rounded-full h-12 bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
              View Projects
            </Button>

            <Button variant="outline" class="px-6 py-3 text-sm lg:text-base rounded-full h-12 border-slate-300 text-slate-600 hover:bg-slate-200" @click="showContact = true">
              Contact Me
            </Button>
          </div>
        </div>

        <!-- Contact Modal -->
        <Dialog :open="showContact" @update:open="(v) => { showContact = v; sent = false }">
          <DialogContent class="rounded-[1.5rem] md:rounded-[2rem] p-6 w-[90vw] md:w-[480px]">
            <DialogHeader>
              <DialogTitle>Contact Me</DialogTitle>
              <DialogDescription>Send me a message and I'll get back to you.</DialogDescription>
            </DialogHeader>
            <div v-if="sent" class="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 class="w-12 h-12 text-green-500" />
              <p class="font-semibold">Message sent!</p>
              <p class="text-sm text-muted-foreground">Thanks for reaching out. I'll reply as soon as possible.</p>
              <Button class="mt-2 rounded-full bg-slate-700 hover:bg-slate-600" @click="showContact = false; sent = false">Close</Button>
            </div>
            <form v-else class="space-y-4 mt-2" @submit.prevent="submitContact">
              <div class="space-y-1">
                <label class="text-sm font-medium">Name</label>
                <input v-model="contactForm.name" required placeholder="Your name" class="w-full text-sm rounded-xl border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400" />
              </div>
              <div class="space-y-1">
                <label class="text-sm font-medium">Email</label>
                <input v-model="contactForm.email" required type="email" placeholder="your@email.com" class="w-full text-sm rounded-xl border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400" />
              </div>
              <div class="space-y-1">
                <label class="text-sm font-medium">Message</label>
                <textarea v-model="contactForm.message" required rows="4" placeholder="What's on your mind?" class="w-full text-sm rounded-xl border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400 resize-none" />
              </div>
              <p v-if="sendError" class="text-xs text-red-500">Something went wrong. Please try again.</p>
              <Button type="submit" :disabled="sending" class="w-full rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2">
                <Send class="w-4 h-4" />
                {{ sending ? 'Sending...' : 'Send Message' }}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <!-- Right: Current Role + Skills -->
        <div class="hidden mr-8 md:flex flex-col items-end text-right gap-8 md:min-w-[260px] lg:min-w-[320px] md:-mt-16 lg:-mt-20">
          <!-- Current Role -->
          <div>
            <div class="flex items-center justify-end gap-2 text-muted-foreground text-base md:text-base lg:text-lg font-medium">
              <span>Current role</span>
              <Briefcase class="w-4 h-4 md:w-5 md:h-5" />
            </div>

            <div class="mt-3 mb-[52px] inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold bg-slate-100 text-slate-700 border-slate-600">
              Sr. Frontend Developer
            </div>
          </div>

          <!-- Skills -->
          <div>
            <div class="flex items-center justify-end gap-2 text-muted-foreground text-sm md:text-base lg:text-lg font-medium">
              <span>Skills</span>
              <Star class="w-4 h-4 md:w-5 md:h-5" />
            </div>

            <div class="mt-3 flex flex-wrap justify-end gap-2 max-w-[360px] lg:max-w-[420px]">
              <Badge variant="secondary" class="rounded-full px-3 py-1.5 text-sm whitespace-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300">HTML</Badge>
              <Badge variant="secondary" class="rounded-full px-3 py-1.5 text-sm whitespace-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300">CSS</Badge>
              <Badge variant="secondary" class="rounded-full px-3 py-1.5 text-sm whitespace-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300">JS</Badge>
              <Badge variant="secondary" class="rounded-full px-3 py-1.5 text-sm whitespace-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300">Tailwind</Badge>
              <Badge variant="secondary" class="rounded-full px-3 py-1.5 text-sm whitespace-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300">Vue</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: About + Feed -->
      <div class="mt-8 flex flex-col lg:flex-row gap-6 lg:pl-[86px] lg:pr-6">
        <!-- About Column -->
        <div class="w-full lg:w-[320px] shrink-0">
          <!-- Mobile About Card -->
          <div class="lg:hidden">
            <Dialog>
              <DialogTrigger as-child>
                <Card class="text-center md:text-left w-full rounded-2xl cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader class="pb-2">
                    <CardTitle class="text-base">About</CardTitle>
                  </CardHeader>
                  <CardContent class="pt-0">
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      I'm a passionate UI/UX Designer and Frontend Developer with a strong focus on building clean, user-friendly interfaces...
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent class="text-left rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[3rem] p-6 w-[90vw] md:w-[600px] md:max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader class="text-left">
                  <DialogTitle class="text-sm">About</DialogTitle>
                  <DialogDescription class="text-left">More details about me</DialogDescription>
                </DialogHeader>

                <div class="text-sm space-y-4">
                  <div>
                    <p class="font-semibold">Personal Details</p>
                    <div class="mt-2 text-muted-foreground space-y-1 pl-1">
                      <p class="flex items-center gap-2">
                        <Heart class="w-4 h-4 shrink-0" /> Single
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="font-semibold">Education</p>
                    <div class="mt-2 text-muted-foreground pl-1">
                      <p class="flex items-center gap-2">
                        <GraduationCap class="w-4 h-4 shrink-0" /> University of Caloocan City
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="font-semibold">Links</p>
                    <div class="mt-2 text-muted-foreground space-y-1 pl-1">
                      <p class="flex items-center gap-2">
                        <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                        <a href="https://www.linkedin.com/in/arjdadivas" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>
                      </p>
                      <p class="flex items-center gap-2">
                        <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                        <a href="https://github.com/Arjayy03" target="_blank" class="text-blue-500 hover:underline">GitHub</a>
                      </p>
                      <p class="flex items-center gap-2">
                        <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                        <a href="https://www.instagram.com/arjdadivass" target="_blank" class="text-blue-500 hover:underline">Instagram</a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="font-semibold">Contact Info</p>
                    <div class="mt-2 text-muted-foreground pl-1">
                      <p class="flex items-center gap-2">
                        <Phone class="w-4 h-4 shrink-0" /> +63 936 674 4782
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <!-- Desktop About Card -->
          <div class="hidden lg:sticky lg:top-4 lg:block">
            <Card class="rounded-3xl">
              <CardHeader class="pb-2">
                <CardTitle class="text-base">About</CardTitle>
              </CardHeader>
              <CardContent class="pt-0">
                <p class="text-sm text-muted-foreground leading-relaxed">
                  I'm a passionate UI/UX Designer and Frontend Developer with a strong focus on building clean, user-friendly interfaces. I enjoy turning complex problems into simple, beautiful designs and bringing them to life with code.
                </p>

                <div class="mt-4">
                  <p class="text-base font-semibold">Personal Details</p>
                  <div class="mt-2 text-sm text-muted-foreground space-y-1 pl-1">
                    <p class="flex items-center gap-2">
                      <Heart class="w-4 h-4 shrink-0" /> Single
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <p class="text-base font-semibold">Education</p>
                  <div class="mt-2 text-sm text-muted-foreground pl-1">
                    <p class="flex items-center gap-2">
                      <GraduationCap class="w-4 h-4 shrink-0" /> University of Caloocan City
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <p class="text-base font-semibold">Links</p>
                  <div class="mt-2 text-sm space-y-1 pl-1">
                    <p class="flex items-center gap-2">
                      <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                      <a href="https://www.linkedin.com/in/arjdadivas" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>
                    </p>
                    <p class="flex items-center gap-2">
                      <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                      <a href="https://github.com/Arjayy03" target="_blank" class="text-blue-500 hover:underline">GitHub</a>
                    </p>
                    <p class="flex items-center gap-2">
                      <Link class="w-4 h-4 shrink-0 text-muted-foreground" />
                      <a href="https://www.instagram.com/arjdadivass" target="_blank" class="text-blue-500 hover:underline">Instagram</a>
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <p class="text-base font-semibold">Contact Info</p>
                  <div class="mt-2 text-sm text-muted-foreground pl-1">
                    <p class="flex items-center gap-2">
                      <Phone class="w-4 h-4 shrink-0" /> +63 936 674 4782
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Feed Section -->
        <div class="flex-1 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 scrollbar-none">
          <PinnedPost v-if="pinnedPosts.length" :posts="pinnedPosts" />
          <FeedSection :posts="feedPosts" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
