import { loadTemplate } from "../../utils/loadTemplate.js";

export async function orderCard(productContainer, data) {
  for (const product of data.data.items) {
    const card = await loadTemplate("/components/order/orderCard.html");

    const img = card.querySelector(".order-product-image");
    if (img) {
      img.src =
        product.imageUrl ??
        "https://storage.fullstackfamily.com/content/gentlelion/images/7a26fb54-e530-4811-9fee-794f3bf9e22d.jpg";
      img.alt = product.name ?? "";
    }

    card.querySelector(".order-product-name").textContent = product.name;
    card.querySelector(".order-product-color").textContent =
      product.color ?? "";
    card.querySelector(".order-product-price").textContent =
      "₩" + product.price.toLocaleString();
    card.querySelector(".order-product-quantity").textContent =
      "수량: " + product.quantity;

    productContainer.appendChild(card);
  }
}
