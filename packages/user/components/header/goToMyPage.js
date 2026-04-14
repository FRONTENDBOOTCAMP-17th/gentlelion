import { get } from "@gentlelion/share-api";

export async function goToMyPage() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/components/login/login.html";
    return;
  }

  try {
    await get("/user/profile");
    window.location.href = "/components/profile/profile.html";
  } catch (e) {
    localStorage.removeItem("token");
    window.location.href = "/components/login/login.html";
  }
}
