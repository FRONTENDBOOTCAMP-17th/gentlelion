export function paginationButton(
  container,
  totalPages,
  currentPage,
  onPageChange,
) {
  if (!container || totalPages <= 1) return;

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = i;

    button.className = [
      "text-[14px]",
      "py-2",
      "px-3.5",
      "rounded-lg",
      "cursor-pointer",
      "transition-colors",
      i === currentPage
        ? "font-bold text-[#0a0a0a] border border-[#e4e7ec] bg-white"
        : "text-[#667085] hover:bg-gray-100",
    ].join(" ");

    button.addEventListener("click", () => {
      onPageChange(i);
    });

    container.appendChild(button);
  }
}
