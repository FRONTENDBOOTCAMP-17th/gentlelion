import { getProductList } from "../../API/product/productListApi.js";
import { renderRows } from "./renderRows.js";
import { deleteProduct } from "../../API/product/productDelete.js";

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

function deleteEvent() {
  const tbody = document.getElementById("productTableBody");
  if (!tbody) return;

  tbody.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest("#deleteBtn");
    if (deleteBtn) {
      const productId = deleteBtn.dataset.id;

      if (confirm(`상품 ID: ${productId}를 삭제하시겠습니까?`)) {
        try {
          await deleteProduct(productId);
          alert("삭제되었습니다.");
          await refreshProductList();
        } catch (error) {
          alert("삭제 실패: " + error.message);
        }
      }
      return;
    }
  });
}

async function ProductPage() {
  const addBtn = document.getElementById("addProductBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      location.href = "productsAdd.html";
    });
  }
  deleteEvent();

  await refreshProductList();
}

ProductPage();
