import { post } from "@gentlelion/share-api";

export const postWishlist = (productId) =>
  post("/wishlist", { productId, color: "Black" });
