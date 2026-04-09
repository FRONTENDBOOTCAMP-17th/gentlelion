export function renderRows(tbody, items, config) {
  tbody.innerHTML = "";

  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = "text-[14px]";

    config.columns.forEach(({ getValue, className }) => {
      const td = document.createElement("td");
      td.className = className;
      td.textContent = getValue(item) ?? "-";
      tr.appendChild(td);
    });

    if (typeof config.renderButtons === "function") {
      const tdButton = document.createElement("td");
      tdButton.className = config.buttonCellClass ?? "py-5";
      config.renderButtons(tdButton, item);
      tr.appendChild(tdButton);
    }

    tbody.appendChild(tr);
  });
}