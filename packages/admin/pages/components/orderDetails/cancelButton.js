export function cancelButton() {
  const cancelBtn = document.getElementById("exitBtn");
  if (!cancelBtn) {
    return;
  }
  cancelBtn.addEventListener("click", () => {
    console.log("클릭돔");
    history.back()
  });
}
