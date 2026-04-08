import { getProductList } from "../../API/product/productListApi.js";
import { editProduct } from "../../API/product/productEditApi.js";

const form = document.getElementById("productEditForm");

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
    }
  } catch (err) {
    console.error("데이터 로드 실패:", err);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedData = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
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
      alert("상품 정보가 수정되었습니다.");
      location.href = "products.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

EditPage();
