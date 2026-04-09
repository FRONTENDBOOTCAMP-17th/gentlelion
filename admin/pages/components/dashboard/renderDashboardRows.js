import { renderRows } from "../common/renderRows.js";

export function renderDashboardRows(tbody, orders) {
  renderRows(tbody, orders, {
    columns: [
      { getValue: (item) => item.orderNumber, className: "py-5" },
      { getValue: (item) => item.orderId, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.totalPrice, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.orderDate, className: "py-5" },
    ],
  });
}