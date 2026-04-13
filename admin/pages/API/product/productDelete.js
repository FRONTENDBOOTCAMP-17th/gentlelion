import { del } from "../../../../shareApi/index.js";

export const deleteProduct = (id) => del(`/admin/products/${id}`);
