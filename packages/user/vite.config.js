import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

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

export default defineConfig({
  plugins: [
    tailwindcss(),
    injectFavicon()
  ],
})