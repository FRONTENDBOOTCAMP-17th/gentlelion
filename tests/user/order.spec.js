import { test, expect } from '@playwright/test';

const ORDER_PATH = '/components/order/order.html';
const LOGIN_PATH = '/components/login/login.html';
const API_ORDERS = 'https://api.fullstackfamily.com/api/gentlelion/v1/orders';

test.describe('결제 페이지', () => {

  // 실제 로그인으로 토큰 획득
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PATH);
    await page.locator('#emailInput').fill('123@123.com');
    await page.locator('#pwInput').fill('123');

    await Promise.all([
      page.waitForURL('/'),
      page.locator('button[type="submit"]').click(),
    ]);
  });

  test('구매 버튼 클릭 시 주문 API가 호출되고 홈으로 이동한다', async ({ page }) => {
    // API 호출 캡처
    let requestBody = null;
    await page.route(API_ORDERS, async route => {
      requestBody = JSON.parse(route.request().postData());
      const response = await route.fetch(); // 실제 API 호출
      await route.fulfill({ response }); // 응답 그대로 전달
    });

    await page.goto(ORDER_PATH);

    // 구매 버튼 렌더링 대기
    await expect(page.locator('.order-checkout-btn').first()).toBeVisible({ timeout: 10000 });
    await page.locator('.order-checkout-btn').first().click();

    // API 요청 body 검증
    expect(requestBody).not.toBeNull();
    expect(requestBody.items).toBeDefined();
    expect(requestBody.shippingAddress).toBeDefined();
    expect(requestBody.paymentMethod).toBe('points');

    // 주문 성공 후 홈으로 이동
    await expect(page).toHaveURL('/', { timeout: 10000 });
  });

});