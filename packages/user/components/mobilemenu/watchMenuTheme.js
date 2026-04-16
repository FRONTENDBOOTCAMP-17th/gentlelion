const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenu) {
  const observer = new MutationObserver(() => {
    const isOpen = mobileMenu.classList.contains("opacity-100");
    document.body.dataset.theme = isOpen ? "light" : "dark";
  });

  observer.observe(mobileMenu, {
    attributes: true,
    attributeFilter: ["class"],
  });
}