export function paginationButton(container, totalPages, currentPage, onPageChange) {
  if (!container || totalPages <= 1) return;

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = i;

    button.className = [
      "text-[14px]",
      "py-2",
      "px-3.75",
      "rounded-lg",
      "cursor-pointer",
      i === currentPage ? "border border-(--admin-border)" : ""
    ].join(" ");

    button.addEventListener("click", () => {
      onPageChange(i);
    });

    container.appendChild(button);
  }
}