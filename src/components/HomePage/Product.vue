<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card @click="goToDetail(product.id)">
          <v-img :src="product.image" height="200" cover></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-subtitle>ราคา: {{ product.price }} บาท</v-card-subtitle>

          <v-card-actions>
            <v-btn color="primary"> ดูรายละเอียด </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <!-- <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>{{ selectedProduct?.name }}</v-card-title>
        <v-img :src="selectedProduct?.image" height="200" cover />
        <v-card-text>
          ราคา: {{ selectedProduct?.price }} บาท
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ products: any[] }>()
const router = useRouter()

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
// const dialog = ref(false)
// const selectedProduct = ref<any | null>(null)

// function openDialog(product: any) {
//   selectedProduct.value = product
//   dialog.value = true
// }

const products = ref<Product[]>([
  {
    id: 1,
    name: "เสื้อยืดสีขาว",
    price: 250,
    image: "https://via.placeholder.com/400x200?text=เสื้อยืด",
  },
  {
    id: 2,
    name: "รองเท้าผ้าใบ",
    price: 1200,
    image: "https://via.placeholder.com/400x200?text=รองเท้า",
  },
  {
    id: 3,
    name: "กระเป๋าสะพาย",
    price: 800,
    image: "https://via.placeholder.com/400x200?text=กระเป๋า",
  },
]);

function goToDetail(product: any) {
  router.push({
    name: 'ProductDetail',
    params: { id: product.id },
    state: { product }, // ✅ ส่งทั้ง object
  })
}

// function goToDetail(productId: number) {
//   router.push(`/product/${productId}`)
// }


</script>

<style lang="scss" scoped>
.hover-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}
.hover-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
