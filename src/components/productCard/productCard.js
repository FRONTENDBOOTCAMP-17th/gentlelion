import { wishlist } from "../wishlist/index.js";

export async function productCard(container, products) {
    const response = await fetch('/src/components/productCard/productCard.html');
    if (!response.ok) return;

    const html = await response.text();

    for (const product of products.data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const card = doc.body.firstElementChild;
        
        
        wishlist(product.id);

        card.querySelector(".product-name").textContent = product.name;
        card.querySelector(".product-price").textContent = "₩" + product.price.toLocaleString();
        if (product.inStock) {
            card.querySelector(".in-stock").classList.add("hidden");
        }

        container.appendChild(card);
    }
}