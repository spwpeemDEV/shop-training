<template>
  <v-app-bar color="primary">
    <v-app-bar-title @click="goToHome()" class="text_header">My Shop</v-app-bar-title>
    <v-spacer />

    <!-- Cart Button -->
    <v-btn text size="x-large" @click="goToCart()" class="mr-2">
      <span class="mdi mdi-cart-arrow-down" style="font-size: 36px">
        <span class="cart_sum" v-if="totalItems > 0">{{ totalItems }}</span>
      </span>
    </v-btn>

    <!-- Profile Menu -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon size="large" v-bind="props">
          <v-avatar size="40" color="secondary">
            <span class="mdi mdi-account" style="font-size: 24px"></span>
          </v-avatar>
        </v-btn>
      </template>

      <v-list min-width="200">
        <v-list-item @click="goToProfile()">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>โปรไฟล์</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item @click="logout()" class="logout-item">
          <template v-slot:prepend>
            <v-icon color="red">mdi-logout</v-icon>
          </template>
          <v-list-item-title class="text-red">ออกจากระบบ</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { cart } from "@/plugins/stores/cart";
import { useAuthStore } from "@/plugins/stores/auth";

const router = useRouter();
const cartStore = cart();
const authStore = useAuthStore();

function goToHome() {
  router.push(`/`);
}

function goToCart() {
  router.push(`/shopping_cart`);
}

function goToProfile() {
  router.push(`/profile`);
}

function goToSettings() {
  router.push(`/settings`);
}

function logout() {
  authStore.logout();
  router.push("/login");
}

const totalItems = computed(() => cartStore.items.length);
</script>

<style scoped>
.text_header {
  cursor: pointer;
}

.cart_sum {
  background-color: red;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  position: absolute;
  right: -8px;
  top: -8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.logout-item:hover {
  background-color: rgba(255, 0, 0, 0.1);
}

.text-red {
  color: red;
}
</style>
