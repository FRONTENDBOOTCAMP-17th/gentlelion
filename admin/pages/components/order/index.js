import { orderAPI } from "../../API/orderListApi.js";
import { paginationButton } from "./paginationButton.js";
import { calcListNum } from "./calcListNum.js";
import { search } from "./search.js";
import { renderRows } from "./renderRows.js";

async function renderOrderList(page = 1) {
  try {
    const data = await orderAPI(page);

    if (!data || !data.data) {
      console.error("데이터 없음");
      return;
    }

    const tbody = document.querySelector("tbody");
    if (!tbody) {
      throw new Error("tbody를 찾을 수 없습니다.");
    }

    const orderSearch = document.getElementById("search");
    const buttonComponents = document.getElementById("listButtonComponents");
    const total = document.getElementById("orderListTotal");
    const range = document.getElementById("orderListNum");

    const orders = Array.isArray(data.data.orders) ? data.data.orders : [];
    const pagination = data.data.pagination ?? {};
    const totalPages = pagination.totalPages ?? 1;
    const totalCount = pagination.totalCount ?? 0;
    const currentPage = pagination.page ?? page;

    if (buttonComponents) {
      buttonComponents.innerHTML = "";
    }

    if (total) {
      total.textContent = totalCount;
    }

    renderRows(tbody, orders);

    paginationButton(buttonComponents, totalPages, currentPage, renderOrderList);
    calcListNum(data, range, currentPage);

    search(orders, orderSearch, (filteredOrders) => {
      renderRows(tbody, filteredOrders);
    });
  } catch (error) {
    console.error(error);
  }
}

renderOrderList(1);