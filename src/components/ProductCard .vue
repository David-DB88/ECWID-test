<script setup lang="ts">
import type { Product } from '@/api/ecwid'
import ButtonAddToCart from './ButtonAddToCart.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  product: Product
}>()

</script>

<template>
  <article class="product-card">
        <img
          :src="product.thumbnailUrl || '/placeholder-product.webp'"
          :srcset="`
            ${product.thumbnailUrl}?size=400w 400w,
            ${product.imageUrl}?size=800w 800w
          `"
          sizes="(max-width: 600px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
          :alt="product.name"
          class="product-image"
          @click="router.push(`/product/${product.id}`)"
        >

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
      <ButtonAddToCart :product="product" class="add-to-cart-btn" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
}



.product-image {
  width: 100%;
  object-fit: contain;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
}

.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: $primary-color;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  margin-top: auto;
  width: 100%;
}

@media (max-width: $breakpoint-md) {
  .image-container {
    padding-bottom: 100%;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 1rem;
  }
}
</style>
