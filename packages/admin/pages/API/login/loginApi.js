import { post } from "@gentlelion/share-api";

export const loginAPI = async (email, password) => {
  const data = await post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};
