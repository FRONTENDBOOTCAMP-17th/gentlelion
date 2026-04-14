import { post } from "../../../../shareApi/index.js";

export const postWishlist = (productId) =>
  post("/wishlist", { productId, color: "Black" });
