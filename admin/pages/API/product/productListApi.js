export async function getProductList(page = 1, limit = 20) {
  const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/admin/products?page=${page}&limit=${limit}`;
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

    return {
      products: result.data,
      pagination: {
        totalCount: result.meta.totalCount,
        totalPages: result.meta.totalPages,
        page: result.meta.page,
        limit: result.meta.limit,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      pagination: { totalCount: 0, totalPages: 1, page: 1, limit },
    };
  }
}
