import { getProductList } from "../API/product/productListApi.js";
import { createSlideElement } from "./createBestSeller.js";

export async function renderBestSeller() {
  const wrapper = document.querySelector(".best-swiper .swiper-wrapper");
  if (!wrapper) return;

  const result = await getProductList("sunglasses", 20, 1);
  const products = result.data;

  wrapper.innerHTML = "";

  products.forEach((item) => {
    wrapper.appendChild(createSlideElement(item));
  });
}