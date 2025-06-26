<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastStack from './components/ToastStack.vue'

import { useToastStore } from '@/stores/toast'
const store = useToastStore()
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex justify-center">
    <div class="container bg-gray-50 py-8 px-4">
      <RouterView />
      <ToastStack :toasts="store.toasts" />
    </div>
  </div>
</template>

<style scoped lang="ts"></style>
