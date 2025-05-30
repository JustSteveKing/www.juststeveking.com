<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: articles } = await useAsyncData('index-articles', () =>
  queryCollection('articles').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <UPageSection
    :title="page.articles.title"
    :description="page.articles.description"
    :ui="{
      container: 'px-0 !pt-0 !pb-12 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(article, index) in articles"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="article"
        :to="article.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #footer>
          <UButton
            size="xs"
            variant="link"
            class="px-0 gap-0"
            label="Read Article"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
