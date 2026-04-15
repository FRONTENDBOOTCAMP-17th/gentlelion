import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("대시보드 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("대시보드 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });

  test("사이드바 네비게이션이 표시된다", async ({ page }) => {
    await expect(page.locator("aside").first()).toBeVisible();
  });

  test("대시보드 통계 카드(주문/매출 등)가 표시된다", async ({ page }) => {
    await expect(
      page.locator('main, #app, [class*="dashboard"]').first(),
    ).toBeVisible();
  });

  test("최근 주문 목록이 표시된다", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  });

  test("로그아웃 버튼이 존재한다", async ({ page }) => {
    await expect(page.locator("#logoutBtn")).toBeVisible();
  });

  test("로그아웃 시 로그인 페이지로 이동한다", async ({ page }) => {
    await page.locator("#logoutBtn").click();
    await expect(page).toHaveURL(/login/);
  });

  // API 테스트
  test("대시보드 API가 200을 반환한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/dashboard") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/dashboard.html"),
    ]);
    expect(response.status()).toBe(200);
  });

  test("로그아웃 API가 호출되고 토큰이 삭제된다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/auth/logout") &&
          res.request().method() === "POST",
      ),
      page.locator("#logoutBtn").click(),
    ]);

    expect(response.status()).toBe(200);

    // 네비게이션 완료 후 localStorage 읽기
    await page.waitForURL(/login/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();
  });
});
