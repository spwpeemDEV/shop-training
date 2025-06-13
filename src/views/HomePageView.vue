<template>
  <Carousel />
  <Product :products="products" />
</template>

<script setup lang="ts">
import Carousel from "@/components/HomePage/Carousel.vue";
import Product from "@/components/HomePage/Product.vue";
import productService, { type ProductType } from "@/services/api/features/product";


const products = ref<ProductType[]>([]);

onMounted(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await productService.getAll<ProductType[]>();
    products.value = response || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
</script>

<style lang="scss" scoped></style>
