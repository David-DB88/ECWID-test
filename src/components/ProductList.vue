<script setup lang="ts">
  import ProductCard from './ProductCard .vue';
  import { useEcwidStore } from '@/stores/ecwid'
  import { computed } from 'vue';

const ecwidStore = useEcwidStore()
const products = computed(() => ecwidStore.products);
</script>

<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card" >
      <ProductCard  :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-list {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .product-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
</style>
