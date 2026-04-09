import { getProductList } from "../../API/product/productListApi.js";
import { editProduct } from "../../API/product/productEditApi.js";

const form = document.getElementById("productEditForm");
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

      return;
    }
    row.remove();
  });

  input.addEventListener("input", () => {
    saveColors();
  });

  row.appendChild(input);
  row.appendChild(removeBtn);

  return row;
}

function saveColors(productId) {
  const inputs = colorContainer.querySelectorAll("[name=colors]");
  const colors = [];

  for (const input of inputs) {
    const value = input.value.trim();
    if (value) colors.push(value);
  }
  localStorage.setItem(
    `editProduct_colors_${productId}`,
    JSON.stringify(colors),
  );
}
function loadColors(productId, backColors = []) {
  const stored = localStorage.getItem(`editProduct_colors_${productId}`);
  let colors = stored ? JSON.parse(stored) : backColors;

  colors = colors.map((c) => (typeof c === "object" ? c.name : c));

  while (colorContainer.firstChild) {
    colorContainer.removeChild(colorContainer.firstChild);
  }

  if (colors.length === 0) {
    colorContainer.appendChild(createColor());
  } else {
    for (const color of colors) {
      colorContainer.appendChild(createColor(color));
    }
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

async function EditPage() {
  Navigation();
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    alert("잘못된 접근입니다.");
    location.href = "products.html";
    return;
  }
  addColorBtn.addEventListener("click", () => {
    colorContainer.appendChild(createColor());
    saveColors();
  });

  try {
    const products = await getProductList();
    const item = products.find((p) => p.id == productId);

    if (item) {
      form.name.value = item.name;
      form.price.value = item.price;
      form.category.value = item.category;
      form.description.value = item.description || "";
      form.stock.value = item.stock || 0;

      if (item.specifications) {
        form.frameWidth.value = item.specifications.frameWidth || "";
        form.lensHeight.value = item.specifications.lensHeight || "";
        form.lensWidth.value = item.specifications.lensWidth || "";
        form.bridgeWidth.value = item.specifications.bridgeWidth || "";
        form.templeLength.value = item.specifications.templeLength || "";
      }
      loadColors(productId, item.colors || []);
    }
  } catch (err) {
    console.error("데이터 로드 실패:", err);
    loadColors(productId);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const colorInputs = colorContainer.querySelectorAll("[name='colors']");
    const colors = [];

    for (const input of colorInputs) {
      const value = input.value.trim();
      if (value) {
        colors.push({
          name: value,
        });
      }
    }

    const formData = new FormData(form);
    const updatedData = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
      colors,
      specifications: {
        frameWidth: formData.get("frameWidth"),
        lensHeight: formData.get("lensHeight"),
        lensWidth: formData.get("lensWidth"),
        bridgeWidth: formData.get("bridgeWidth"),
        templeLength: formData.get("templeLength"),
      },
    };

    try {
      await editProduct(productId, updatedData);
      localStorage.removeItem(`editProduct_colors_${productId}`);
      alert("상품 정보가 수정되었습니다.");
      location.href = "products.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

EditPage();
