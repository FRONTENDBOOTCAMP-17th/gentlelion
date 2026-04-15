import { post } from "@gentlelion/share-api";

export const postWishlist = (productId, color) =>
  post("/wishlist", { productId, color });
