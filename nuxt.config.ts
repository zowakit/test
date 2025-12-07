// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Server-side environment variables (Hidden from browser)
  runtimeConfig: {
    wooUrl: '',    // NUXT_WOO_URL
    wooKey: '',    // NUXT_WOO_KEY
    wooSecret: '', // NUXT_WOO_SECRET
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