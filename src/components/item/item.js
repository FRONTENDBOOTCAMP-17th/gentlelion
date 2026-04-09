import { createImageCarousel } from "../carousel/imageCarousel.js";

export function createItem(product, isActive, createBookmarkSvg) {
  const item = document.createElement("div");
  item.className = "product cursor-pointer";

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const imageWrap = createImageCarousel(images, { alt: product.name });

  const infoWrap = document.createElement("div");
  infoWrap.style.cssText =
    "display:flex;align-items:flex-start;justify-content:space-between;padding:8px 0 24px;";

  const textLink = document.createElement("a");
  textLink.style.cssText = "flex:1;text-decoration:none;";

  const name = document.createElement("p");
  name.textContent = product.name;
  name.style.cssText =
    "font-size:11px;line-height:16px;color:#111111;margin:0;";

  const price = document.createElement("p");
  let priceText = product.price || "";
  if (product.status) priceText += " - " + product.status;
  price.textContent = priceText;
  price.style.cssText =
    "font-size:11px;line-height:16px;color:#111111;margin:0;";

  textLink.appendChild(name);
  textLink.appendChild(price);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "bookmark-button";
  button.style.cssText =
    "margin-top:8px;margin-left:12px;flex-shrink:0;background:none;" +
    "border:none;cursor:pointer;padding:0;line-height:1;";
  button.setAttribute("aria-label", "찜하기");
  button.innerHTML = createBookmarkSvg(isActive);

  infoWrap.appendChild(textLink);
  infoWrap.appendChild(button);

  item.appendChild(imageWrap);
  item.appendChild(infoWrap);

  return item;
}
