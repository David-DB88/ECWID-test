import { defineStore } from 'pinia';
import { EcwidService, type Category, type Product } from '@/api/ecwid';

interface EcwidState {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  categoriesMap: Record<number, Category>;
}

export const useEcwidStore = defineStore('ecwid', {
  state: (): EcwidState => ({
    categories: [],
    products: [],
    isLoading: false,
    error: null,
    categoriesMap: {}
  }),
  actions: {



    async loadInitialData() {
      try {
        this.isLoading = true;
        const [categories, products] = await Promise.all([
          EcwidService.getCategories(),
          EcwidService.getProducts({ limit: 20 })
        ]);

        categories.forEach(cat => {
          this.categoriesMap[cat.id] = cat;
        });

        this.categories = categories;
        this.products = products;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
      } finally {
        this.isLoading = false;
      }
    },

    async loadCategoryDetails(categoryId: number) {
      try {
        this.isLoading = true;
        const category = await EcwidService.getCategoryDetails(categoryId);
        this.categoriesMap[category.id] = category;
        this.categories.push(category);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async loadCategoryProducts(categoryId: number) {
      try {
        this.isLoading = true;
        this.products = await EcwidService.getProducts({
          category: categoryId
        });
      } catch (error) {
        this.error = error instanceof Error
        ? error.message
        : 'Failed to load products';
      } finally {
        this.isLoading = false;
      }
    },

    getCategoryName(categoryId: number): string {
      return this.categoriesMap[categoryId]?.name || '';
    },

    handleError(error: unknown) {
      this.error = error instanceof Error
        ? error.message
        : 'Unknown error occurred';
    },
    clearError() {
      this.error = null;
    },
  },
});
