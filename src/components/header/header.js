export async function loadHeader() {
  const response = await fetch('/src/components/header/header.html');
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headerElement = doc.querySelector('.header');
  document.body.insertBefore(headerElement, document.body.firstChild);

  const utilityBar = document.querySelector('.utility-bar');
  if (!utilityBar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 785.33) {
      utilityBar.classList.add('is-scrolled');
    } else {
      utilityBar.classList.remove('is-scrolled');
    }
  });
}