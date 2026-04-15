import { getDisplayImage } from "./productImage.js";

export function createSlideElement(item) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide shrink-0 relative w-full md:w-180 group";

  const a = document.createElement("a");
  a.href = `/pages/product-detail.html?productId=${item.id}`;
  a.className = "block";

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "relative overflow-hidden w-full aspect-1/2 md:w-180 md:h-180";

  const figure = document.createElement("figure");
  figure.className = "absolute inset-0";

  const img = document.createElement("img");
  img.src = getDisplayImage(item);
  img.alt = item.name;
  img.className = "w-full h-full object-cover";

  figure.appendChild(img);
  imgWrapper.appendChild(figure);
  a.appendChild(imgWrapper);

  const infoDiv = document.createElement("div");
  infoDiv.className = "arrivals-product-info static mt-4 mb-10 px-5 md:absolute md:bottom-15 md:left-0 md:mt-0 md:mb-0 md:px-0 pointer-events-none";

  const textDiv = document.createElement("div");
  textDiv.className = "px-5 md:px-0";

  const h3 = document.createElement("h3");
  h3.className = "text-[13px] leading-4.25";
  h3.textContent = item.name;

  const p = document.createElement("p");
  p.className = "text-[13px] leading-4.25";
  p.textContent = `₩${item.price.toLocaleString()}`;

  textDiv.appendChild(h3);
  textDiv.appendChild(p);

  const btnDiv = document.createElement("div");
  btnDiv.className = "mt-2 px-5 md:px-0 pointer-events-auto";

  const button = document.createElement("button");
  button.className = "text-[12px] underline underline-offset-4 uppercase opacity-100 max-md:hidden";
  button.textContent = "위시리스트에 추가하기";

  btnDiv.appendChild(button);
  infoDiv.appendChild(textDiv);
  infoDiv.appendChild(btnDiv);

  slide.appendChild(a);
  slide.appendChild(infoDiv);

  return slide;
}