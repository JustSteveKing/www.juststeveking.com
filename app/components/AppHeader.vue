<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <Logo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" variant="link" />

    <template #right>
      <ColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
      <USeparator class="my-6" />
    </template>
  </UHeader>
</template>
