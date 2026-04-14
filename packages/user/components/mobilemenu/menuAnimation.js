export function initMenuAnimation() {
  const button = document.getElementById("menu-btn");
  const menu = document.getElementById("mobileMenu");
  const menuItems = menu.querySelectorAll(".menu-animate");

  menuItems.forEach((item) => {
    item.classList.add("translate-y-6", "opacity-0", "transition-all", "duration-500");
  });

  function openMenu() {
    menu.classList.add("opacity-100");
    menu.classList.remove("pointer-events-none");
    document.body.classList.add("overflow-hidden");

    menuItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 80}ms`;
      requestAnimationFrame(() => {
        item.classList.remove("translate-y-6", "opacity-0");
      });
    });
  }

  function closeMenu() {
    menu.classList.remove("opacity-100");
    menu.classList.add("pointer-events-none");
    document.body.classList.remove("overflow-hidden");

    menuItems.forEach((item) => {
      item.style.transitionDelay = "0ms";
      item.classList.add("translate-y-6", "opacity-0");
    });
  }

  button.addEventListener("click", () => {
    menu.classList.contains("opacity-100") ? closeMenu() : openMenu();
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleResize(e) {
    if (e.matches) closeMenu();
  }

  mediaQuery.addEventListener("change", handleResize);
  handleResize(mediaQuery);
}