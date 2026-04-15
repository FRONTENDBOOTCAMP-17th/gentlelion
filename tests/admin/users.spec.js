import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("사용자 목록 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/users.html");
  });

  test("사용자 목록 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/users/);
  });

  test("사용자 테이블이 표시된다", async ({ page }) => {
    await expect(
      page.locator('table, .user-list, [class*="user"]'),
    ).toBeVisible();
  });

  test("사용자 목록에 행(row)이 1개 이상 표시된다", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  });

  test("검색 기능이 존재한다", async ({ page }) => {
    await expect(
      page.locator(
        'input[type="search"], input[placeholder*="검색"], .search-input, #search',
      ),
    ).toBeVisible();
  });

  test("상세보기 버튼 클릭 시 상세 페이지가 새 탭으로 열린다", async ({
    page,
  }) => {
    const detailBtn = page
      .locator("table tbody tr")
      .first()
      .locator("td:last-child button")
      .first();

    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      detailBtn.click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup).toHaveURL(/user-details/);
  });

  // API 테스트
  test("사용자 목록 API가 200을 반환한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/users") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/users.html"),
    ]);
    expect(response.status()).toBe(200);
  });

  test("사용자 목록 API 응답에 데이터가 존재한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/users") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/users.html"),
    ]);
    const body = await response.json();

    expect(body.data).toBeDefined();
  });
});
