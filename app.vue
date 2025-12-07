<template>
  <div>
    <h1>Store Categories</h1>
    
    <div v-if="pending">Loading categories...</div>

    <div v-else-if="error" style="color: red;">
      Error loading data: {{ error.message }}
    </div>

    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        <strong>{{ category.name }}</strong> ({{ category.count }} products)
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: number;
  name: string;
  count: number;
}

// We use useFetch which is SSR-friendly.
// It runs on the server first, then hydrates on the client.
const { data: categories, pending, error } = await useFetch<Category[]>('/api/categories', {
  lazy: false, // Wait for data before rendering (better for SEO)
  transform: (data) => {
    // Optional: Log here to see it in the browser console
    console.log('WooCommerce Categories:', data);
    return data;
  }
});
</script>