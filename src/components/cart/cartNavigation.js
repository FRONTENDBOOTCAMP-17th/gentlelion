import { cartAccordion } from "./cartAccordion";

export async function cartNavigation(container, totalPrice) {
    const response = await fetch('/src/components/cart/cartNavigation.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nav = doc.body.firstElementChild;

    const formatted = "₩" + totalPrice.toLocaleString();

    nav.querySelector(".cart-subtotal").textContent = formatted;
    nav.querySelector(".cart-total-price").textContent = formatted;
    nav.querySelector(".cart-total-price-btn").textContent = formatted;
    nav.querySelector(".cart-total-price-sticky").textContent = formatted;

    const stickyBar = nav.querySelector(".cart-sticky-bar");
    const summary = nav.querySelector(".cart-summary");

    const observer = new IntersectionObserver(([entry]) => {
        stickyBar.style.display = entry.isIntersecting ? "none" : "block";
    }, { threshold: 0.1 });

    observer.observe(summary);

    cartAccordion(nav);

    container.appendChild(nav);
}