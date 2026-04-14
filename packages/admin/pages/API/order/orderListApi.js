import { get } from "@gentlelion/share-api";

export const orderAPI = (page) => get(`/admin/orders?page=${page}`);
