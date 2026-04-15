import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("상품 추가 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/productsAdd.html");
  });

  test("상품 추가 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/productsAdd/);
  });

  test("상품명 입력 필드가 존재한다", async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test("가격 입력 필드가 존재한다", async ({ page }) => {
    await expect(page.locator('input[name="price"]')).toBeVisible();
  });

  test("카테고리 선택 필드가 존재한다", async ({ page }) => {
    await expect(page.locator('select[name="category"]')).toBeVisible();
  });

  test("이미지 업로드 버튼이 존재한다", async ({ page }) => {
    // input[type="file"]은 hidden → 실제 클릭 가능한 #imageUploadBtn 확인
    await expect(page.locator("#imageUploadBtn")).toBeVisible();
  });

  test("색상 추가 버튼이 존재한다", async ({ page }) => {
    await expect(page.locator("#addColorBtn")).toBeVisible();
  });

  test("추가(submit) 버튼이 존재한다", async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("필수 항목 미입력 시 폼이 제출되지 않는다", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/productsAdd/);
  });

  // API 테스트
  test("상품 등록 API가 201을 반환한다", async ({ page }) => {
    const token = await page.evaluate(() => localStorage.getItem("token"));

    const response = await page.request.post(
      "https://api.fullstackfamily.com/api/gentlelion/v1/admin/products",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: "Playwright 테스트 상품",
          category: "sunglasses",
          price: 290000,
          description: "자동화 테스트용 상품",
          stock: 10,
          colors: [{ name: "Black" }],
          images: [],
          specifications: {
            frameWidth: "140mm",
            lensHeight: "50mm",
            lensWidth: "50mm",
            bridgeWidth: "20mm",
            templeLength: "140mm",
          },
        },
      },
    );
    expect(response.status()).toBe(201);
  });
});
