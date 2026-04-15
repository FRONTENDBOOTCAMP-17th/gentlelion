export function toggleMenu() {
    const button = document.getElementById("naviMenuButton");
    const menu = document.getElementById("dropdownMenu");
    if (!button || !menu) {
        return;
    }
    button.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}