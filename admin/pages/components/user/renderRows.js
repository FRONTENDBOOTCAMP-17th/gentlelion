import { showDetails } from "../common/showDetails.js";
import { userDelete } from "./deleteButtonEvent.js";

export function renderRows(tbody, users, render) {
  tbody.innerHTML = "";

  users.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = "text-[14px]";

    const tdIndex = document.createElement("td");
    tdIndex.className = "py-5";
    tdIndex.textContent = item.userId ?? "-";

    const tdId = document.createElement("td");
    tdId.className = "py-5 text-(--admin-gray)";
    tdId.textContent = item.lastName + item.firstName ?? "-";

    const tdName = document.createElement("td");
    tdName.className = "py-5 text-(--admin-gray)";
    tdName.textContent = item.email ?? "-";

    const tdPhone = document.createElement("td");
    tdPhone.className = "py-5";
    tdPhone.textContent = item.phone ?? "-";

    const tdPoint = document.createElement("td");
    tdPoint.className = "py-5";
    tdPoint.textContent = item.points ?? "-";

    const tdDate = document.createElement("td");
    tdDate.className = "py-5 text-(--admin-gray)";
    tdDate.textContent = item.createdAt?.split("T")[0] ?? "-";

    const tdButton = document.createElement("td");
    tdButton.className = "py-5 flex gap-2";

    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.className = "cursor-pointer";
    detailButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M1.71833 10.29C1.64888 10.1029 1.64888 9.89709 1.71833 9.71C2.39475 8.06987 3.54293 6.66753 5.01731 5.68074C6.49169 4.69396 8.22587 4.16718 10 4.16718C11.7741 4.16718 13.5083 4.69396 14.9827 5.68074C16.4571 6.66753 17.6052 8.06987 18.2817 9.71C18.3511 9.89709 18.3511 10.1029 18.2817 10.29C17.6052 11.9301 16.4571 13.3325 14.9827 14.3192C13.5083 15.306 11.7741 15.8328 10 15.8328C8.22587 15.8328 6.49169 15.306 5.01731 14.3192C3.54293 13.3325 2.39475 11.9301 1.71833 10.29Z" stroke="#155DFC" stroke-width="1.66667"/>
        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#155DFC" stroke-width="1.66667"/>
      </svg>
    `;

    const deletebutton = document.createElement("button");
    deletebutton.type = "button";
    deletebutton.id = "delete";
    deletebutton.className = "cursor-pointer";
    deletebutton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H17.5" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8333 5V16.6667C15.8333 17.5 15 18.3333 14.1667 18.3333H5.83334C5.00001 18.3333 4.16667 17.5 4.16667 16.6667V5" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66667 4.99999V3.33332C6.66667 2.49999 7.50001 1.66666 8.33334 1.66666H11.6667C12.5 1.66666 13.3333 2.49999 13.3333 3.33332V4.99999" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33333 9.16666V14.1667" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6667 9.16666V14.1667" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `;

    tdButton.appendChild(detailButton);
    tdButton.appendChild(deletebutton);

    tr.appendChild(tdIndex);
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdPhone);
    tr.appendChild(tdPoint);
    tr.appendChild(tdDate);
    tr.appendChild(tdButton);

    tbody.appendChild(tr);

    showDetails(detailButton, item.userId, (id) => `/admin/pages/user-details.html?userId=${id}`);
    userDelete(deletebutton, item.userId, render);
  });
}