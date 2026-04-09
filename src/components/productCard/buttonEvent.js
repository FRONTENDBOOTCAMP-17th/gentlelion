import { getProductList } from "../API/product/productListApi.js";
import { productCard } from "../productCard/productCard.js";

export async function buttonEvent(category, page, button) {
  const productContainer = document.getElementById("productContainer");

  const result = await getProductList(category, 24, page);
  if (!result) return;

  await productCard(productContainer, result);

  const currentEl = document.querySelector(".current-products");
  currentEl.textContent = Number(currentEl.textContent) + result.data.length;

  if (page >= result.meta.totalPages) {
    button.style.display = "none";
  }
}