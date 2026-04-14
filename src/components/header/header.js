export async function loadHeader() {
  const response = await fetch("/src/components/header/header.html");
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headerElement = doc.querySelector(".header");
  document.body.insertBefore(headerElement, document.body.firstChild);

  const utilityBar = document.querySelector(".utility-bar");
  if (!utilityBar) return;

  const videoSection = document.querySelector(".main-video");
  const threshold = videoSection ? videoSection.offsetHeight : 785;

  window.addEventListener("scroll", () => {
    if (window.scrollY > threshold) {
      utilityBar.classList.add("is-scrolled");
    } else {
      utilityBar.classList.remove("is-scrolled");
    }
  });
}
