import { post } from "../../../../shareApi/index.js";

export const postWithdrawApi = (password) =>
  post("/user/me/withdraw", { password });
