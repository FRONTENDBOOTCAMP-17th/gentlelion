import { get } from "../../../../shareApi/index.js";

export const orderAPI = (page) => get(`/admin/orders?page=${page}`);
