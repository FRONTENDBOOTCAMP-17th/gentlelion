import { post } from "@gentlelion/share-api";

export const logoutAPI = async () => {
  await post("/auth/logout");
  localStorage.removeItem("token");
  window.location.href = "./login.html";
};
