import { get } from "../../../../shareApi/index.js";

export const getProfileApi = async () => {
  const data = await get("/user/profile");
  return data.data;
};
