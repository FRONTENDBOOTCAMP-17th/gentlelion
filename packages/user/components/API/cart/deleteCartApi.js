import { del } from "@gentlelion/share-api";

export const delCartlist = (cartItemId) => del(`/cart/${cartItemId}`);
