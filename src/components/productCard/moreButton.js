export async function moreButton(container) {
    const response = await fetch('/src/components/productCard/moreButton.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const buttonElement = doc.querySelector('productButton');

    if (buttonElement && container) {
        container.appendChild(buttonElement);
    }
}