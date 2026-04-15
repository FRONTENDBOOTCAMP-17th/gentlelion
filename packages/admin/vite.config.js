import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

function injectFavicon() {
  return {
    name: 'inject-favicon',
    transformIndexHtml(html) {
      return html.replace(
        /<\/head>/i,
        `  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>`
      )
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), injectFavicon()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'pages/login.html'),
        dashboard: resolve(__dirname, 'pages/dashboard.html'),
        orders: resolve(__dirname, 'pages/orders.html'),
        orderDetails: resolve(__dirname, 'pages/order-details.html'),
        products: resolve(__dirname, 'pages/products.html'),
        productsAdd: resolve(__dirname, 'pages/productsAdd.html'),
        productEdit: resolve(__dirname, 'pages/productEdit.html'),
        users: resolve(__dirname, 'pages/users.html'),
        userDetails: resolve(__dirname, 'pages/user-details.html'),
        navigation: resolve(__dirname, 'pages/components/aside/navigation.html'),
      }
    }
  }
})
