import { delCartlist } from "../API/cart/delCartApi";
import { putCartApi } from "../API/cart/putCartApi";
import { emptyCart } from "./emptyCart.js";
import { cartNavigation } from "./cartNavigation.js";
import { checkPriceChange } from "../API/cart/checkPriceChange.js";

export async function cartCard(productContainer, navContainer, data) {
  const response = await fetch("/src/components/cart/cartCard.html");
  if (!response.ok) return;

  const html = await response.text();

  for (const product of data.data.items) {
    const shouldContinue = await checkPriceChange(product);
    if (!shouldContinue) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const card = doc.body.firstElementChild;

    const img = card.querySelector(".cart-product-image");
    if (img) {
      img.src =
        product.imageUrl ??
        "";
      img.alt = product.name ?? "";
    }

    card.querySelector(".cart-product-name").textContent = product.name;
    card.querySelector(".cart-product-color").textContent = product.color ?? "";
    card.querySelector(".cart-product-price").textContent =
      "₩" + product.price.toLocaleString();

    const select = card.querySelector(".cart-quantity");
    if (select) {
      select.value = product.quantity ?? 1;
      select.addEventListener("change", async (e) => {
        const updateData = await putCartApi(
          token,
          product.cartItemId,
          e.target.value,
        );
        navContainer.innerHTML = "";
        await cartNavigation(navContainer, updateData.data.totalPrice);
      });
    }

    const deleteBtn = card.querySelector(".cart-delete-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", async () => {
        await delCartlist(token, product.cartItemId);
        card.remove();

        const remaining =
          productContainer.querySelectorAll(".cart-product-name").length;
        if (remaining === 0) {
          productContainer.innerHTML = "";
          navContainer.innerHTML = "";
          await emptyCart(productContainer);
        }
      });
    }

    productContainer.appendChild(card);
  }
}
