import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("주문 목록 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/orders.html");
  });

  test("주문 목록 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/orders/);
  });

  test("주문 테이블이 표시된다", async ({ page }) => {
    await expect(page.locator("table")).toBeVisible();
  });

  test("주문 목록에 행(row)이 1개 이상 표시된다", async ({ page }) => {
    await expect(page.locator("#productTableBody tr").first()).toBeVisible();
  });

  test("검색 기능이 존재한다", async ({ page }) => {
    await expect(page.locator("#search")).toBeVisible();
  });

  test("페이지네이션 버튼이 표시된다", async ({ page }) => {
    await expect(
      page.locator("#listButtonComponents button").first(),
    ).toBeVisible();
  });

  test("상세보기 버튼 클릭 시 주문 상세 페이지가 새 탭으로 열린다", async ({
    page,
  }) => {
    const detailBtn = page
      .locator("#productTableBody tr")
      .first()
      .locator("td:last-child button")
      .first();

    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      detailBtn.click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup).toHaveURL(/order-details/);
  });

  // API 테스트
  test("주문 목록 API가 200을 반환한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/orders") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/orders.html"),
    ]);
    expect(response.status()).toBe(200);
  });

  test("주문 목록 API 응답에 데이터가 존재한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/orders") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/orders.html"),
    ]);
    const body = await response.json();

    expect(body.data).toBeDefined();
  });
});
