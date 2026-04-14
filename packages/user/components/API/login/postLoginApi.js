import { post } from "@gentlelion/share-api";

export const loginPostApi = (email, password) =>
  post("/auth/login", { email, password });
