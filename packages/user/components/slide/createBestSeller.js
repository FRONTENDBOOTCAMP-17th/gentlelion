import { getDisplayImage } from "./productImage.js";

export function createSlideElement(item) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide flex-none ml-1 md:ml-9 relative group";

  const a = document.createElement("a");
  a.href = `/pages/product-detail.html?productId=${item.id}`;
  a.className = "relative block";

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "relative overflow-hidden w-44 h-60 md:w-97.5 md:h-165.75";

  const figure = document.createElement("figure");
  figure.className = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 md:w-194 md:h-194";

  const img = document.createElement("img");
  img.src = getDisplayImage(item);
  img.alt = item.name;
  img.className = "w-full h-full object-contain pointer-events-none";

  figure.appendChild(img);
  imgWrapper.appendChild(figure);

  const infoDiv = document.createElement("div");
  infoDiv.className = "absolute w-full top-48 px-12 md:top-135 md:px-12";

  const h3 = document.createElement("h3");
  h3.className = "text-[10px] font-medium leading-4";
  h3.textContent = item.name;

  const p = document.createElement("p");
  p.className = "text-[10px] text-[#858585] leading-4";
  p.textContent = `₩${item.price.toLocaleString()}`;

  infoDiv.appendChild(h3);
  infoDiv.appendChild(p);

  a.appendChild(imgWrapper);
  a.appendChild(infoDiv);
  slide.appendChild(a);

  return slide;
}