import { addProduct } from "../../API/product/productAdd.js";

const productForm = document.getElementById("productAddForm");

function Navigation() {
  const backBtnTop = document.getElementById("backBtnTop");
  const backBtnBottom = document.getElementById("backBtnBottom");

  const handleBack = () => {
    location.href = "products.html";
  };

  if (backBtnTop) backBtnTop.addEventListener("click", handleBack);
  if (backBtnBottom) backBtnBottom.addEventListener("click", handleBack);
}

if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);

    const productData = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
      specifications: {
        frameWidth: formData.get("frameWidth"),
        lensHeight: formData.get("lensHeight"),
        lensWidth: formData.get("lensWidth"),
      },
    };

    try {
      await addProduct(productData);
      alert("제품이 등록되었습니다.");
      location.href = "products.html";
    } catch (error) {
      console.error("등록 실패:", error);
    }
  });
}

Navigation();
