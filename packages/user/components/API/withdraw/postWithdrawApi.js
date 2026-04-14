import { post } from "@gentlelion/share-api";

export const postWithdrawApi = (password) =>
  post("/user/me/withdraw", { password });
