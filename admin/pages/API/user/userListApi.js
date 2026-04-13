import { get } from "../../../../shareApi/index.js";

export const userApi = (page, limit = 20) =>
  get(`/admin/users?page=${page}&limit=${limit}`);
