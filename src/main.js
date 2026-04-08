import "./style.css";

//메뉴 버튼 이벤트
const btn = document.getElementById("menu-btn");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

if (btn && line1 && line2 && header) {
  btn.addEventListener("click", () => {
    line1.classList.toggle("translate-y-[2.5px]");
    line1.classList.toggle("rotate-45");

    line2.classList.toggle("-translate-y-[2.5px]");
    line2.classList.toggle("-rotate-45");

    header.classList.toggle("is-active");
  });
}
