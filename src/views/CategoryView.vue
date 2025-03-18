<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useEcwidStore } from '@/stores/ecwid';
import ProductList from '@/components/ProductList.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

const route = useRoute();
const ecwidStore = useEcwidStore();

const categoryId = computed(() => {
  const id = route.params.categoryId;
  return typeof id === 'string' ? parseInt(id, 10) : 0;
});

const loadCategoryProducts = async (id: number) => {
  try {
    await ecwidStore.loadCategoryProducts(id);
  } catch (error) {
    console.error('Error loading category:', error);
  }
};

watch(
  categoryId,
  (newVal) => {
    if (newVal > 0) {
      loadCategoryProducts(newVal);
    }
  },
  { immediate: true }
);



const retryLoading = () => {
  ecwidStore.clearError();
  loadCategoryProducts(categoryId.value);
};

const categoryProducts = computed(() => ecwidStore.products);
</script>

<template>
  <div class="category-view">
    <div v-if="ecwidStore.error" class="error-message">
          <h3>Error loading category</h3>
          <p>{{ ecwidStore.error }}</p>
          <button @click="retryLoading">Try Again</button>
    </div>
    <div v-if="ecwidStore.isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>

    <template v-else>
      <Breadcrumbs />
        <div class="products-section">
          <h2>Products</h2>
          <ProductList :products="categoryProducts" />
        </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.category-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.error-message {
  padding: 2rem;
  text-align: center;
  background: #ffebee;
  border-radius: 8px;
  margin: 2rem;
  color: #b71c1c;

  h3 {
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    background: #b71c1c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: adjust(#b71c1c, 10%);
    }
  }
}
.products-section{
  margin-top: 1rem;
}
</style>
