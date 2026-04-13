import { put } from "../../../../shareApi/index.js";

export const putProfileApi = async ({ firstName, lastName, email, phone }) => {
  const data = await put("/user/profile", {
    firstName,
    lastName,
    email,
    phone,
  });
  return data.data;
};