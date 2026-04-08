export async function getProductList() {
  const API_URL =
    "https://api.fullstackfamily.com/api/gentlelion/v1/admin/products";
  const TOKEN = localStorage.getItem("admin_token");

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("상품 목록 로드 실패");

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
