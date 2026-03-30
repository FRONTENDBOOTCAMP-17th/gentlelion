const button = document.getElementById("menuButton");
const menu = document.getElementById("mobileMenu");
const menuItems = menu.querySelectorAll(".menu-animate");

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

//메뉴 버튼 위치 이동 이벤트
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

button.addEventListener("click", () => {
  line1.classList.toggle("translate-y-[2.5px]");
  line1.classList.toggle("rotate-45");

  line2.classList.toggle("-translate-y-[2.5px]");
  line2.classList.toggle("-rotate-45");

  header.classList.toggle("is-active");
});
