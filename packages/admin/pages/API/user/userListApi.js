import { get } from "@gentlelion/share-api";

export const userApi = (page, limit = 20) =>
  get(`/admin/users?page=${page}&limit=${limit}`);
