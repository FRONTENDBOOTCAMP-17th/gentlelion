import { test, expect } from "@playwright/test";

test.describe("안경 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/glasses.html");
  });

  test("안경 상품 목록이 API에서 불러와서 렌더링된다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/products") &&
          res.url().includes("optical") &&
          res.status() === 200,
      ),
      page.goto("/pages/glasses.html"),
    ]);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);

    const cards = page.locator("#productContainer .product-name");
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("상품 카드에 이름, 가격, 이미지가 표시된다", async ({ page }) => {
    await page.waitForSelector("#productContainer .product-name");

    await expect(page.locator(".product-name").first()).toBeVisible();
    await expect(page.locator(".product-price").first()).toBeVisible();
    await expect(page.locator(".product-image").first()).toBeVisible();
  });

  test("상품 클릭 시 상품 상세 페이지로 이동한다", async ({ page }) => {
    await page.waitForSelector("#productContainer a");

    const firstProduct = page.locator("#productContainer a").first();
    await firstProduct.click();

    await expect(page).toHaveURL(/product-detail/);
  });

  test("더보기 버튼 클릭 시 추가 상품이 로드된다", async ({ page }) => {
    await page.waitForSelector("#productContainer .product-name");

    const beforeCount = await page
      .locator("#productContainer .product-name")
      .count();

    await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/products") &&
          res.url().includes("optical") &&
          res.status() === 200,
      ),
      page.click("#moreButtonEvent"),
    ]);

    await page.waitForFunction(
      (count) =>
        document.querySelectorAll("#productContainer .product-name").length >
        count,
      beforeCount,
    );

    const afterCount = await page
      .locator("#productContainer .product-name")
      .count();
    expect(afterCount).toBeGreaterThan(beforeCount);
  });
});
