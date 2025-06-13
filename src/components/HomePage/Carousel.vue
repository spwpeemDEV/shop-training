<template>
  <v-container>
    <v-carousel
      height="400"
      cycle
      interval="3000"
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
  {id: 1, src: 'https://static.nike.com/a/images/w_1280,q_auto,f_auto/eefe97c3-1b38-4e84-b85b-5fd2fe52751c/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7-air-jordan-5-grape-hq7978-100.jpg'},
  {id: 2, src: 'https://d2cva83hdk3bwc.cloudfront.net/adidas-originals-superstar-cloud-white-1.jpg'},
  {id: 3, src: 'https://assets.central.co.th//adobe/dynamicmedia/deliver/dm-aid--859a5650-8cdb-4590-9a58-2ba1d221ed94/converse-kidschucktaylorallstarsneakerscvk3j231cblk-cds89775424-1.jpg?preferwebp=true&quality=60&width=550'},
])
</script>
