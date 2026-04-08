import { formatPrice, formatDate } from "./formatters.js";
import { renderRows } from "../common/renderRows.js";
import { renderOrderCards } from "./renderOrderCards.js";

export function render(data) {
  const s = data.summary;

  document.getElementById("stat-users").textContent =
    s.totalUsers.toLocaleString();
  document.getElementById("stat-products").textContent =
    s.totalProducts.toLocaleString();
  document.getElementById("stat-orders").textContent =
    s.totalOrders.toLocaleString();
  document.getElementById("stat-revenue").textContent = formatPrice(
    s.totalRevenue,
  );

  const tbody = document.getElementById("orderTableBody");
  renderRows(tbody, data.recentOrders, {
    columns: [
      {
        getValue: (o) => o.orderNumber,
        className:
          "px-6 py-4 text-sm font-medium text-(--admin-dark) leading-5 tracking-tight",
      },
      {
        getValue: (o) => o.orderId,
        className:
          "px-6 py-4 text-sm font-normal text-(--admin-dark) leading-5 tracking-tight",
      },
      {
        getValue: (o) =>
          o.totalPrice?.toLocaleString("ko-KR", {
            style: "currency",
            currency: "KRW",
          }),
        className:
          "px-6 py-4 text-sm font-normal text-(--admin-dark) leading-5 tracking-tight",
      },
      {
        getValue: (o) => formatDate(o.orderDate),
        className:
          "px-6 py-4 text-sm font-normal text-(--admin-gray) leading-5 tracking-tight",
      },
    ],
    renderButtons: () => {},
  });

  const cardBody = document.getElementById("orderCardBody");
  renderOrderCards(cardBody, data.recentOrders);
}
