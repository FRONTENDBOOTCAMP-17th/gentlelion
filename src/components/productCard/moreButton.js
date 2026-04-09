export async function moreButton(container) {
    const response = await fetch('/src/components/productCard/moreButton.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    container.appendChild(doc.body.firstElementChild);
}