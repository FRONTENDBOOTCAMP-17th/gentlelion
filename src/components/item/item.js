export function createItem(product, isActive, createBookmarkSvg) {
  const item = document.createElement("div");
  item.className = "cursor-pointer";

  const imageWrap = document.createElement("div");
  imageWrap.className = "w-full overflow-hidden bg-gray-100 aspect-[185/252]";

  if (product.image) {
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "w-full h-full object-cover";
    imageWrap.appendChild(image);
  } else {
    const empty = document.createElement("div");
    empty.className = "w-full h-full bg-gray-100";
    imageWrap.appendChild(empty);
  }

  const infoWrap = document.createElement("div");
  infoWrap.className = "flex items-start justify-between px-8 pt-[8px]";

  const textWrap = document.createElement("div");

  const name = document.createElement("p");
  name.textContent = product.name;
  name.style.fontSize = "10px";
  name.style.lineHeight = "15px";
  name.style.color = "#111111";

  const price = document.createElement("p");

  let priceText = product.price;

  if (product.status) {
    priceText += " - " + product.status;
  }

  price.textContent = priceText;
  price.style.fontSize = "10px";
  price.style.lineHeight = "15px";
  price.style.color = "#111111";

  textWrap.appendChild(name);
  textWrap.appendChild(price);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "bookmark-button ml-2 shrink-0 leading-none";
  button.setAttribute("aria-label", "찜하기");
  button.innerHTML = createBookmarkSvg(isActive);

  infoWrap.appendChild(textWrap);
  infoWrap.appendChild(button);

  item.appendChild(imageWrap);
  item.appendChild(infoWrap);

  return item;
}
