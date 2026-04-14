export function renderRows(tbody, products) {
  tbody.innerHTML = "";

  products.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className =
      "text-[14px] border-b border-gray-100 hover:bg-gray-50 transition-colors";

    const tdId = document.createElement("td");
    tdId.className = "px-6 py-5 font-bold text-[#0a0a0a]";
    tdId.textContent = item.id ?? "-";

    const tdName = document.createElement("td");
    tdName.className = "px-6 py-5 text-admin-gray";
    tdName.textContent = item.name ?? "-";

    const tdCategory = document.createElement("td");
    tdCategory.className = "px-6 py-5 text-admin-gray";
    const categoryMap = { sunglasses: "선글라스", optical: "안경" };
    tdCategory.textContent = categoryMap[item.category] || item.category || "-";

    const tdPrice = document.createElement("td");
    tdPrice.className = "px-6 py-5 font-bold text-[#0a0a0a]";
    tdPrice.textContent =
      item.price != null ? `₩${item.price.toLocaleString()}` : "-";

    const tdStock = document.createElement("td");
    tdStock.className = "px-6 py-5";
    const stockSpan = document.createElement("span");
    if (item.stock > 0) {
      stockSpan.className =
        "px-2 py-1 rounded-full bg-green-50 text-[12px] text-green-600 font-bold";
      stockSpan.textContent = `${item.stock}개`;
    } else {
      stockSpan.className =
        "px-2 py-1 rounded-full bg-red-50 text-[12px] text-admin-red font-bold";
      stockSpan.textContent = "품절";
    }
    tdStock.appendChild(stockSpan);

    const tdActions = document.createElement("td");
    tdActions.className = "px-6 py-5 text-right";

    const actionContainer = document.createElement("div");
    actionContainer.className = "flex justify-end gap-3";
    actionContainer.innerHTML = `
      <button id="editBtn" data-id="${item.id}" class="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors cursor-pointer">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button id="deleteBtn" data-id="${item.id}" class="text-admin-red hover:bg-red-50 p-1 rounded transition-colors cursor-pointer">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    `;
    const editBtn = actionContainer.querySelector("#editBtn");

    editBtn.addEventListener("click", () => {
      location.href = `productEdit.html?id=${item.id}`;
    });

    tdActions.appendChild(actionContainer);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdPrice);
    tr.appendChild(tdStock);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}
