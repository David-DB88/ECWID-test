<script setup lang="ts">
import type { Product } from '@/api/ecwid'
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const props = defineProps<{
    product: Product
  }>()

const addToCart = (product: Product) => {
    cartStore.addItem(product)
  }

const quantity = computed(() => cartStore.getItemQuantity(props.product.id));
const increase = () => cartStore.increaseQuantity(props.product.id);
const decrease = () => cartStore.decreaseQuantity(props.product.id);
</script>

<template>
  <div>
     <div v-if="quantity > 0" class="quantity-controls">
        <button class="quantity-btn" @click.stop="decrease">-</button>
        <span class="quantity">{{ quantity }}</span>
        <button class="quantity-btn" @click.stop="increase">+</button>
      </div>
      <button v-else class="add-to-cart" @click="addToCart(product)">
        Add to Cart
      </button>
  </div>
</template>

<style lang="scss" scoped>
  .add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background-color: $primary-color;
    color: white;
    margin-top: auto;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: adjust($primary-color, 10%);
    }
  }

  .quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid $primary-color;
  border-radius: 4px;
  background: white;
  color: $primary-color;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: $primary-color;
    color: white;
  }
}

.quantity {
  min-width: 20px;
  text-align: center;
}
</style>
