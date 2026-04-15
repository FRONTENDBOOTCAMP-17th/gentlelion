import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("주문 상세 페이지", () => {
  let popup;

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/orders.html");

    const detailBtn = page
      .locator("#productTableBody tr")
      .first()
      .locator("td:last-child button")
      .first();

    [popup] = await Promise.all([
      page.waitForEvent("popup"),
      detailBtn.click(),
    ]);

    await popup.waitForLoadState();
  });

  test("주문 상세 페이지가 정상적으로 로드된다", async () => {
    await expect(popup).toHaveURL(/order-details/);
  });

  test("주문 정보(주문번호, 사용자 ID, 주문일시)가 표시된다", async () => {
    await expect(popup.locator("#orderNumber")).toBeVisible();
    await expect(popup.locator("#userId")).toBeVisible();
    await expect(popup.locator("#create_At")).toBeVisible();
  });

  test("배송지 정보가 표시된다", async () => {
    await expect(popup.locator("#recipientName")).toBeVisible();
    await expect(popup.locator("#phone")).toBeVisible();
    await expect(popup.locator("#address")).toBeVisible();
  });

  test("결제 정보가 표시된다", async () => {
    await expect(popup.locator("#price")).toBeVisible();
    await expect(popup.locator("#shippingFee")).toBeVisible();
  });

  test("주문 상품 목록이 표시된다", async () => {
    await expect(popup.locator("#itemList")).toBeVisible();
  });

  test("닫기 버튼이 존재한다", async () => {
    await expect(popup.locator("#cancelBtn")).toBeVisible();
  });

  // API 테스트
  test("주문 상세 API가 200을 반환한다", async () => {
    const url = popup.url();
    const orderId = new URL(url).searchParams.get("orderId");

    const response = await popup.request.get(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${await popup.evaluate(() => localStorage.getItem("token"))}`,
        },
      },
    );
    expect(response.status()).toBe(200);
  });

  test("주문 상세 API 응답에 주문 정보가 존재한다", async () => {
    const url = popup.url();
    const orderId = new URL(url).searchParams.get("orderId");

    const response = await popup.request.get(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${await popup.evaluate(() => localStorage.getItem("token"))}`,
        },
      },
    );
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.orderId).toBeDefined();
  });
});
