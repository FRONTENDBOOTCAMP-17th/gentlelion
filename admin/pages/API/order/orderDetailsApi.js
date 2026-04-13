import { get } from "../../../../shareApi/index.js";

export const orderDetailsAPI = (id) => get(`/admin/orders/${id}`);
