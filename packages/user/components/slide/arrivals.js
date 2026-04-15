import { getProductList } from "../API/product/productListApi.js";
import { createSlideElement } from "./createArrivals.js";
import { createThumbElement } from "./createThumbElement.js";

export async function renderArrivals() {
  const wrapper = document.getElementById("arrivals-wrapper");
  const thumbsWrapper = document.getElementById("arrivals-thumbs");
  if (!wrapper || !thumbsWrapper) return;

  const result = await getProductList("collection", 10, 1);
  const products = result.data;

  wrapper.innerHTML = "";
  thumbsWrapper.querySelectorAll(".thumb-item").forEach((el) => el.remove());

  const span = thumbsWrapper.querySelector("span");

  products.forEach((item, index) => {
    wrapper.appendChild(createSlideElement(item));
    thumbsWrapper.insertBefore(createThumbElement(item, index), span);
  });
}