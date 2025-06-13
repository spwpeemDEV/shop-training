<template>
  <v-container>
    <v-row v-if="isLoading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="product">
      <v-col cols="8" style="text-align: center">
        <v-img :src="product.image" height="400px" style="margin: 16px" />
      </v-col>
      <v-col cols="4" style="display: flex; flex-direction: column; justify-content: space-around">
        <p><strong>ชื่อ:</strong> {{ product.title }}</p>
        <p><strong>ราคา:</strong> {{ product.price }} บาท</p>
        <p><strong>รายละเอียด:</strong> {{ product.description }}</p>
        <v-btn color="primary" @click="addToCart">เพิ่มเข้าตะกร้า</v-btn>
      </v-col>
    </v-row>

    <div v-else>
      <p>ไม่พบข้อมูลสินค้า</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import productService from "@/services/api/features/product";
import { cart } from "@/plugins/stores/cart";

const route = useRoute();
const product = ref<any>(null);
const isLoading = ref(false);

const cartStore = cart();

onMounted(async () => {
  const idParam = route.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  isLoading.value = true;
  try {
    product.value = await productService.getById(id);
  } catch (error) {
    console.error("Error loading product:", error);
  } finally {
    isLoading.value = false;
  }
});

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
}
</script>
