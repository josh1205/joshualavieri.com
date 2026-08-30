<script setup lang="ts">
// Rendered statically. `html` is trusted authored content from src/data,
// not user input — it carries the inline links in each timeline entry.
defineProps<{
  entries: readonly { range: string; html: string }[]
}>()
</script>

<template>
  <dl class="space-y-5">
    <div
      v-for="entry in entries"
      :key="entry.range"
      class="grid gap-x-4 gap-y-1 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
    >
      <dt class="mono-meta pt-1 text-ink-muted">{{ entry.range }}</dt>
      <dd class="leading-relaxed text-[1rem]" v-html="entry.html" />
    </div>
  </dl>
</template>
