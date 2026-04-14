import { get } from "@gentlelion/share-api";

export const orderDetailsAPI = (id) => get(`/admin/orders/${id}`);
