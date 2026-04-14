export function toggleMenu() {
    const button = document.getElementById("naviMenuButton");
    const menu = document.getElementById("dropdownMenu");
    button.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}