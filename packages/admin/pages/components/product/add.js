import { addProduct } from "../../API/product/productAdd.js";
import { uploadImages } from "../../API/product/imageApi.js";
import { createColorRow } from "./colorRow.js";

const productForm = document.getElementById("productAddForm");
const colorContainer = document.getElementById("colorContainer");
const addColorBtn = document.getElementById("addColorBtn");

function imageUpload() {
  const uploadBtn = document.getElementById("imageUploadBtn");
  const fileInput = document.getElementById("imageInput");
  const previewImg = document.getElementById("imagePreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  const imageUrlInput = document.getElementById("imageUrlInput");

  fileInput.multiple = true;
  uploadBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    try {
      placeholder.querySelector("span").textContent = "업로드 중...";

      const urls = await uploadImages(files);

      previewImg.src = urls[0];
      previewImg.classList.remove("hidden");
      placeholder.classList.add("hidden");

      imageUrlInput.value = JSON.stringify(urls);
    } catch (error) {
      alert(error.message);
      placeholder.querySelector("span").textContent = "업로드 실패. 다시 시도";
    }
  });
}

function saveColors() {
  const inputs = colorContainer.querySelectorAll("[name='colors']");
  const colors = [];

  for (const input of inputs) {
    const value = input.value.trim();
    if (value) colors.push(value);
  }
  localStorage.setItem("addProductColors", JSON.stringify(colors));
}

function loadColors() {
  const stored = localStorage.getItem("addProductColors");
  const colors = stored ? JSON.parse(stored) : [];

  colorContainer.innerHTML = "";

  if (colors.length === 0) {
    colorContainer.appendChild(
      createColorRow({ onChange: saveColors, onRemove: saveColors, container: colorContainer })
    );
  } else {
    colors.forEach((value) =>
      colorContainer.appendChild(
        createColorRow({ value, onChange: saveColors, onRemove: saveColors, container: colorContainer })
      )
    );
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
    colorContainer.appendChild(
      createColorRow({ onChange: saveColors, onRemove: saveColors, container: colorContainer })
    );
    saveColors();
  });
}

if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const imageUrlInput = document.getElementById("imageUrlInput");

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
      colors,
      images: JSON.parse(imageUrlInput.value || "[]"),
      specifications: {
        frameWidth: formData.get("frameWidth"),
        lensHeight: formData.get("lensHeight"),
        lensWidth: formData.get("lensWidth"),
        bridgeWidth: formData.get("bridgeWidth"),
        templeLength: formData.get("templeLength"),
      },
    };

    try {
      await addProduct(productData);
      localStorage.removeItem("addProductColors");
      alert("제품이 등록되었습니다.");
      location.href = "products.html";
    } catch (error) {
      console.error("등록 실패:", error);
    }
  });
}

imageUpload();
add();