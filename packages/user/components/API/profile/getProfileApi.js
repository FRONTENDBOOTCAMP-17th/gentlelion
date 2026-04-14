import { get } from "@gentlelion/share-api";

export const getProfileApi = async () => {
  const data = await get("/user/profile");
  return data.data;
};
