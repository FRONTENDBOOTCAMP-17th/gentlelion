import { buttonEvent } from "./buttonEvent.js";

export async function moreButton(container, products, category) {
  const response = await fetch('/src/components/productCard/moreButton.html');
  if (!response.ok) return;

  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const text = doc.body.firstElementChild;

  text.querySelector(".current-products").textContent = products.data.length;
  text.querySelector(".total-products").textContent = products.meta.totalCount;

  container.appendChild(text);

  let currentPage = 1;

  const button = document.getElementById("moreButtonEvent");
  button.addEventListener("click", async () => {
    currentPage++;
    await buttonEvent(category, currentPage, button);
  });
}