<template>
  <v-app-bar color="primary">
    <v-app-bar-title>My Shop</v-app-bar-title>
    <v-spacer />

    <v-badge :content="totalItems" color="red" overlap v-if="totalItems > 0">
      <v-btn text size="x-large" @click="goToCart()">
        <span class="mdi mdi-cart-arrow-down"></span>
      </v-btn>
    </v-badge>

    <v-btn v-else text size="x-large" @click="goToCart()">
      <span class="mdi mdi-cart-arrow-down"></span>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { cart } from "@/plugins/stores/cart";

const router = useRouter();
const cartStore = cart();

function goToCart() {
  router.push(`/shopping_cart`);
}
const totalItems = computed(() => cartStore.items.length);
</script>

<style scoped>
.cart_sum {
  background-color: red;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  position: absolute;
  right: 56px;
  top: 24px;
  font-size: 18px;
}
</style>
