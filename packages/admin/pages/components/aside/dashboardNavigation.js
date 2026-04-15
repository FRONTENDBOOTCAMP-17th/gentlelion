import { logoutAPI } from "../../API/login/logoutApi.js";

export async function loadSidebar() {
  const aside = document.querySelector("aside");
  if (!aside) return;

  const response = await fetch("/pages/components/aside/navigation.html");
  const html = await response.text();
  aside.innerHTML = html;

  const logoutBtn = aside.querySelector("#logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logoutAPI);

  const currentPath = window.location.pathname;
  let activeNav = "";
  if (currentPath.includes("dashboard")) activeNav = "dashboard";
  else if (currentPath.includes("users")) activeNav = "users";
  else if (currentPath.includes("products")) activeNav = "products";
  else if (currentPath.includes("orders")) activeNav = "orders";

  const activeLink = aside.querySelector(`[data-nav="${activeNav}"]`);
  if (activeLink) {
    activeLink.classList.remove("hover:bg-gray-50");
    activeLink.classList.add("bg-[#0a0a0a]");
    activeLink.querySelectorAll("svg, span").forEach((el) => {
      el.classList.add("text-white");
      el.classList.remove("text-(--admin-gray)");
    });
  }
}
