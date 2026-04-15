export function orderSummation() {
  const buttons = document.querySelectorAll(".order-summation-btn");
  const containers = document.querySelectorAll(".order-container");
  const chevronDown = "M6 9L12 15L18 9";
  const chevronUp = "M6 15L12 9L18 15";

  buttons.forEach(function (button, index) {
    const container = containers[index];
    if (!container) return;

    container.classList.add(
      "max-h-0",
      "overflow-hidden",
      "transition-all",
      "duration-300",
      "ease-in-out",
    );

    button.addEventListener("click", function () {
      const isOpen = !container.classList.contains("max-h-0");

      if (isOpen) {
        container.classList.remove("max-h-[600px]");
        container.classList.add("max-h-0");
        button.querySelector("path")?.setAttribute("d", chevronDown);
      } else {
        container.classList.remove("max-h-0");
        container.classList.add("max-h-[600px]");
        button.querySelector("path")?.setAttribute("d", chevronUp);
      }
    });
  });
}
