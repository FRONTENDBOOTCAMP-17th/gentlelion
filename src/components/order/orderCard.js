export async function orderCard(productContainer, data) {
    const response = await fetch('/src/components/order/orderCard.html');
    if (!response.ok) return;

    const html = await response.text();

    for (const product of data.data.items) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const card = doc.body.firstElementChild;

        const img = card.querySelector(".order-product-image");
        if (img) {
            img.src = product.imageUrl ?? 'https://storage.fullstackfamily.com/content/gentlelion/images/7a26fb54-e530-4811-9fee-794f3bf9e22d.jpg';
            img.alt = product.name ?? '';
        }

        card.querySelector(".order-product-name").textContent = product.name;
        card.querySelector(".order-product-color").textContent = product.color ?? '';
        card.querySelector(".order-product-price").textContent = "₩" + product.price.toLocaleString();
        card.querySelector(".order-product-quantity").textContent = "수량: " + product.quantity.toLocaleString();

        productContainer.appendChild(card);
    }
}