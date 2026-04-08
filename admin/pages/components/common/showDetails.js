export function showDetails(button, id, getUrl) {
  if (!button) return;
  if (id == null) {
    console.error("Id가 없습니다.");
    return;
  }

  button.addEventListener("click", () => {
    window.location.href = getUrl(id);
  });
}