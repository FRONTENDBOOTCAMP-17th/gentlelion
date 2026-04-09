export async function productCard(container) {
    const response = await fetch('/src/components/productCard/productCard.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const productElement = doc.querySelector('product');

    if (productElement && container) {
        container.appendChild(productElement);
    }

}