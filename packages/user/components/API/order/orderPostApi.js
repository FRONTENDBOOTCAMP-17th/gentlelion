import { post } from "@gentlelion/share-api";

export const orderPostApi = (items, shippingAddress, pointsToUse) =>
  post("/orders", {
    items,
    shippingAddress,
    paymentMethod: "points",
    pointsToUse,
  });
