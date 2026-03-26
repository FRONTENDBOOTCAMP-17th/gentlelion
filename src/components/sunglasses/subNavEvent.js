const subNav = document.getElementById("subNav");
const buttons = subNav.querySelectorAll(".subnav-btn");

subNav.addEventListener("click", (e) => {
    const button = e.target.closest(".subnav-btn");

    if (!button) return;

    e.preventDefault();

    buttons.forEach((item) => {
        item.classList.remove("bg-(--subTitle-button)");
        item.classList.add("bg-white");
    });

    button.classList.remove("bg-white");
    button.classList.add("bg-(--subTitle-button)");
});

if (subNav) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    subNav.addEventListener("mousedown", (e) => {
        isDown = true;
        subNav.classList.add("dragging");
        startX = e.pageX - subNav.offsetLeft;
        scrollLeft = subNav.scrollLeft;
    });

    subNav.addEventListener("mouseleave", () => {
        isDown = false;
        subNav.classList.remove("dragging");
    });

    subNav.addEventListener("mouseup", () => {
        isDown = false;
        subNav.classList.remove("dragging");
    });

    subNav.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - subNav.offsetLeft;
        const walk = x - startX;
        subNav.scrollLeft = scrollLeft - walk;
    });
}