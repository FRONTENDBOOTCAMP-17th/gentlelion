import { get } from "@gentlelion/share-api";

export async function getProductList(page = 1, limit = 20) {
  try {
    const result = await get(`/admin/products?page=${page}&limit=${limit}`);
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
    if (error.status === 401) {
      window.location.href = "/admin/pages/login.html";
      return;
    }
  }
}
