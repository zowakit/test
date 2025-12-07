// server/api/categories.get.ts
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // 1. Check if keys exist
  if (!config.wooUrl || !config.wooKey) {
    throw createError({ statusCode: 500, statusMessage: 'WooCommerce configuration missing' });
  }

  // 2. Create the Authorization Header (Basic Auth)
  // Format: "Basic base64(consumer_key:consumer_secret)"
  const authHeader = 'Basic ' + Buffer.from(`${config.wooKey}:${config.wooSecret}`).toString('base64');

  try {
    // 3. Fetch from WooCommerce (Server to Server)
    const data = await $fetch(`${config.wooUrl}/products/categories`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
      params: {
        per_page: 20,
        hide_empty: true // Only show categories with products
      }
    });

    return data;

  } catch (error) {
    console.error('Woo API Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories from WooCommerce',
    });
  }
});