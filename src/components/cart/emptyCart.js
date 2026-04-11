export async function emptyCart(container) {
    const response = await fetch('/src/components/cart/emptyCart.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const card = doc.body.firstElementChild;

    container.appendChild(card);
}