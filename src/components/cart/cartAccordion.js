export function cartAccordion(nav) {
    const items = nav.querySelectorAll(".cart-accordion-item");

    items.forEach((item) => {
        const btn = item.querySelector(".cart-accordion-btn");
        const content = item.querySelector(".cart-accordion-content");
        const icon = item.querySelector(".cart-accordion-icon");

        content.style.overflow = "hidden";
        content.style.maxHeight = "0";
        content.style.transition = "max-height 0.3s ease";

        btn.addEventListener("click", () => {
            const isOpen = content.style.maxHeight !== "0px" && content.style.maxHeight !== "";

            items.forEach((el) => {
                el.querySelector(".cart-accordion-content").style.maxHeight = "0";
                el.querySelector(".cart-accordion-icon").textContent = "+";
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });
}