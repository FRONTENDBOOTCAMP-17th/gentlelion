import { del } from "../../../../shareApi/index.js";

export const delCartlist = (cartItemId) => del(`/cart/${cartItemId}`);
