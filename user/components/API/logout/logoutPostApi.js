import { post } from "../../../../shareApi/index.js";

export const logoutPostApi = () => post("/auth/logout");