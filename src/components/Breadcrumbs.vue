<script setup lang="ts">
import { watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEcwidStore } from '@/stores/ecwid';
import { storeToRefs } from 'pinia';

const route = useRoute();
const ecwidStore = useEcwidStore();

interface BreadCrumb {
  name: string;
  path: string;
}
const { isLoading } = storeToRefs(ecwidStore);
const categoryId = computed(() => Number(route.params.categoryId) || null);

const crumbs = computed((): BreadCrumb[] => {
  const pathSegments: BreadCrumb[] = [];

  pathSegments.push({
    name: 'Home',
    path: '/'
  });

  if (categoryId.value) {
    const categoryName = ecwidStore.getCategoryName(categoryId.value);

    pathSegments.push({
      name: categoryName || `Category #`,
      path: `/category/${categoryId.value}`
    });
  }

  return pathSegments;
});


watchEffect(async () => {
  try {
    if (categoryId.value) {
      if (!ecwidStore.getCategoryName(categoryId.value)) {
        await ecwidStore.loadCategoryDetails(categoryId.value);
      }
    }
  } catch (error) {
    console.error('Error loading category for breadcrumbs:', error);
  }
});
</script>

<template>
  <nav v-if="crumbs.length > 0" class="breadcrumbs" >
    <router-link
      v-for="(crumb, index) in crumbs"
      :key="crumb.path"
      :to="crumb.path"
      class="crumb"
    >
      {{ crumb.name }}
      <span v-if="index < crumbs.length - 1" class="separator">/</span>
      <span v-if="isLoading" class="loading-indicator">...</span>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  padding: 1rem 0;
  font-size: 0.9rem;
}

.crumb {
  color: #42b983;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    color: #2c3e50;
    pointer-events: none;
  }
}

.separator {
  margin: 0 0.5rem;
  color: #666;
}
</style>
