import { del } from "../../../../shareApi/index.js";

export const delWishlist = (wishlistItemId) =>
  del(`/wishlist/${wishlistItemId}`);
