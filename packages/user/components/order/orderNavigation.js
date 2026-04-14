import { cartAccordion } from "../cart/cartAccordion.js";

export async function orderNavigation(container, totalPrice) {
    const response = await fetch('/components/order/orderNavigation.html');
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nav = doc.body.firstElementChild;

    const formatted = "₩" + totalPrice.toLocaleString();

    nav.querySelector(".order-subtotal").textContent = formatted;
    nav.querySelector(".order-total-price").textContent = formatted;
    nav.querySelector(".order-total-price-btn").textContent = formatted;
    nav.querySelector(".order-total-price-sticky").textContent = formatted;

    const stickyBar = nav.querySelector(".order-sticky-bar");
    const summary = nav.querySelector(".order-summary");

    const observer = new IntersectionObserver(([entry]) => {
        stickyBar.style.display = entry.isIntersecting ? "none" : "block";
    }, { threshold: 0.1 });

    observer.observe(summary);

    cartAccordion(nav);

    container.appendChild(nav);
}