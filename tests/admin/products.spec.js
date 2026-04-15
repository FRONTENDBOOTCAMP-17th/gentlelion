import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("상품 목록 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/products.html");
  });

  test("상품 목록 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/products/);
  });

  test("상품 테이블이 표시된다", async ({ page }) => {
    await expect(page.locator("table, .product-list")).toBeVisible();
  });

  test("상품 목록에 행(row)이 1개 이상 표시된다", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  });

  test("상품 추가 버튼이 존재한다", async ({ page }) => {
    const addBtn = page.locator(
      'button:has-text("추가"), a:has-text("추가"), button:has-text("등록"), a[href*="productsAdd"], .add-btn',
    );
    await expect(addBtn.first()).toBeVisible();
  });

  test("상품 추가 버튼 클릭 시 상품 추가 페이지로 이동한다", async ({
    page,
  }) => {
    const addBtn = page.locator(
      'button:has-text("추가"), a:has-text("추가"), button:has-text("등록"), a[href*="productsAdd"], .add-btn',
    );
    await addBtn.first().click();
    await expect(page).toHaveURL(/productsAdd/);
  });

  test("편집 버튼 클릭 시 상품 수정 페이지로 이동한다", async ({ page }) => {
    const editBtn = page.locator("table tbody tr").first().locator("#editBtn");
    await Promise.all([page.waitForURL(/productEdit/), editBtn.click()]);
    await expect(page).toHaveURL(/productEdit/);
  });

  // API 테스트
  test("상품 목록 API가 200을 반환한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/products") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/products.html"),
    ]);
    expect(response.status()).toBe(200);
  });

  test("상품 목록 API 응답에 데이터와 페이지네이션 정보가 존재한다", async ({
    page,
  }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/products") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/products.html"),
    ]);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.meta).toBeDefined();
    expect(body.meta.totalCount).toBeDefined();
  });
});
