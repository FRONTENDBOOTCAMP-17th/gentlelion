export function showDetails(button, id, getUrl) {
  if (!button) return;
  if (id == null) {
    console.error("Id가 없습니다.");
    return;
  }

  button.addEventListener("click", () => {
    location.href = getUrl(id);
  });
}