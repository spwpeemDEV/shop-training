<template>

    <v-app-bar color="primary">
      <v-app-bar-title>My Shop</v-app-bar-title>
      <v-spacer />
      <v-btn text size="x-large" @click="goToCart()"
        ><span class="cart_sum">1</span>
          <span class="mdi mdi-cart-arrow-down" style="font-size: 40px;"></span>
    </v-btn>
    </v-app-bar>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goToCart() {
  router.push(`/shopping_cart`);
}
</script>

<style scoped>
.cart_sum{
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
