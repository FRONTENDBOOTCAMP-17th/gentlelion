import { getProductList } from "../../API/product/productListApi.js";
import { renderRows } from "./renderRows.js";

async function refreshProductList() {
  try {
    const products = await getProductList();
    const tbody = document.getElementById("productTableBody");

    if (tbody) {
      renderRows(tbody, products);
    }

    const total = products.length;
    const totalWeight = document.getElementById("orderListTotal");
    const numWeight = document.getElementById("orderListNum");

    if (totalWeight) totalWeight.textContent = total;
    if (numWeight) numWeight.textContent = total > 0 ? `1-${total}` : "0";
  } catch (error) {
    console.error("목록 갱신 실패:", error);
  }
}

async function ProductPage() {
  const addBtn = document.getElementById("addProductBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      location.href = "productsAdd.html";
    });
  }

  await refreshProductList();
}

ProductPage();
