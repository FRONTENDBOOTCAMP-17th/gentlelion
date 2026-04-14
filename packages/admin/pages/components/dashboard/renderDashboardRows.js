import { renderRows } from "../common/renderRows.js";

export function renderDashboardRows(tbody, orders) {
  renderRows(tbody, orders, {
    columns: [
      { getValue: (item) => item.orderNumber, className: "py-5 px-6" },
      { getValue: (item) => item.orderId, className: "py-5 text-(--admin-gray) px-6" },
      { getValue: (item) => item.totalPrice, className: "py-5 text-(--admin-gray) px-6" },
      { getValue: (item) => item.orderDate, className: "py-5 px-6" },
    ],
  });
}