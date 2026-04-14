import { put } from "../../../../shareApi/index.js";

export const putCartApi = (cartItemId, quantity) =>
  put("/cart", { cartItemId, quantity: Number(quantity) });
