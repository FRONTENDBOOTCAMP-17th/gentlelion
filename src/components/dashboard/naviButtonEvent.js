const navigation = document.getElementById("navigation");
const newProductBtn = document.getElementById("productNewProductBtn");

const pages = {
  dashboard: document.getElementById("dashboardPage"),
  users: document.getElementById("usersPage"),
  products: document.getElementById("productsPage"),
  newproducts: document.getElementById("newProductsPage"),
};

function changePage(key) {
  if (!pages[key]) return;

  const navButtons = navigation.querySelectorAll("button[data-select]");

  navButtons.forEach((btn) => {
    btn.classList.remove("bg-black", "text-white");
    btn.dataset.active = "false";
  });

  const activeNavButton = navigation.querySelector(
    `button[data-select="${key}"]`,
  );

  if (activeNavButton) {
    activeNavButton.classList.add("bg-black", "text-white");
    activeNavButton.dataset.active = "true";
  }

  Object.values(pages).forEach((page) => {
    if (!page) return;
    page.classList.add("hidden");
  });

  pages[key].classList.remove("hidden");
}

if (navigation) {
  navigation.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-select]");
    if (!button) return;

    const key = button.dataset.select;
    changePage(key);
  });
}

if (newProductBtn) {
  newProductBtn.addEventListener("click", () => {
    changePage("newproducts");
  });
}