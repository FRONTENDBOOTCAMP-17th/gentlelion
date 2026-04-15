import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

function injectFavicon() {
  return {
    name: "inject-favicon",
    transformIndexHtml(html) {
      return html.replace(
        /<\/head>/i,
        `  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>`
      );
    },
  };
}

const root = resolve(__dirname)

export default defineConfig({
  plugins: [
    tailwindcss(),
    injectFavicon()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        // pages
        sunglasses: resolve(root, 'pages/sunglasses.html'),
        glasses: resolve(root, 'pages/glasses.html'),
        collection: resolve(root, 'pages/collection.html'),
        productDetail: resolve(root, 'pages/product-detail.html'),
        // components - login
        login: resolve(root, 'components/login/login.html'),
        register: resolve(root, 'components/login/register.html'),
        privacy: resolve(root, 'components/login/privacy.html'),
        terms: resolve(root, 'components/login/terms.html'),
        // components - cart
        cart: resolve(root, 'components/cart/cart.html'),
        cartCard: resolve(root, 'components/cart/cartCard.html'),
        cartNavigation: resolve(root, 'components/cart/cartNavigation.html'),
        emptyCart: resolve(root, 'components/cart/emptyCart.html'),
        // components - profile
        profile: resolve(root, 'components/profile/profile.html'),
        wishList: resolve(root, 'components/profile/wishList.html'),
        orderDetails: resolve(root, 'components/profile/orderDetails.html'),
        buyProduct: resolve(root, 'components/profile/buyProduct.html'),
        // components - order
        orderPage: resolve(root, 'components/order/order.html'),
        orderCard: resolve(root, 'components/order/orderCard.html'),
        orderNavigation: resolve(root, 'components/order/orderNavigation.html'),
        orderListCard: resolve(root, 'components/orderList/orderListCard.html'),
        // components - product
        productInfo: resolve(root, 'components/product-detail/productInfo.html'),
        similarSection: resolve(root, 'components/product-detail/similarSection.html'),
        productCard: resolve(root, 'components/productCard/productCard.html'),
        cardLayout: resolve(root, 'components/productCard/cardLayout.html'),
        moreButton: resolve(root, 'components/productCard/moreButton.html'),
        // components - etc
        header: resolve(root, 'components/header/header.html'),
        footer: resolve(root, 'components/footer/footer.html'),
        accordion: resolve(root, 'components/accordion/accordion.html'),
      }
    }
  }
})