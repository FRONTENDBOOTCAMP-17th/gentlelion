import { toggleMenu, initToggleMenu } from "./toggleMenu.js";
import { dashboardAPI } from "../../API/dashboard/dashboardApi.js";
import { logoutAPI } from "../../API/login/logoutApi.js";
import { renderDashboardRows } from "./renderDashboardRows.js";

window.toggleMenu = toggleMenu;
window.logout = logoutAPI;

async function dashboard() {
  try {
    const data = await dashboardAPI();

    if (!data) {
      console.error("데이터 없음");
      return;
    }

    const { recentOrders, summary } = data;

    document.getElementById("stat-users").textContent = summary.totalUsers;
    document.getElementById("stat-products").textContent = summary.totalProducts;
    document.getElementById("stat-orders").textContent = summary.totalOrders;
    document.getElementById("stat-revenue").textContent = summary.totalRevenue.toLocaleString() + "원";

    console.log(data.recentOrders)
    const orders = Array.isArray(data.recentOrders) ? data.recentOrders : [];

    const tbody = document.querySelector("tbody");
    if (!tbody) {
      throw new Error("tbody를 찾을 수 없습니다.");
    }

    renderDashboardRows(tbody, orders);
    console.log("렌더링 후 tbody 행 수:", tbody.rows.length); // ✅ 몇 개 추가됐는지 확인

    initToggleMenu();
  } catch (error) {
    console.error(error);
  }
}

dashboard();
