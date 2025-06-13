<template>
  <v-container>
    <!-- Header -->
    <v-row class="mb-4">
      <v-col>
        <h2 class="text-h4 mb-2">ตะกร้าสินค้า</h2>
        <p class="text-grey-600">สินค้าในตะกร้า {{ cartStore.totalItems }} รายการ</p>
      </v-col>
    </v-row>

    <!-- Empty Cart -->
    <v-row v-if="cartStore.items.length === 0" justify="center">
      <v-col cols="12" class="text-center pa-8">
        <v-icon icon="mdi-cart-outline" size="60" class="text-grey-400 mb-4"></v-icon>
        <h3 class="mb-2">ตะกร้าสินค้าว่างเปล่า</h3>
        <v-btn color="primary" @click="$router.push('/')"> เลือกซื้อสินค้า </v-btn>
      </v-col>
    </v-row>

    <!-- Cart Items -->
    <v-row v-else>
      <v-col cols="12" md="8">
        <!-- Item List -->
        <v-card v-for="item in cartStore.items" :key="item.product.id" class="mb-3">
          <v-row no-gutters>
            <!-- Product Image -->
            <v-col cols="3" sm="2">
              <v-img :src="item.product.image" height="120" cover class="rounded-s"></v-img>
            </v-col>

            <!-- Product Info -->
            <v-col cols="6" sm="7" class="pa-3">
              <h4 class="text-h6 mb-1">{{ item.product.title }}</h4>
              <p class="text-body-2 text-grey-600 mb-2">
                ราคา: {{ item.product.price.toLocaleString() }} บาท
              </p>

              <!-- Quantity Controls -->
              <div class="d-flex align-center">
                <v-btn
                  icon="mdi-minus"
                  size="small"
                  variant="outlined"
                  @click="decreaseQuantity(item)"
                  :disabled="item.quantity <= 1"
                ></v-btn>
                <span class="mx-3">{{ item.quantity }}</span>
                <v-btn
                  icon="mdi-plus"
                  size="small"
                  variant="outlined"
                  @click="increaseQuantity(item)"
                ></v-btn>
              </div>
            </v-col>

            <!-- Price & Remove -->
            <v-col cols="3" sm="3" class="pa-3 text-right">
              <p class="text-h6 font-weight-bold mb-2">
                {{ (item.product.price * item.quantity).toLocaleString() }} บาท
              </p>
              <v-btn
                icon="mdi-delete"
                size="small"
                color="error"
                variant="text"
                @click="removeItem(item.product.id)"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Summary -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>สรุปคำสั่งซื้อ</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span>สินค้า ({{ cartStore.totalItems }} รายการ)</span>
              <span>{{ subtotal.toLocaleString() }} บาท</span>
            </div>

            <div class="d-flex justify-space-between mb-2">
              <span>ค่าจัดส่ง</span>
              <span>{{ shippingFee.toLocaleString() }} บาท</span>
            </div>

            <v-divider class="my-3"></v-divider>

            <div class="d-flex justify-space-between text-h6 font-weight-bold">
              <span>รวมทั้งหมด</span>
              <span>{{ total.toLocaleString() }} บาท</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="success" block size="large" @click="checkout"> สั่งซื้อ </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Continue Shopping -->
        <v-btn color="primary" variant="outlined" block class="mt-3" @click="$router.push('/')">
          เลือกซื้อสินค้าเพิ่ม
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { cart } from "@/plugins/stores/cart";

const cartStore = cart();

// Computed properties
const subtotal = computed(() => {
  return cartStore.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

const shippingFee = computed(() => {
  return subtotal.value >= 1000 ? 0 : 50;
});

const total = computed(() => {
  return subtotal.value + shippingFee.value;
});

// Methods
const increaseQuantity = (item: any) => {
  item.quantity++;
};

const decreaseQuantity = (item: any) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (productId: string) => {
  cartStore.removeFromCart(productId);
};

const checkout = () => {
  console.log("ดำเนินการสั่งซื้อ");
};

onMounted(() => {
  console.log("Cart items:", cartStore.items);
  console.log("Cart items:", cartStore.items.length);
});
</script>

<style lang="scss" scoped>
.v-card {
  overflow: hidden;
}
</style>
