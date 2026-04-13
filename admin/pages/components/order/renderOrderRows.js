import { renderRows } from "../common/renderRows.js";
import { createDetailButton } from "../common/createButton.js";
import { showDetails } from "../common/showDetails.js";

export function renderOrderRows(tbody, orders) {
  renderRows(tbody, orders, {
    columns: [
      {
        getValue: (item) => item.orderNumber,
        className: "px-6 py-5 font-bold text-[#0a0a0a]",
      },
      {
        getValue: (item) => item.userId,
        className: "px-6 py-5 text-(--admin-gray)",
      },
      {
        getValue: (item) => item.shippingAddress?.recipientName,
        className: "px-6 py-5 text-(--admin-gray)",
      },
      {
        getValue: (item) =>
          item.finalPrice != null
            ? `₩${item.finalPrice.toLocaleString()}`
            : "-",
        className: "px-6 py-5 font-bold text-[#0a0a0a]",
      },
      {
        getValue: (item) => item.orderDate?.split("T")[0],
        className: "px-6 py-5 text-(--admin-gray)",
      },
    ],
    renderButtons: (tdButton, item) => {
      tdButton.className = "px-6 py-5 text-right";
      const button = createDetailButton();
      tdButton.appendChild(button);
      showDetails(
        button,
        item.orderId,
        (id) => `/admin/pages/order-details.html?orderId=${id}`,
      );
    },
  });
}
