import { get } from "@gentlelion/share-api";

export const getProductList = (category, limit, page) =>
  get(`/products?category=${category}&limit=${limit}&page=${page}`);
