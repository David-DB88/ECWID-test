<script setup lang="ts">
import type { Product } from '@/api/ecwid'
import ButtonAddToCart from './ButtonAddToCart.vue';

 defineProps<{
    product: Product
  }>()



</script>

<template>
  <div class="product-content">
    <img
      :src="product.thumbnailUrl || '/placeholder-product.png'"
      class="product-image"
      @click="$router.push(`/product/${product.id}`)"
    />
    <div class="product-info">
      <div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
      </div>
      <ButtonAddToCart :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-content {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: 100%;
  min-height: 0
}
  .product-image {
    width: 100%;
    height: 450px;
    aspect-ratio: 4/3;
    object-fit: cover;
    flex-shrink: 0;
    cursor: pointer;
  }

  .product-info {
    flex-grow: 1;
    padding: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
  }

  .product-name {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .product-price {
    color: $primary-color;
    font-weight: bold;
    margin-bottom: 1rem;
  }


</style>
