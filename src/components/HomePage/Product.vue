<template>
  <v-container>
    <v-row>
      <v-col v-for="product in props.products" :key="product.id" cols="12" sm="6" md="4">
        <v-card @click="goToDetail(product)">
          <v-img :src="product.image" cover></v-img>

          <v-card-title>{{ product.title }}</v-card-title>

          <v-card-subtitle>ราคา: {{ product.price }} บาท</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary"> ดูรายละเอียด </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ products: any[] }>();
const router = useRouter();

function goToDetail(product: any) {
  router.push({
    name: "ProductDetail",
    params: { id: product.id },
  });
}
</script>
