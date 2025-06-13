<template>
  <v-container>
    <v-carousel
      height="400"
      cycle
      interval="3000"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="slide in slides"
        :key="slide.id"
      >
        <v-img :src="slide.src"></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">


const slides = ref([
  {id: 1, src: 'https://cms.dmpcdn.com/women/2022/11/10/79c26540-60ba-11ed-b96a-5f02381e8ebb_webp_original.jpg'},
  {id: 2, src: 'https://cms.dmpcdn.com/women/2022/11/10/78233430-60ba-11ed-ad34-73b808ab9d71_webp_original.jpg'},
  {id: 3, src: 'https://cms.dmpcdn.com/women/2022/11/10/79886980-60ba-11ed-8a7e-c1297aa48775_webp_original.jpg'},
])
</script>
