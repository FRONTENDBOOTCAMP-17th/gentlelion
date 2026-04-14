import { put } from "@gentlelion/share-api";

export const putCartApi = (cartItemId, quantity) =>
  put("/cart", { cartItemId, quantity: Number(quantity) });
