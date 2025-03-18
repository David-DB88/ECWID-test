<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useEcwidStore } from '@/stores/ecwid'
  import CategoryList from '@/components/CategoryList.vue'
  import ProductList from '@/components/ProductList.vue'

  const route = useRoute()
  const ecwidStore = useEcwidStore()

const categoryId = computed(() => Number(route.params.categoryId) || null)

  const loadData = () => {

    if (categoryId.value) {
      ecwidStore.loadCategoryProducts(categoryId.value)
    } else {
      ecwidStore.loadInitialData()
    }
  }

  const retryLoading = () => {
    ecwidStore.error = null
    loadData()
  }

  onMounted(loadData)
</script>

<template>
    <div v-if="ecwidStore.error" class="error-message">
      {{ ecwidStore.error }}
      <button @click="retryLoading">Retry</button>
    </div>

    <div class="page-container">
    <div v-if="ecwidStore.isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>

    <template v-else>
          <div class="content-section">
        <CategoryList  />
        </div>
        <div class="content-section">
        <ProductList />
      </div>
    </template>
  </div>
</template>



<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
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
  }



  .error-message {
    padding: 1rem;
    background: #ffebee;
    color: #b71c1c;
    border-radius: 4px;
    margin: 1rem;
    text-align: center;

    button {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      background: #b71c1c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .content-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
