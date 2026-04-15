import { get } from "@gentlelion/share-api";

export async function fetchProduct(productId) {
  const json = await get(`/products/${productId}`);
  return json.data;
}

export async function fetchSimilarProducts(category, productId) {
  try {
    const json = await get(`/products?category=${category}&limit=6`);
    return (json.data || [])
      .filter((p) => String(p.id) !== String(productId))
      .slice(0, 5);
  } catch {
    return [];
  }
}
