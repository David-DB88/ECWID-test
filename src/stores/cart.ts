import { defineStore } from 'pinia';
import type { Product } from '@/api/ecwid';

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    addItem(product: Product) {
      const existing = this.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
      this.saveToLocalStorage();
    },
    removeItem(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('cart');
      if (saved) this.items = JSON.parse(saved);
    },

    increaseQuantity(productId: number) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity++;
        this.saveToLocalStorage();
      }
    },

    decreaseQuantity(productId: number) {
      const itemIndex = this.items.findIndex(item => item.product.id === productId);
      if (itemIndex !== -1) {
        if (this.items[itemIndex].quantity > 1) {
          this.items[itemIndex].quantity--;
        } else {
          this.items.splice(itemIndex, 1);
        }
        this.saveToLocalStorage();
      }
    },


  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    getItemQuantity: (state) => (productId: number) => {
      return state.items.find(item => item.product.id === productId)?.quantity || 0;
    }
  }
});
