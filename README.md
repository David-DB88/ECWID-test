# Ecwid Store Demo

[![Vue 3](https://img.shields.io/badge/Vue-3.5.13-4FC08D.svg?logo=vuedotjs)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0.1-FFD02F.svg?logo=pinia)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.5.0-4FC08D.svg)](https://router.vuejs.org/)

Vue 3 e-commerce demo application integrated with Ecwid REST API.

![Category List](./screen1.jpg)
![Shopping Cart](./screen2.png)

## Features

- 🛒 **Shopping Cart**:
  - Add/remove products
  - Quantity adjustment
  - Local storage persistence
  - Total price calculation

- 🗂 **Product Catalog**:
  - Hierarchical categories
  - Product details page
  - Responsive grid layout

- 🔄 **API Integration**:
  - Real-time data fetching
  - Error handling
  - Caching strategies

- ⚙️ **Dev Experience**:
  - TypeScript support
  - ESLint + Prettier
  - Vite optimized builds

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: SCSS
- **Linting**: ESLint + Prettier

## Project Structure
src/
├── api/           # API services (EcwidClient.ts)
├── assets/        # Images & fonts
├── components/    # Reusable UI components
│   └── CartIcon.vue
├── router/        # Navigation configuration
├── stores/        # Pinia state management
│   └── cart.ts    # Cart store logic
├── styles/        # Global SCSS styles
├── views/         # Page components
│   ├── CartView.vue
│   ├── CategoryView.vue
│   ├── HomeView.vue
│   └── ProductView.vue
├── App.vue        # Root component
└── main.ts        # Application entry


## Installation
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run type checker
npm run type-check

## Environment Setup
1. Create `.env` file in project root
2. Use following template:
```ini
VITE_STORE_ID=108362264
VITE_API_TOKEN=public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs

