<template>
  <v-footer color="primary" dark class="custom-footer">
  <v-col class="text-center text-white">
    © {{ new Date().getFullYear() }} - My Shop
  </v-col>
</v-footer>
</template>

<script setup lang="ts">
// ไม่มี logic ใน footer ตอนนี้
</script>

<style scoped>
.custom-footer {
  height: 20px !important;
  min-height: 40px;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
