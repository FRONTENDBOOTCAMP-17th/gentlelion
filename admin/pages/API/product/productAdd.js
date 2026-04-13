import { post } from "../../../../shareApi/index.js";

export const addProduct = (productData) => post("/admin/products", productData);
