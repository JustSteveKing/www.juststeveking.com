<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.services.title"
    :description="page.services.description"
    :headline="page.services.headline"
    :features="page.services.services"
    :ui="{
      container: 'p-6',
      title: 'text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-3 text-md sm:text-md lg:text-sm text-muted',
      headline: 'text-sm'
    }"
  />
</template>

<style scoped>

</style>
