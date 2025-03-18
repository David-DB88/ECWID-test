<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Category } from '@/api/ecwid';
import { useEcwidStore } from '@/stores/ecwid'
import { computed } from 'vue';

const router = useRouter();
const ecwidStore = useEcwidStore()

const categories = computed(() => ecwidStore.categories);


const openCategory = (category: Category) => {
  router.push({
    name: 'category',
    params: {
      categoryId: category.id,
    },
    state: {
      categoryName: category.name
    }
  });
};
</script>

<template>
  <div class="category-list">
    <div
      v-for="category in categories"
      :key="category.id"
      class="category-card"
      @click="openCategory(category)"
    >
      <div class="category-info">
        <h3 class="category-name">{{ category.name }}</h3>
        <span class="product-count">
          {{ category.productCount || 0 }} items
        </span>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.category-tree {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.category-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}



.category-info {
  flex: 1;
}

.category-name {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.product-count {
  font-size: 0.9rem;
  color: #666;
}
</style>
