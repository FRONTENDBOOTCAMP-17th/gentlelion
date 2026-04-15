import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("상품 수정 페이지", () => {
  let productId;

  test.beforeEach(async ({ page }) => {
    await login(page);

    // 상품 목록 API에서 첫 번째 상품 ID 저장
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/admin/products") &&
          res.request().method() === "GET",
      ),
      page.goto("/pages/products.html"),
    ]);
    const body = await response.json();
    productId = body.data?.[0]?.id;

    // #editBtn 클릭으로 수정 페이지 이동
    const editBtn = page.locator("table tbody tr").first().locator("#editBtn");
    await Promise.all([page.waitForURL(/productEdit/), editBtn.click()]);

    // API로 데이터 비동기 로드 완료 대기
    await page.waitForFunction(() => {
      const input = document.querySelector('input[name="name"]');
      return input && input.value.length > 0;
    });
  });

  test("상품 수정 페이지가 정상적으로 로드된다", async ({ page }) => {
    await expect(page).toHaveURL(/productEdit/);
  });

  test("기존 상품 정보가 입력 필드에 채워져 있다", async ({ page }) => {
    const value = await page.locator('input[name="name"]').inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test("수정 버튼이 존재한다", async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("취소 버튼이 존재한다", async ({ page }) => {
    await expect(page.locator("#backBtnBottom")).toBeVisible();
  });

  // API 테스트
  test("상품 수정 API가 200을 반환한다", async ({ page }) => {
    if (!productId) return;
    const token = await page.evaluate(() => localStorage.getItem("token"));

    // 현재 폼 값 그대로 수집해서 전송
    const currentData = await page.evaluate(() => {
      const form = document.getElementById("productEditForm");
      const colorInputs = document.querySelectorAll("[name='colors']");
      const colors = [...colorInputs]
        .map((i) => i.value.trim())
        .filter(Boolean)
        .map((name) => ({ name }));
      const imageUrlInput = document.getElementById("imageUrlInput");

      return {
        name: form.name.value,
        category: form.category.value,
        price: Number(form.price.value),
        description: form.description.value,
        stock: Number(form.stock.value),
        colors,
        images: JSON.parse(imageUrlInput.value || "[]"),
        specifications: {
          frameWidth: form.frameWidth.value,
          lensHeight: form.lensHeight.value,
          lensWidth: form.lensWidth.value,
          bridgeWidth: form.bridgeWidth.value,
          templeLength: form.templeLength.value,
        },
      };
    });

    const response = await page.request.put(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/products/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data: currentData,
      },
    );
    expect(response.status()).toBe(200);
  });
});
