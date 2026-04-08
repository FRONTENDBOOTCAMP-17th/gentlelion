import { renderRows } from "../common/renderRows.js";
import { showDetails } from "../common/showDetails.js";
import { createDetailButton } from "../common/createButton.js";
import { createDeleteButton } from "../common/createButton.js";
import { userDelete } from "./deleteButtonEvent.js";

export function renderUserRows(tbody, users, render) {
  renderRows(tbody, users, {
    columns: [
      { getValue: (item) => item.userId, className: "py-5" },
      { getValue: (item) => item.firstName + item.lastName, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.email, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.phone, className: "py-5" },
      { getValue: (item) => item.points, className: "py-5" },
      { getValue: (item) => item.createdAt?.split("T")[0], className: "py-5 text-(--admin-gray)" },
    ],
    buttonCellClass: "py-5 flex gap-2",
    renderButtons: (tdButton, item) => {
      const detailButton = createDetailButton();
      const deleteButton = createDeleteButton();
      tdButton.appendChild(detailButton);
      tdButton.appendChild(deleteButton);
      showDetails(detailButton, item.userId, (id) => `/admin/pages/user-details.html?userId=${id}`);
      userDelete(deleteButton, item.userId, render);
    },
  });
}