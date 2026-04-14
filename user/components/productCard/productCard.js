export async function productCard(container, products) {
  const response = await fetch("/src/components/productCard/productCard.html");
  if (!response.ok) return;

  const html = await response.text();

  for (const product of products.data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const card = doc.body.firstElementChild;

    const img = card.querySelector(".product-image");
    if (img) {
      img.src = product.images?.[0] ?? "";
      img.alt = product.name ?? "";
    }

    card.querySelector(".product-name").textContent = product.name;
    card.querySelector(".product-price").textContent =
      "₩" + product.price.toLocaleString();
    if (product.inStock) {
      card.querySelector(".in-stock").classList.add("hidden");
    }

    const wishButton = card.querySelector(".wishButton");
    if (wishButton) {
      wishButton.dataset.productId = product.id;
      const links = card.querySelectorAll("a");
      links.forEach(function (link) {
        link.href = `/src/pages/product-detail.html?productId=${product.id}`;
      });
    }

    container.appendChild(card);
  }
}
