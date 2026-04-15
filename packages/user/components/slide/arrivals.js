import { getProductList } from "../API/product/productListApi.js";
import { postWishlist } from "../API/wishlist/postWishlistApi.js";
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
    const slide = createSlideElement(item);

    const wishBtn = slide.querySelector(".wishlist-btn");
    if (wishBtn) {
      wishBtn.addEventListener("click", async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          location.href = "/src/components/login/login.html";
          return;
        }
        try {
          await postWishlist(item.id);
          alert("위시리스트에 추가되었습니다.");
        } catch (e) {
          alert(e.message);
        }
      });
    }

    wrapper.appendChild(slide);
    thumbsWrapper.insertBefore(createThumbElement(item, index), span);
  });
}
