import { del } from "@gentlelion/share-api";

export const delWishlist = (wishlistItemId) =>
  del(`/wishlist/${wishlistItemId}`);
