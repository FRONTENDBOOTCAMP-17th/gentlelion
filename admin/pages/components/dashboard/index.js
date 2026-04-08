import { render } from "./render.js";
import { toggleMenu, initToggleMenu } from "./toggleMenu.js";
import { dashboardAPI } from "../../API/dashboard/dashboardApi.js";
import { logoutAPI } from "../../API/login/logoutApi.js";

window.toggleMenu = toggleMenu;
window.logout = logoutAPI;

async function dashboard() {
  try {
    const data = await dashboardAPI();

    if (!data) {
      console.error("데이터 없음");
      return;
    }

    render(data);
    initToggleMenu();
  } catch (error) {
    console.error(error);
  }
}

dashboard();
