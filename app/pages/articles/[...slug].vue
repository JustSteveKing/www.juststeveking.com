<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('articles').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('articles', route.path, {
    fields: ['description']
  })
)

const { data: related } = await useAsyncData(`related-${route.path}`, async () => {
  if (!page.value?.tags?.length) {
    return []
  }

  try {
    // First, let's get all articles to debug
    const allArticles = await queryCollection('articles').all()

    const tags = page.value.tags
    const relatedArticles = []

    for (const article of allArticles) {
      if (article.path === page.value.path) continue

      if (article.tags && Array.isArray(article.tags)) {
        const hasSharedTag = tags.some(tag => article.tags?.includes(tag))
        if (hasSharedTag) {
          relatedArticles.push(article)
        }
      }
    }
    return relatedArticles.slice(0, 3)
  } catch (error) {
    console.log(error)
    return []
  }
})

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const blogNavigation = computed(() => navigation.value.find(item => item.path === '/articles')?.children || [])

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value)).map(({ icon, ...link }) => link))

if (page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('SimpleBlog', {
    headline: breadcrumb.value.map(item => item.label).join(' > ')
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/articles"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Articles
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>
          <NuxtImg
            loading="lazy"
            decoding="async"
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <template v-if="page.sponsor">
            <UAlert
              :title="`Sponsored by ${page.sponsor.name}`"
              description="This article is sponsored content."
              variant="soft"
              orientation="horizontal"
              :avatar="{
                src: page.sponsor.logo,
                alt: `Logo of ${page.sponsor.name}`
              }"
              :actions="[{
                label: `Visit ${page.sponsor.name}`,
                href: page.sponsor.url,
                target: '_blank',
                rel: 'noopener nofollow',
                icon: 'lucide:external-link'
              }]"
            />
          </template>
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround />

          <UPageSection
            title="Related Articles"
            :ui="{ container: '!p-0', title: 'text-left' }"
          >
            <UBlogPosts orientation="vertical">
              <Motion
                v-for="(article, index) in related"
                :key="index"
                :initial="{ opacity: 0, transform: 'translateY(10px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 * index }"
                :in-view-options="{ once: true }"
              >
                <UBlogPost
                  variant="naked"
                  orientation="horizontal"
                  :to="article.path"
                  v-bind="article"
                  :ui="{
                    root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
                    image:
                      'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
                    header:
                      index % 2 === 0
                        ? 'sm:-rotate-1 overflow-visible'
                        : 'sm:rotate-1 overflow-visible'
                  }"
                />
              </Motion>
            </UBlogPosts>
          </UPageSection>
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
