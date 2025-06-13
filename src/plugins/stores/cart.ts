import { defineStore } from 'pinia';

export const cart = defineStore('cart', {
  state: () => ({
    items: [] as Array<{ product: any; quantity: number }>,
  }),
  actions: {
    addToCart(product: any) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter(item => item.product.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
  },
    persist: true,  
});
