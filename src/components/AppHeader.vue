<template>
  <v-app style="height: 10vh !important">
    <v-app-bar app color="primary">
      <v-app-bar-title>My Shop</v-app-bar-title>
      <v-spacer />
      <v-btn text size="x-large" @click="goToCart()"
        ><span class="mdi mdi-cart-arrow-down"></span
      ></v-btn>
    </v-app-bar>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goToCart() {
  router.push(`/shopping_cart`);
}
</script>
