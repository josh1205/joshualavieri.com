<script setup lang="ts">
import TagChip from './TagChip.vue'

defineProps<{
  title: string
  href: string
  /** Pre-formatted; formatting happens at build time, not in the browser. */
  date: string
  dateISO: string
  tags: readonly string[]
  icon: string
}>()
</script>

<template>
  <article
    class="group flex items-start justify-between gap-4 py-2.5 sm:gap-8"
  >
    <div class="flex min-w-0 items-start gap-3">
      <span
        class="mt-0.5 shrink-0 text-lg leading-none select-none"
        aria-hidden="true"
        >{{ icon }}</span
      >

      <div class="min-w-0">
        <h3 class="text-base leading-snug font-semibold">
          <a
            :href="href"
            class="text-ink-strong no-underline transition-colors group-hover:text-accent"
            >{{ title }}</a
          >
        </h3>
        <time :datetime="dateISO" class="mono-meta text-ink-muted">{{
          date
        }}</time>
      </div>
    </div>

    <ul
      v-if="tags.length"
      class="hidden max-w-[45%] shrink-0 flex-wrap justify-end gap-1 sm:flex"
    >
      <li v-for="tag in tags" :key="tag">
        <TagChip :tag="tag" :href="`/tags/${tag}/`" />
      </li>
    </ul>
  </article>
</template>
