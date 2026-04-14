import { post } from "../../../../shareApi/index.js";

export const postCartApi = (productId, quantity, color) =>
  post("/cart", {
    productId,
    quantity,
    color
  });
