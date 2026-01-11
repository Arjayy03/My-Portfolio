<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
}

interface Props {
    projects: Project[];
}

defineProps<Props>();
</script>

<template>
    <Head title="Portfolio" />
    
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                    My Portfolio
                </h1>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="project in projects"
                    :key="project.id"
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                    <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ project.description }}</p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>