import { orderAPI } from "../../API/order/orderListApi.js";
import { paginationButton } from "./paginationButton.js";
import { calcListNum } from "../common/calcListNum.js";
import { search } from "../common/search.js";
import { renderOrderRows } from "./renderOrderRows.js";
import { loadSidebar } from "../aside/dashboardNavigation.js"
import { toggleMenu } from "../common/toggleMenu.js";

async function order(page = 1) {
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
    const total = document.getElementById("ListTotal");
    const range = document.getElementById("ListNum");

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

    renderOrderRows(tbody, orders);

    paginationButton(buttonComponents, totalPages, currentPage, order);
    calcListNum(data, range, currentPage);

    const onSearch = (filteredOrders) => renderOrderRows(tbody, filteredOrders);

    const filterFn = (item, keyword) => {
      const recipientName = String(item.shippingAddress?.recipientName ?? "").toLowerCase();
      const orderNumber = String(item.orderNumber ?? "").toLowerCase();
      return recipientName.includes(keyword) || orderNumber.includes(keyword);
    };

    loadSidebar();
    toggleMenu();
    search(orders, orderSearch, onSearch, filterFn);

  } catch (error) {
    if (error.status === 401) {
      window.location.href = "/admin/pages/login.html";
      return;
    }
    console.error(error);
  }
}

order(1);