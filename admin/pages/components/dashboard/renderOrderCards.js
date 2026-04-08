import { formatDate } from "./formatters.js";

export function renderOrderCards(cardBody, orders) {
  cardBody.innerHTML = "";

  orders.forEach((o) => {
    const div = document.createElement("div");
    div.className = "px-6 py-4 border-b border-(--admin-border)";

    const orderNumber = document.createElement("p");
    orderNumber.className =
      "text-sm font-medium text-(--admin-dark) leading-5 tracking-tight mb-0.5";
    orderNumber.textContent = o.orderNumber ?? "-";

    const orderId = document.createElement("p");
    orderId.className =
      "text-sm font-normal text-(--admin-gray) leading-5 tracking-tight mb-2";
    orderId.textContent = `주문 ID: ${o.orderId ?? "-"}`;

    const row = document.createElement("div");
    row.className = "flex items-center justify-between";

    const price = document.createElement("span");
    price.className =
      "text-sm font-bold text-(--admin-dark) leading-5 tracking-tight";
    price.textContent =
      o.totalPrice?.toLocaleString("ko-KR", {
        style: "currency",
        currency: "KRW",
      }) ?? "-";

    const date = document.createElement("span");
    date.className =
      "text-sm font-normal text-(--admin-gray) leading-5 tracking-tight";
    date.textContent = formatDate(o.orderDate);

    row.appendChild(price);
    row.appendChild(date);
    div.appendChild(orderNumber);
    div.appendChild(orderId);
    div.appendChild(row);
    cardBody.appendChild(div);
  });
}
