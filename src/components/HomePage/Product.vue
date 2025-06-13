<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Input ค้นหา -->
        <v-text-field
          v-model="searchQuery"
          label="ค้นหาสินค้า"
          prepend-inner-icon="mdi-magnify"
          clearable
          @click:clear="searchQuery = ''"
        ></v-text-field>
      </v-col>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="hover-card" style="height: 400px">
          <v-img :src="product.image" style="height: 260px"></v-img>

          <v-card-title>{{ product.title }}</v-card-title>

          <v-card-subtitle>ราคา: {{ product.price }} บาท</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" variant="outlined" size="small" @click="goToDetail(product)">
              ดูรายละเอียด
            </v-btn>
            <v-btn
              class="ml-auto"
              color="orange"
              size="small"
              variant="tonal"
              @click="addToCart(product)"
            >
              <v-icon>mdi-cart</v-icon>
              เพิ่มลงในตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { cart } from "@/plugins/stores/cart";

const cartStore = cart();
const props = defineProps<{ products: any[] }>();
const router = useRouter();

const searchQuery = ref("");

const filteredProducts = computed(() =>
  props.products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function goToDetail(product: any) {
  router.push({
    name: "ProductDetail",
    params: { id: product.id },
  });
}

function addToCart(product: any) {
  cartStore.addToCart(product);
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
