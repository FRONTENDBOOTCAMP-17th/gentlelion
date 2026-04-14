import { post } from "@gentlelion/share-api";

export const logoutPostApi = () => post("/auth/logout");