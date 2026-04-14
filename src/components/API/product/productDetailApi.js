const BASE_URL = "https://api.fullstackfamily.com/api/gentlelion/v1";

export async function fetchProduct(productId) {
  const res = await fetch(BASE_URL + "/products/" + productId);
  if (!res.ok) throw new Error("product_not_found");
  const json = await res.json();
  return json.data;
}

export async function fetchSimilarProducts(category, productId) {
  const res = await fetch(
    BASE_URL + "/products?category=" + category + "&limit=6",
  );
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data || [])
    .filter(function (p) {
      return String(p.id) !== String(productId);
    })
    .slice(0, 5);
}
