export function orderSummation() {
    const buttons = document.querySelectorAll(".order-summation-btn");
    const containers = document.querySelectorAll(".order-container");
    const chevronDown = "M6 9L12 15L18 9";
    const chevronUp = "M6 15L12 9L18 15";

    buttons.forEach((button, index) => {
        const container = containers[index];
        if (!container) return;

        container.style.maxHeight = "0px";
        container.style.overflow = "hidden";
        container.style.transition = "max-height 0.3s ease";

        button.addEventListener("click", () => {
            const isOpen = container.style.maxHeight !== "0px";
            console.log(container);

            if (isOpen) {
                container.addEventListener("transitionend", () => {
                    container.classList.add("hidden");
                }, { once: true });
                container.style.maxHeight = "0px";
                button.querySelector("path")?.setAttribute("d", chevronDown);
            } else {
                container.classList.remove("hidden");
                container.style.maxHeight = container.scrollHeight + "px";
                button.querySelector("path")?.setAttribute("d", chevronUp);
            }
        });
    });
}