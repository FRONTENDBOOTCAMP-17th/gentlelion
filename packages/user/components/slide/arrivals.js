import { getProductList } from "../API/product/productListApi.js";
import { postWishlist } from "../API/wishlist/postWishlistApi.js";

export async function renderArrivals() {
  const wrapper = document.getElementById("arrivals-wrapper");
  const thumbsWrapper = document.getElementById("arrivals-thumbs");
  if (!wrapper || !thumbsWrapper) return;

  const result = await getProductList("collection", 10, 1);
  const products = result.data;

  wrapper.innerHTML = "";

  thumbsWrapper.querySelectorAll(".thumb-item").forEach((el) => el.remove());

  products.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide shrink-0 relative w-full md:w-180 group";
    slide.innerHTML = `
      <a href="/pages/product-detail.html?productId=${item.id}" class="block">
        <div class="relative overflow-hidden w-full aspect-1/2 md:w-180 md:h-180">
          <figure class="absolute inset-0">
            <img
              src="${item.images?.[1] ?? item.images?.[0] ?? ""}"
              alt="${item.name}"
              class="w-full h-full object-cover"
            />
          </figure>
        </div>
      </a>
      <div class="arrivals-product-info static mt-4 mb-10 px-5 md:absolute md:bottom-15 md:left-0 md:mt-0 md:mb-0 md:px-0 pointer-events-none">
        <div class="px-5 md:px-0">
          <h3 class="text-[13px] leading-4.25">${item.name}</h3>
          <p class="text-[13px] leading-4.25">₩${item.price.toLocaleString()}</p>
        </div>
        <div class="mt-2 px-5 md:px-0 pointer-events-auto">
          <button class="wishlist-btn text-[12px] underline underline-offset-4 uppercase opacity-100 max-md:hidden" data-product-id="${item.id}">
            위시리스트에 추가하기
          </button>
        </div>
      </div>
    `;

    const wishBtn = slide.querySelector(".wishlist-btn");
    wishBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "/src/components/login/login.html";
        return;
      }
      try {
        await postWishlist(item.id);
      } catch (e) {
        alert(e.message);
      }
    });

    wrapper.appendChild(slide);

    const thumb = document.createElement("div");
    thumb.className = `thumb-item w-12 h-16 md:w-16 md:h-20 cursor-pointer border-b-2 border-transparent hover:border-gray-300 ${index === 0 ? "opacity-100" : ""}`;
    thumb.dataset.index = index;
    thumb.innerHTML = `
      <img
        src="${item.images?.[1] ?? item.images?.[0] ?? ""}"
        class="w-full h-full object-cover ${index === 0 ? "opacity-100" : "opacity-50 hover:opacity-100"}"
      />
    `;

    const span = thumbsWrapper.querySelector("span");
    thumbsWrapper.insertBefore(thumb, span);
  });
}
