import { addProduct } from "../../API/product/productAdd.js";

const productForm = document.getElementById("productAddForm");
const colorContainer = document.getElementById("colorContainer");
const addColorBtn = document.getElementById("addColorBtn");

function createColor(value = "") {
  const row = document.createElement("div");
  row.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.name = "colors";
  input.type = "text";
  input.placeholder = "Black";
  input.value = value;
  input.className =
    "flex-1 border border-gray-200 rounded-xl h-11 px-4 text-sm focus:border-black outline-none";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className =
    "remove-color-btn text-[#d92d20] p-2 hover:bg-red-50 rounded-lg transition-colors";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "w-5 h-5");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  );
  svg.appendChild(path);
  removeBtn.appendChild(svg);

  removeBtn.addEventListener("click", () => {
    const rows = colorContainer.querySelectorAll(".flex.items-center.gap-2");
    if (rows.length === 1) {
      input.value = "";
      saveColors();
      return;
    }
    row.remove();
    saveColors();
  });
  input.addEventListener("input", () => {
    saveColors();
  });

  row.appendChild(input);
  row.appendChild(removeBtn);

  return row;
}
function saveColors() {
  const inputs = colorContainer.querySelectorAll("[name='colors']");
  const colors = [];

  for (const input of inputs) {
    const value = input.value.trim();
    if (value) {
      colors.push(value);
    }
  }
  localStorage.setItem("addProductColors", JSON.stringify(colors));
}

function loadColors() {
  const stored = localStorage.getItem("addProductColors");
  const colors = stored ? JSON.parse(stored) : [];

  colorContainer.innerHTML = "";

  if (colors.length === 0) {
    colorContainer.appendChild(createColor());
  } else {
    colors.forEach((c) => colorContainer.appendChild(createColor(c)));
  }
}

function Navigation() {
  const backBtnTop = document.getElementById("backBtnTop");
  const backBtnBottom = document.getElementById("backBtnBottom");

  const handleBack = () => {
    location.href = "products.html";
  };

  if (backBtnTop) backBtnTop.addEventListener("click", handleBack);
  if (backBtnBottom) backBtnBottom.addEventListener("click", handleBack);
}

function add() {
  Navigation();
  loadColors();

  addColorBtn.addEventListener("click", () => {
    colorContainer.appendChild(createColor());
    saveColors();
  });
}

if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);

    const colorInputs = colorContainer.querySelectorAll("[name='colors']");
    const colors = [];
    for (const input of colorInputs) {
      const val = input.value.trim();
      if (val) colors.push({ name: val });
    }

    const productData = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
      colors: colors,
      specifications: {
        frameWidth: formData.get("frameWidth"),
        lensHeight: formData.get("lensHeight"),
        lensWidth: formData.get("lensWidth"),
        bridgeWidth: formData.get("bridgeWidth"),
        templeLength: formData.get("templeLength"),
      },
    };

    try {
      console.log(productData);
      await addProduct(productData);
      localStorage.removeItem("addProductColors");
      alert("제품이 등록되었습니다.");
      location.href = "products.html";
    } catch (error) {
      console.error("등록 실패:", error);
    }
  });
}

add();
