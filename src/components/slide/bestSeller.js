import { getProductList } from "../API/product/productListApi.js";

export async function renderBestSeller() {
  const wrapper = document.querySelector(".best-swiper .swiper-wrapper");
  if (!wrapper) return;

  const result = await getProductList("sunglasses", 20, 1);
  const products = result.data;

  wrapper.innerHTML = "";

  products.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide flex-none ml-1 md:ml-9 relative group";

    slide.innerHTML = `
      <a href="/src/pages/product-detail.html?productId=${item.id}" class="relative block">
        <div class="relative overflow-hidden w-44 h-60 md:w-97.5 md:h-165.75">
          <figure class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 md:w-194 md:h-194">
            <img
              src="${item.images?.[0] ?? ""}"
              class="w-full h-full object-contain pointer-events-none"
              alt="${item.name}"
            />
          </figure>
        </div>
        <div class="absolute w-full top-48 px-12 md:top-135 md:px-12">
          <h3 class="text-[10px] font-medium leading-4">${item.name}</h3>
          <p class="text-[10px] text-[#858585] leading-4">₩${item.price.toLocaleString()}</p>
        </div>
      </a>
    `;

    wrapper.appendChild(slide);
  });
}
