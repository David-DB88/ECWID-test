<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { EcwidService, type Product } from '@/api/ecwid'
  import ButtonAddToCart from '@/components/ButtonAddToCart.vue'
  import DOMPurify from 'dompurify';

  const route = useRoute()
  const product = ref<Product | null>(null)

  onMounted(async () => {
    const productId = Number(route.params.id)
    product.value = await EcwidService.getProductDetails(productId)
  })

const cleanHtml = computed(() => {
  return DOMPurify.sanitize(product.value?.description?? "", { ALLOWED_TAGS: ["p","\n","\t", "strong", "br", "div"] });
});
</script>

<template>
  <div class="product-view">
    <div v-if="product" class="product-details">
      <div class="image-container">
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
    >
      </div>
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-description" v-html="cleanHtml"></p>
        <p class="product-price">${{ product.price }}</p>
        <ButtonAddToCart :product="product" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-view {
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .product-details {
    display: grid;
    gap: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @media (min-width: $breakpoint-md) {
      grid-template-columns: minmax(300px, 1fr) 1fr;
    }
  }
  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    aspect-ratio: 3/4;

    &::after {
      content: "";
      display: block;
    }
  }
  .product-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    top: 0;
    left: 0;
  }


  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
  }

  .product-title {
    font-size: 2rem;
    color: $secondary-color;
  }

  .product-description {
    line-height: 1.6;
    color: adjust($text-color, 20%);
  }

  .product-price {
    font-size: 1.5rem;
    color: $primary-color;
    font-weight: bold;
  }

  .add-to-cart {
    align-self: flex-start;
    padding: 1rem 2rem;
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
