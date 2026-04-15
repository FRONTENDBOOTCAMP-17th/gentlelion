import { toggleMenu } from "../common/toggleMenu.js";
import { dashboardAPI } from "../../API/dashboard/dashboardApi.js";
import { logoutAPI } from "../../API/login/logoutApi.js";
import { renderDashboardRows } from "./renderDashboardRows.js";
import { loadSidebar } from "../aside/dashboardNavigation.js"

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

    const orders = Array.isArray(recentOrders) ? recentOrders : [];

    const tbody = document.querySelector("tbody");
    if (!tbody) {
      throw new Error("tbody를 찾을 수 없습니다.");
    }

    renderDashboardRows(tbody, orders);
    await loadSidebar();
    toggleMenu();
  } catch (error) {
    if (error.status === 401) {
      alert("권한이 없습니다.");
      window.location.href = "/admin/pages/login.html";
      return;
    }
    console.error(error);
  }
}

dashboard();
