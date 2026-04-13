import { get } from "../../../../shareApi/index.js";

export const getProductList = (category, limit, page) =>
  get(`/products?category=${category}&limit=${limit}&page=${page}`);
