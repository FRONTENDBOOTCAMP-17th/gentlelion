import { post } from "@gentlelion/share-api";

export const addProduct = (productData) => post("/admin/products", productData);
