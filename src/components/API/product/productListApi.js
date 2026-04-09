export async function getProductList(category, limit, page) {
  const API_URL =
    `https://api.fullstackfamily.com/api/gentlelion/v1/products?category=${category}&limit=${limit}&page=${page}`;

  try {
    const response = await fetch(API_URL, {
      method: "GET"
    });

    if (!response.ok) throw new Error("상품 목록 로드 실패");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}