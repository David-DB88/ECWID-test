<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import BaskectIcon from './Icons/BasketIcon.vue'


  const router = useRouter()
  const cartStore = useCartStore()
  const { totalItems } = storeToRefs(cartStore)

  onMounted(() => {
    cartStore.loadFromLocalStorage();
  });

  const navigateToCart = () => {
    router.push('/cart')
  }

</script>

<template>
  <div class="cart-icon">
    <button class="cart-button" aria-label="Shopping Cart" @click="navigateToCart">
      <BaskectIcon />
      <span v-if="totalItems > 0" class="badge">{{ totalItems }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .cart-icon {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .cart-button {
    position: relative;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .cart-svg {
    width: 32px;
    height: 32px;
    fill: #2c3e50;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #e74c3c;
    color: white;
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
