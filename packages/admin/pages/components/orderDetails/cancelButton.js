export function cancelButton() {
  const cancelBtn = document.getElementById("cancelBtn");
  if (!cancelBtn) return;
  cancelBtn.addEventListener("click", () => window.close());
}
