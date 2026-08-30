<script setup lang="ts">
defineProps<{ tag: string; href?: string }>()
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    class="mono-meta inline-block rounded bg-tag px-1.5 py-0.5 whitespace-nowrap text-ink-muted no-underline transition-colors"
    :class="href ? 'hover:bg-tag-hover hover:text-ink-strong' : ''"
    >#{{ tag }}</component
  >
</template>
