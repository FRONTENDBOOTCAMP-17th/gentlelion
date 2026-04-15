import { test, expect } from '@playwright/test';

const CART_PATH = '/components/cart/cart.html';
const LOGIN_PATH = '/components/login/login.html';

test.describe('장바구니 페이지', () => {

    // ✅ 실제 로그인으로 토큰 획득
    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PATH);
        await page.locator('#emailInput').fill('123@123.com');
        await page.locator('#pwInput').fill('123');

        await Promise.all([
            page.waitForURL('/'),
            page.locator('button[type="submit"]').click(),
        ]);
    });

    test('장바구니 상품이 렌더링된다', async ({ page }) => {
        await page.goto(CART_PATH);
        await expect(page.locator('#productContainer')).not.toBeEmpty({ timeout: 10000 });
    });

    test('결제하기 클릭 시 주문 페이지로 이동한다', async ({ page }) => {
        await page.goto(CART_PATH);

        await expect(page.getByRole('link', { name: /결제하기/ })).toBeVisible({ timeout: 10000 });
        await page.getByRole('link', { name: /결제하기/ }).click();
        await expect(page).toHaveURL(/order\/order\.html/);
    });

    test('로그아웃 상태에서 장바구니 접근 시 alert이 뜬다', async ({ page }) => {
        await page.evaluate(() => localStorage.removeItem('token'));

        page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await page.goto(CART_PATH);
        await expect(page).toHaveURL(/login/);
    });

});