const button = document.getElementById("mobileMenu");
const menu = document.getElementById("mobileMenu");
const menuItems = menu.querySelectorAll(".menu-animate");
const header = document.querySelector(".header");

menuItems.forEach((item) => {
  item.classList.add(
    "translate-y-6",
    "opacity-0",
    "transition-all",
    "duration-500",
  );
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

function buttonClickEvent() {
  const isOpen = menu.classList.contains("opacity-100");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

button.addEventListener("click", buttonClickEvent);

const mediaQuery = window.matchMedia("(min-width: 768px)");

function handleResize(e) {
  if (e.matches) {
    closeMenu();
  }
}

handleResize(mediaQuery);
mediaQuery.addEventListener("change", handleResize);