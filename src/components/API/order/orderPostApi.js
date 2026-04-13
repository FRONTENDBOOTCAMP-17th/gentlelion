import { post } from "../../../../shareApi/index.js";

export const orderPostApi = (items, shippingAddress, pointsToUse) =>
  post("/orders", {
    items,
    shippingAddress,
    paymentMethod: "points",
    pointsToUse,
  });
