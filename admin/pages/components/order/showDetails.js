export function showDetails(button, orderId) {
  if (!button) return;
  if (orderId == null) {
    console.error("orderId가 없습니다.");
    return;
  }

  button.addEventListener("click", () => {
    window.location.href = `/admin/orders/${orderId}`;
  });
}