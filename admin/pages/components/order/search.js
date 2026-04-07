export function search(orders, input, onSearch) {
  if (!input) return;

  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      onSearch(orders);
      return;
    }

    const filteredOrders = orders.filter((item) => {
      const recipientName = item.shippingAddress.recipientName.toLowerCase() ?? "";
      const orderNumber = item.orderNumber.toLowerCase() ?? "";

      return (
        recipientName.includes(keyword) ||
        orderNumber.includes(keyword)
      );
    });

    onSearch(filteredOrders);
  });
}