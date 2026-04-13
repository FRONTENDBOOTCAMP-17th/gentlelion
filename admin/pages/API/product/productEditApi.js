import { put } from "../../../../shareApi/index.js";

export const editProduct = (id, productData) =>
  put(`/admin/products/${id}`, productData);
