import { getProductList } from "../../API/product/productListApi.js";
import { editProduct } from "../../API/product/productEditApi.js";
import { uploadImages } from "../../API/product/imageApi.js";
import { createColorRow } from "./colorRow.js";

const form = document.getElementById("productEditForm");
const colorContainer = document.getElementById("colorContainer");
const addColorBtn = document.getElementById("addColorBtn");

function saveColors(productId) {
  const inputs = colorContainer.querySelectorAll("[name=colors]");
  const colors = [];

  for (const input of inputs) {
    const value = input.value.trim();
    if (value) colors.push(value);
  }
  localStorage.setItem(`editProduct_colors_${productId}`, JSON.stringify(colors));
}

function loadColors(productId, backColors = []) {
  const stored = localStorage.getItem(`editProduct_colors_${productId}`);
  let colors = stored ? JSON.parse(stored) : backColors;

  colors = colors.map((c) => (typeof c === "object" ? c.name : c));

  while (colorContainer.firstChild) {
    colorContainer.removeChild(colorContainer.firstChild);
  }

  const colorRowOptions = (value = "") => ({
    value,
    onChange: () => saveColors(productId),
    onRemove: () => saveColors(productId),
    container: colorContainer,
  });

  if (colors.length === 0) {
    colorContainer.appendChild(createColorRow(colorRowOptions()));
  } else {
    for (const color of colors) {
      colorContainer.appendChild(createColorRow(colorRowOptions(color)));
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

  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");
  const imageUrlInput = document.getElementById("imageUrlInput");
  const imageUploadBtn = document.getElementById("imageUploadBtn");

  imageInput.multiple = true;
  imageUploadBtn.addEventListener("click", () => imageInput.click());

  imageInput.addEventListener("change", async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    try {
      uploadPlaceholder.querySelector("span").textContent = "업로드 중...";
      const urls = await uploadImages(files);

      imagePreview.src = urls[0];
      imagePreview.classList.remove("hidden");
      uploadPlaceholder.classList.add("hidden");
      imageUrlInput.value = JSON.stringify(urls);
    } catch (err) {
      alert("이미지 업로드 실패: " + err.message);
    }
  });

  if (!productId) {
    alert("잘못된 접근입니다.");
    location.href = "products.html";
    return;
  }

  addColorBtn.addEventListener("click", () => {
    colorContainer.appendChild(
      createColorRow({
        onChange: () => saveColors(productId),
        onRemove: () => saveColors(productId),
        container: colorContainer,
      })
    );
    saveColors(productId);
  });

  try {
    const { products } = await getProductList();
    const item = products.find((p) => p.id == productId);

    if (item) {
      if (item.images?.length > 0) {
        imagePreview.src = item.images[0];
        imagePreview.classList.remove("hidden");
        uploadPlaceholder.classList.add("hidden");
        imageUrlInput.value = JSON.stringify(item.images);
      }

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
      if (value) colors.push({ name: value });
    }

    const formData = new FormData(form);
    const updatedData = {
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