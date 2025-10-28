<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <router-link to="/" class="inline-block">
    <img :src="logoImg" alt="Krause Net Logo" :style="{ height: size + 'px', width: 'auto' }" />
  </router-link>
</template>

<script setup lang="ts">
import logoImg from '@/assets/images/logo.png'

interface Props {
  size?: number
}

const props = defineProps<Props>()
const size = props.size ?? 64 // default 64px (equiv. a h-16)
</script>

<style scoped>
img {
  transition: transform 0.2s ease-in-out;
}
img:hover {
  transform: scale(1.01);
}
</style>
