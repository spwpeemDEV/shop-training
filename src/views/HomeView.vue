<template>
  <div>Token: {{ authStore.token }}</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/plugins/stores/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
