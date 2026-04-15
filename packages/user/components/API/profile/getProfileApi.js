import { get } from "@gentlelion/share-api";
import { getToken } from "../token/getToken";

export const getProfileApi = async () => {
  if (!getToken()) {
    return;
  }
  const data = await get("/user/profile");
  return data.data;
};
