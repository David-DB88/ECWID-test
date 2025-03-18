<script setup lang="ts">
import ButtonAddToCart from '@/components/ButtonAddToCart.vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const placeOrder = () => {
  alert('🎉 Thank you for your purchase!');
  cartStore.clearCart();
};
</script>

<template>
  <div class="cart-view">
    <div class="cart-container">
      <div>
        <button
            class="back-button"
            @click="$router.go(-1)"
          >
            ← Continue Shopping
        </button>
        <h1 class="cart-title">Your Cart</h1>
      </div>


      <div v-if="cartStore.items.length === 0" class="empty-cart">
        Your cart is empty
      </div>

      <div v-else>
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="cart-item"
        >
          <img
            :src="item.product.thumbnailUrl || '/placeholder-product.png'"
            class="item-image"
          >
          <div class="item-info">
            <h3 class="item-name">{{ item.product.name }}</h3>
            <div class="item-controls">
              <div class="item-count">
                <p class="item-price">${{ item.product.price }} ×</p> <ButtonAddToCart :product="item.product" />
              </div>
              <button
                class="remove-button"
                @click="cartStore.removeItem(item.product.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <p class="total-price">Total: ${{ cartStore.totalPrice.toFixed(2) }}</p>
          <button
            class="checkout-button"
            @click="placeOrder"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>

.cart-view {
  padding: 2rem 1rem;
}

.cart-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.back-button {
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: #f0f0f0;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
}
.cart-title {
  font-size: 2rem;
  color: $secondary-color;
  margin-bottom: 2rem;
  text-align: center;
}

.empty-cart {
  text-align: center;
  color: adjust($text-color, 40%);
  padding: 2rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.item-image {
  width: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-count {
  display: flex;
  align-items: center;
}

.item-price {
  color: $primary-color;
  font-weight: bold;
  padding-right: 5px;
}

.remove-button {
  color: #ff4444;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: adjust(#ff4444, 10%);
  }
}

.cart-summary {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
  text-align: right;
}

.total-price {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: $secondary-color;
}

.checkout-button {
  padding: 1rem 3rem;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: adjust($primary-color, 10%);
  }
}
</style>
