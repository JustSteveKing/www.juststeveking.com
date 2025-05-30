<script setup lang="ts">
const { data: page } = await useAsyncData('sponsorships', () => {
  return queryCollection('sponsorships').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})

defineOgImageComponent('SimpleBlog', {
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    >
      <template #links>
        <NuxtLink
          v-for="(link, index) in page.links"
          :key="index"
          :to="link.url"
          class="u-link u-link--primary"
        >
          {{ link.title }}
        </NuxtLink>
      </template>
    </UPageHero>

    <UPageSection
      :title="page.plans.title"
      :description="page.plans.description"
      :ui="{
        container: '!p-0',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    >
      <UPageList>
        <UPageCard
          v-for="(plan, index) in page.plans.items"
          :key="index"
          variant="ghost"
        >
          <template #leading>
            <h3>{{ plan.title }}</h3>
          </template>
          <template #title>
            <h4>{{ plan.details.title }}</h4>
          </template>
          <template #description>
            <p>{{ plan.details.description }}</p>
          </template>
          <template #footer>
            <div class="space-y-6">
              <div v-if="plan.details.includes">
                <h4>Includes</h4>
                <ol class="list-disc pl-5">
                  <li
                    v-for="(include, inIdx) in plan.details.includes"
                    :key="inIdx"
                  >
                    {{ include }}
                  </li>
                </ol>
              </div>
              <div v-if="plan.details.excludes">
                <h4>Excludes</h4>
                <ol class="list-disc pl-5">
                  <li
                    v-for="(exclude, exIdx) in plan.details.excludes"
                    :key="exIdx"
                  >
                    {{ exclude }}
                  </li>
                </ol>
              </div>
              <div v-if="plan.details.deliverables">
                <h4>Deliverables</h4>
                <ol class="list-disc pl-5">
                  <li
                    v-for="(deliverable, deIdx) in plan.details.deliverables"
                    :key="deIdx"
                  >
                    {{ deliverable }}
                  </li>
                </ol>
              </div>
              <div v-if="plan.details.terms">
                <h4>Terms</h4>
                <ol class="list-disc pl-5">
                  <li
                    v-for="(term, teIdx) in plan.details.terms"
                    :key="teIdx"
                  >
                    {{ term }}
                  </li>
                </ol>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageList>
    </UPageSection>
    <UPageSection
      title="Ready to Sponsor?"
      description="I work with a limited number of sponsors to ensure quality and authenticity. Before proceeding with sponsorship, get in touch."
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <UButton
          to="mailto:juststeveking@proton.me"
          target="_blank"
        >
          Email me
        </UButton>
      </template>
      <ol class="list-disc pl-5">
        <li>Discuss your goals and ensure good alignment.</li>
        <li>Confirm current availability for your preferred tier.</li>
        <li>Review content guidelines and expectations.</li>
        <li>Schedule any required approval calls.</li>
      </ol>

      <UAlert
        type="info"
        title="Individual Support"
        description="For developers who want to support my work, GitHub Sponsors, YouTube memberships, and direct contributions are always appreciated and help keep this content free for everyone."
      />

      <UProseP><strong>Why Sponsor?</strong> Your support directly funds:</UProseP>
      <ol class="list-disc pl-5">
        <li>Open-source tools used by thousands of developers</li>
        <li>Free educational content and tutorials</li>
        <li>Community resources and documentation</li>
        <li>Conference talks and workshop development</li>
      </ol>
      <UProseP>Every contribution, regardless of size, makes a meaningful difference in sustaining this work and keeping developer education accessible to all.</UProseP>
    </UPageSection>
  </UPage>
</template>
