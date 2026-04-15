import { test, expect } from "@playwright/test";

const TEST_PRODUCT_ID = "1";

test.describe("상품 상세 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/pages/product-detail.html?productId=${TEST_PRODUCT_ID}`);
  });

  test("상품 정보가 API에서 불러와서 렌더링된다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes(`/products/${TEST_PRODUCT_ID}`) &&
          res.status() === 200,
      ),
      page.goto(`/pages/product-detail.html?productId=${TEST_PRODUCT_ID}`),
    ]);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.data).toBeTruthy();

    await expect(page.locator("#productName")).toBeVisible();
    await expect(page.locator("#productPrice")).toBeVisible();
  });

  test("상품 이름과 가격이 정상적으로 표시된다", async ({ page }) => {
    await page.waitForSelector("#productName");

    const name = await page.locator("#productName").textContent();
    const price = await page.locator("#productPrice").textContent();

    expect(name).toBeTruthy();
    expect(price).toContain("원");
  });

  test("쇼핑백에 추가하기 버튼이 표시된다", async ({ page }) => {
    await page.waitForSelector("#cartBtn");
    const cartBtn = page.locator("#cartBtn");
    await expect(cartBtn).toBeVisible();

    await page.waitForFunction(() => {
      const btn = document.getElementById("cartBtn");
      return btn && btn.textContent.trim() !== "";
    });

    const btnText = await cartBtn.textContent();
    expect(["쇼핑백에 추가하기", "알림 받기"]).toContain(btnText.trim());
  });
  test("존재하지 않는 상품 ID로 접근 시 오류 메시지가 표시된다", async ({
    page,
  }) => {
    await page.goto("/pages/product-detail.html?productId=99999999");
    await page.waitForSelector("#productName");

    const name = await page.locator("#productName").textContent();
    expect(name).toBe("존재하지 않는 상품입니다.");
  });
  test("색상칩이 렌더링된다", async ({ page }) => {
    await page.waitForSelector("#colorChips");

    const colorChips = page.locator("#colorChips");
    await expect(colorChips).toBeVisible();
    await page.waitForFunction(() => {
      const chips = document.getElementById("colorChips");
      return chips && chips.children.length > 0;
    });

    const chipCount = await page.locator("#colorChips > *").count();
    expect(chipCount).toBeGreaterThan(0);
  });
});
