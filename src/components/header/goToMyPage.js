import { get } from "../../../shareApi/index.js";

export async function goToMyPage() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/src/components/login/login.html";
    return;
  }

  try {
    await get("/user/profile");
    window.location.href = "/src/components/profile/profile.html";
  } catch (e) {
    localStorage.removeItem("token");
    window.location.href = "/src/components/login/login.html";
  }
}
