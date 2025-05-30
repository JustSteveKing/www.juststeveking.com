<script setup lang="ts">
const { data: page } = await useAsyncData('uses', () => {
  return queryCollection('uses').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

defineOgImageComponent('SimpleBlog', {
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero :title="page.title" :description="page.description" orientation="horizontal" :ui="{
      container: 'lg:flex sm:flex-row items-center',
      title: '!mx-0 text-left',
      description: '!mx-0 text-left',
      links: 'justify-start'
    }" />
    <UPageSection :ui="{
      container: '!pt-0'
    }">
      <!-- Hardware Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mb-16 last:mb-0">
        <div class="lg:col-span-1 mb-4 lg:mb-0">
          <h2 class="lg:sticky lg:top-16 text-xl font-semibold tracking-tight text-highlighted z-10">
            Hardware
          </h2>
          <p class="mb-1 text-sm font-medium text-muted">
            {{ page.hardware.title }}
          </p>
        </div>

        <div class="lg:col-span-2 space-y-8">
          <div 
            v-for="(item, index) in page.hardware.items" 
            :key="`hardware-${index}`"
            class="group relative pl-6 border-l border-default"
          >
            <h3 class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <div class="mb-1 text-sm font-medium text-muted">
              <span>{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Software Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mb-16 last:mb-0">
        <div class="lg:col-span-1 mb-4 lg:mb-0">
          <h2 class="lg:sticky lg:top-16 text-xl font-semibold tracking-tight text-highlighted z-10">
            Software
          </h2>
          <p class="mb-1 text-sm font-medium text-muted">
            {{ page.software.title }}
          </p>
        </div>

        <div class="lg:col-span-2 space-y-8">
          <div 
            v-for="(item, index) in page.software.items" 
            :key="`software-${index}`"
            class="group relative pl-6 border-l border-default"
          >
            <h3 class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <div class="mb-1 text-sm font-medium text-muted">
              <span>{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Services Section - Restructured for consistency -->
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mb-16 last:mb-0">
        <div class="lg:col-span-1 mb-4 lg:mb-0">
          <h2 class="lg:sticky lg:top-16 text-xl font-semibold tracking-tight text-highlighted z-10">
            Services
          </h2>
          <p class="mb-1 text-sm font-medium text-muted">
            {{ page.services.title }}
          </p>
        </div>

        <div class="lg:col-span-2 space-y-8">
          <div 
            v-for="(item, index) in page.services.items" 
            :key="`services-${index}`"
            class="group relative pl-6 border-l border-default"
          >
            <a
              :href="item.url"
              target="_blank"
              :title="`Visit ${item.title}`"
              :aria-label="`Visit ${item.title}`"
              rel="noopener noreferrer"
              class="block transition-colors duration-200"
            >
              <h3 class="text-lg font-semibold text-highlighted group-hover:text-primary">
                {{ item.title }}
              </h3>
              <div class="mb-1 text-sm font-medium text-muted">
                <span>{{ item.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>