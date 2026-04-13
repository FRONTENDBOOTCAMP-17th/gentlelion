import { get } from "../../../../shareApi/index.js";

export const userDetailAPI = async (id) => {
  const data = await get(`/admin/users/${id}`);
  return data.data;
};
