import "./style.css";

const header = document.querySelector(".utility-bar");

const handleScroll = () => {
  if (window.scrollY > 785.33) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
};

window.addEventListener("scroll", handleScroll);
