import { post } from "@gentlelion/share-api";

export const postCartApi = (productId, quantity, color) =>
  post("/cart", {
    productId,
    quantity,
    color
  });
