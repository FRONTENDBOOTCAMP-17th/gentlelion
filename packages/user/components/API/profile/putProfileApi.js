import { put } from "@gentlelion/share-api";

export const putProfileApi = async ({ firstName, lastName, phone }) => {
  const data = await put("/user/profile", {
    firstName,
    lastName,
    phone,
  });
  return data.data;
};