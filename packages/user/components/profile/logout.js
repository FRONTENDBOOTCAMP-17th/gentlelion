import { logoutPostApi } from "../API/logout/logoutPostApi.js";

export function logout() {
    const buttons = document.querySelectorAll(".logout-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            try {
                await logoutPostApi();
            } catch (e) {
            } finally {
                localStorage.removeItem("token");
                location.href = "/";
            }
        });
    });
}