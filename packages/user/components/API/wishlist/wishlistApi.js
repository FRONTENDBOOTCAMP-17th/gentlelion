import { get } from "@gentlelion/share-api";
import { getToken } from "../token/getToken";

export const getWishlist = () => {
  if (!getToken()) {
    return;
  }

  return get("/wishlist").catch((err) => {
    if (err.status === 401) return null;
    throw err;
  });
};
