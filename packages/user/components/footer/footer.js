export async function loadFooter() {
    const response = await fetch('/components/footer/footer.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const footerElement = doc.querySelector('footer');

    if (footerElement) {
        document.body.appendChild(footerElement);
    }

}