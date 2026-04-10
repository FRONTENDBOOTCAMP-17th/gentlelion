export function changeColor(button, buttons) {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.classList.remove("bg-(--subTitle-button)");
            btn.classList.add("bg-white");
        });

        button.classList.remove("bg-white");
        button.classList.add("bg-(--subTitle-button)");
    });
}