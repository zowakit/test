// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Server-side environment variables (Hidden from browser)
  runtimeConfig: {
    wooUrl: 'https://wordpress-mssxm.wasmer.app/wp-json/wc/v3',    // NUXT_WOO_URL
    wooKey: 'ck_2884c61de41c1a2dc899f4062e82518df31b24c5',    // NUXT_WOO_KEY
    wooSecret: 'cs_2826ef6b486d1132e068362dcb90fded412a1cd6', // NUXT_WOO_SECRET
    public: {
      siteName: 'My Awesome Store' // Public variables
    }
  },

  // Optimized for Cloudflare Pages
  nitro: {
    preset: 'cloudflare-pages',
    // Cache rules: Cache API responses for 1 hour (3600s) to reduce load on WordPress
    routeRules: {
      '/api/**': { swr: 3600 } 
    }
  },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt']
});