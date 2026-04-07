import "./style.css";

//스크롤 이벤트
const header = document.querySelector(".utility-bar");
if (header) {
  const handleScroll = () => {
    if (window.scrollY > 785.33) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
}



//메뉴 버튼 이벤트
const btn = document.getElementById("menu-btn");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

if (btn) {
  btn.addEventListener("click", () => {
    line1.classList.toggle("translate-y-[2.5px]");
    line1.classList.toggle("rotate-45");

    line2.classList.toggle("-translate-y-[2.5px]");
    line2.classList.toggle("-rotate-45");

    header.classList.toggle("is-active");
  });
}


