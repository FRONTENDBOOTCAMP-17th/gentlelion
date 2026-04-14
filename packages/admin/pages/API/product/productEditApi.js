import { put } from "@gentlelion/share-api";

export const editProduct = (id, productData) =>
  put(`/admin/products/${id}`, productData);
