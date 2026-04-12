export function orderSummation() {
    const button = document.getElementById("orderSummationButton");
    const container = document.getElementById("orderContainer");
    const path = button.querySelector("path");
    const chevronDown = `M6 9L12 15L18 9`;
    const chevronUp = `M6 15L12 9L18 15`;

    container.style.maxHeight = "0px";
    container.style.overflow = "hidden";
    container.style.transition = "max-height 0.3s ease";

    button.addEventListener("click", () => {
        const isOpen = container.style.maxHeight !== "0px";
        path.setAttribute("d", chevronDown);
        if (isOpen) {
            container.addEventListener("transitionend", () => {
                container.classList.add("hidden");
            }, { once: true });
            container.style.maxHeight = "0px";
        }
        else {
            path.setAttribute("d", chevronUp);
            container.classList.remove("hidden");
            container.style.maxHeight = container.scrollHeight + "px";
        }
    })
}