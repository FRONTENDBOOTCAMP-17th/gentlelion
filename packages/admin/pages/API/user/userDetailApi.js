import { get } from "@gentlelion/share-api";

export const userDetailAPI = async (id) => {
  const data = await get(`/admin/users/${id}`);
  return data.data;
};
