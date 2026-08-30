<script setup lang="ts">
import { ref, onMounted } from 'vue'

// The only component on the site that ships JavaScript.
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  isDark.value = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button
    type="button"
    class="grid size-[34px] shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-tag hover:text-ink-strong"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <!-- Material Symbols ligatures; the font is a self-hosted subset. -->
    <span
      class="material-symbols-outlined block leading-none"
      style="font-size:20px"
      aria-hidden="true"
      >{{ isDark ? 'light_mode' : 'dark_mode' }}</span
    >
  </button>
</template>
