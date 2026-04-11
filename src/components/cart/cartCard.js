import { delCartlist } from "../API/cart/delcartApi";
import { putCartApi } from "../API/cart/putCartApi";
import { emptyCart } from "./emptyCart.js";

export async function cartCard(token, container, data) {
    const response = await fetch('/src/components/cart/cartCard.html');
    if (!response.ok) return;

    const html = await response.text();

    for (const product of data.data.items) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const card = doc.body.firstElementChild;

        const img = card.querySelector(".cart-product-image");
        if (img) {
            img.src = product.imageUrl ?? 'https://storage.fullstackfamily.com/content/gentlelion/images/7a26fb54-e530-4811-9fee-794f3bf9e22d.jpg';
            img.alt = product.name ?? '';
        }

        card.querySelector(".cart-product-name").textContent = product.name;
        card.querySelector(".cart-product-color").textContent = product.color ?? '';
        card.querySelector(".cart-product-price").textContent = "₩" + product.price.toLocaleString();

        const select = card.querySelector(".cart-quantity");
        if (select) {
            select.value = product.quantity ?? 1;
            select.addEventListener("change", (e) => {
                putCartApi(token, product.cartItemId, e.target.value);
            });
        }

        const deleteBtn = card.querySelector(".cart-delete-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                await delCartlist(token, product.cartItemId);
                card.remove();
                
                const remaining = container.querySelectorAll(".cart-product-name").length;
                if (remaining === 0) {
                    container.innerHTML = '';
                    await emptyCart(container);
                }
            });
        }

        container.appendChild(card);
    }
}