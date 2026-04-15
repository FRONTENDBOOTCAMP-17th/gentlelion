import { renderRows } from "../common/renderRows.js";
import { showDetails } from "../common/showDetails.js";
import {
  createDetailButton,
  createDeleteButton,
} from "../common/createButton.js";
import { userDelete } from "./deleteButtonEvent.js";

export function renderUserRows(tbody, users, render) {
  renderRows(tbody, users, {
    columns: [
      {
        getValue: (item) => item.userId,
        className: "px-6 py-5 font-bold text-[#0a0a0a]",
      },
      {
        getValue: (item) => item.firstName + item.lastName,
        className: "px-6 py-5 text-(--admin-gray)",
      },
      {
        getValue: (item) => item.email,
        className: "px-6 py-5 text-(--admin-gray)",
      },
      { getValue: (item) => item.phone, className: "px-6 py-5" },
      { getValue: (item) => item.points, className: "px-6 py-5" },
      {
        getValue: (item) => item.createdAt?.split("T")[0],
        className: "px-6 py-5 text-(--admin-gray)",
      },
    ],
    buttonCellClass: "px-6 py-5 text-right",
    renderButtons: (tdButton, item) => {
      const actionContainer = document.createElement("div");
      actionContainer.className = "flex justify-end gap-3";

      const detailButton = createDetailButton();
      const deleteButton = createDeleteButton();
      actionContainer.appendChild(detailButton);
      actionContainer.appendChild(deleteButton);
      tdButton.appendChild(actionContainer);

      showDetails(
        detailButton,
        item.userId,
        (id) => `/pages/user-details.html?userId=${id}`,
      );
      userDelete(deleteButton, item.userId, render);
    },
  });
}
