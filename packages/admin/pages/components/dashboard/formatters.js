export function formatPrice(n) {
  if (n >= 1000000) return "₩" + (n / 1000000).toFixed(0) + "M";
  return n.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
}

export function formatDate(iso) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
