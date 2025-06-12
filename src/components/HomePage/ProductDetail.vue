<template>
  <v-row>
    <v-col cols="8" style="text-align: center;">
      รูป
    </v-col>
    <v-col cols="4">
      ข้อความ
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
defineProps<{
  product: {
    id: number
    name: string
    price: number
    image: string
  } | null
}>()
</script>

<style>

</style>
