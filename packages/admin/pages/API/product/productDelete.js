import { del } from "@gentlelion/share-api";

export const deleteProduct = (id) => del(`/admin/products/${id}`);
