export function toggleMenu() {
  document.getElementById("dropdownMenu").classList.toggle("hidden");
}

export function initToggleMenu() {
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".relative")) {
      document.getElementById("dropdownMenu").classList.add("hidden");
    }
  });
}
