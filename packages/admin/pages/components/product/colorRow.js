export function createColorRow({ value = "", onChange, onRemove, container }) {
  const row = document.createElement("div");
  row.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.name = "colors";
  input.type = "text";
  input.placeholder = "Black";
  input.value = value;
  input.className =
    "flex-1 border border-gray-200 rounded-xl h-11 px-4 text-sm focus:border-black outline-none";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className =
    "remove-color-btn text-[#d92d20] p-2 hover:bg-red-50 rounded-lg transition-colors";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "w-5 h-5");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  );
  svg.appendChild(path);
  removeBtn.appendChild(svg);

  removeBtn.addEventListener("click", () => {
    const rows = container.querySelectorAll(".flex.items-center.gap-2");
    if (rows.length === 1) {
      input.value = "";
      onChange?.();
      return;
    }
    row.remove();
    onRemove?.();
  });

  input.addEventListener("input", () => onChange?.());

  row.appendChild(input);
  row.appendChild(removeBtn);

  return row;
}