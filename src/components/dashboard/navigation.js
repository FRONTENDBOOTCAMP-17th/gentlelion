const naviBtn = document.getElementById("navigationButton");
const navi = document.getElementById("navigation");
const wrap = document.getElementById("wrap");

const navButtonSvg = {
    exit: document.getElementById("navExit"),
    menu: document.getElementById("navMenu"),
}

naviBtn.addEventListener("click", () => {
  navi.classList.toggle("-translate-x-full");
  wrap.classList.toggle("hidden");

  navButtonSvg.exit.classList.toggle("hidden");
  navButtonSvg.menu.classList.toggle("hidden");


});

wrap.addEventListener("click", () => {
  navi.classList.add("-translate-x-full");
  wrap.classList.add("hidden");

  navButtonSvg.exit.classList.add("hidden");
  navButtonSvg.menu.classList.remove("hidden");
});