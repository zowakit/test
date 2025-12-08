// server/api/categories.get.ts

import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Configuration Check
  if (!config.wooUrl || !config.wooKey || !config.wooSecret) {
    throw createError({ statusCode: 500, statusMessage: 'WooCommerce configuration missing' });
  }

  // Create the Authorization Header
// Keys: ck_2884c61de41c1a2dc899f4062e82518df31b24c5, cs_2826ef6b486d1132e068362dcb90fded412a1cd6 [cite: 1]
  const authHeader = 'Basic ' + Buffer.from(`${config.wooKey}:${config.wooSecret}`).toString('base64');

  try {
    // Fetch from WooCommerce (Server to Server Proxy)
    const data = await $fetch(`${config.wooUrl}/products/categories`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
      params: {
        // --- ADDED FOR POLYLANG SUPPORT ---
        lang: 'en', 
        // ---------------------------------
        per_page: 100,
        hide_empty: false 
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