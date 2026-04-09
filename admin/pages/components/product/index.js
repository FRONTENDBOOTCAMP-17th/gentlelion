import { getProductList } from "../../API/product/productListApi.js";
import { renderRows } from "./renderRows.js";
import { deleteProduct } from "../../API/product/productDelete.js";
import { paginationButton } from "./pagination.js";
import { calcListNum } from "../common/calcListNum.js";
import { search } from "../common/search.js";

async function ProductPage(page = 1) {
  try {
    const limit = 20;
    const response = await getProductList(page, limit);

    const allProducts =
      response?.products || (Array.isArray(response) ? response : []);

    const totalCount = response?.pagination?.totalCount || allProducts.length;

    const totalPages =
      response?.pagination?.totalPages || Math.ceil(totalCount / limit) || 1;

    const displayProducts =
      allProducts.length > limit ? allProducts.slice(0, limit) : allProducts;

    const pagination = {
      page: Number(page),
      totalPages: totalPages,
      totalCount: totalCount,
    };

    const tbody = document.getElementById("productTableBody");
    const buttonComponents = document.getElementById("listButtonComponents");
    const totalWeight = document.getElementById("orderListTotal");
    const numWeight = document.getElementById("orderListNum");
    const searchInput = document.getElementById("search");

    if (!tbody) return;

    renderRows(tbody, displayProducts);

    if (totalWeight) totalWeight.textContent = totalCount;

    if (buttonComponents) {
      buttonComponents.innerHTML = "";
      console.log("버튼 생성 시도 - totalPages:", totalPages);

      paginationButton(
        buttonComponents,
        totalPages,
        pagination.page,
        ProductPage,
      );
    }

    if (numWeight) {
      calcListNum({ data: { pagination } }, numWeight, pagination.page);
    }

    if (searchInput) {
      const onSearch = (filteredOrders) => renderRows(tbody, filteredOrders);

      const filterFn = (item, keyword) => {
        const name = String(item.name ?? "").toLowerCase();
        const category = String(item.category ?? "").toLowerCase();
        const id = String(item.id ?? "").toLowerCase();
        return (
          name.includes(keyword) ||
          category.includes(keyword) ||
          id.includes(keyword)
        );
      };

      search(displayProducts, searchInput, onSearch, filterFn);
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
}

function deleteEvent() {
  const tbody = document.getElementById("productTableBody");
  if (!tbody) return;

  tbody.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest("#deleteBtn");
    if (!deleteBtn) return;

    const productId = deleteBtn.dataset.id;
    if (confirm(`상품 ID: ${productId}를 삭제하시겠습니까?`)) {
      try {
        await deleteProduct(productId);
        alert("삭제되었습니다.");

        ProductPage(1);
      } catch (error) {
        alert("삭제 실패: " + error.message);
      }
    }
  });
}

function init() {
  const addBtn = document.getElementById("addProductBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      location.href = "productsAdd.html";
    });
  }

  deleteEvent();
  ProductPage(1);
}

init();
