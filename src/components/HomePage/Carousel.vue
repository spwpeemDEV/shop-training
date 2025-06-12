<template>
  <v-container>
    <v-carousel height="400">
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide"
        cover
      />
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slides = ref<string[]>([
  'https://images.unsplash.com/photo-1600185365888-c602d7b7c51e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600180758890-6c3c6f6b729b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600185365581-ec59aa5d15d3?auto=format&fit=crop&w=800&q=80',
])
</script>
