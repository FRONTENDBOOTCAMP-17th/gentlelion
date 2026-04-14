import { post } from "../../../../shareApi/index.js";

export const loginPostApi = (email, password) =>
  post("/auth/login", { email, password });
