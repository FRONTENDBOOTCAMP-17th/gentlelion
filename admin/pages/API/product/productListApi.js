import { get } from "../../../../shareApi/index.js";

export async function getProductList(page = 1, limit = 20) {
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
}
