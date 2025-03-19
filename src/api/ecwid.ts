import axios from 'axios'

const STORE_ID = import.meta.env.VITE_STORE_ID
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const API_VERSION = 'v3';
const BASE_URL = `https://app.ecwid.com/api/${API_VERSION}/${STORE_ID}`

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
})

export interface Category {
  id: number;
  name: string;
  thumbnailUrl?: string;
  parentId?: number;
  productCount?: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnailUrl?: string;
  imageUrl?: string;
  originalImageUrl?: string;
  description?: string;
  originalImage?: OrgImage
  categoryIds?: number[];
  sku?: string;
  createdAt?: string;
}

export interface OrgImage {
  height: number,
  url: string,
  width: number
}
export const EcwidService = {
  async getCategories(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Category[]> {
    try {
      const response = await api.get('/categories', { params });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to load categories');
    }
  },

  async getCategoryDetails(categoryId: number): Promise<Category> {
    try {
      const response = await api.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category details:', error);
      throw new Error('Failed to load category details');
    }
  },

  async getProducts(params: {
    category?: number;
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    try {
      const response = await api.get('/products', { params });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to load products');
    }
  },

  async getProductDetails(productId: number): Promise<Product> {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw new Error('Failed to load product details');
    }
  },

}
