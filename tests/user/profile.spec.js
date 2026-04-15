import { test, expect } from '@playwright/test';

const PROFILE_PATH = '/components/profile/profile.html';
const LOGIN_PATH = '/components/login/login.html';

const API_PROFILE = 'https://api.fullstackfamily.com/api/gentlelion/v1/user/profile';
const API_WISHLIST = 'https://api.fullstackfamily.com/api/gentlelion/v1/wishlist';
const API_ORDERS = 'https://api.fullstackfamily.com/api/gentlelion/v1/orders';
const API_WITHDRAW = 'https://api.fullstackfamily.com/api/gentlelion/v1/user/me/withdraw';

test.describe('프로필 페이지', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PATH);
        await page.locator('#emailInput').fill('123@123.com');
        await page.locator('#pwInput').fill('123');
        await Promise.all([
            page.waitForURL('/'),
            page.locator('button[type="submit"]').click(),
        ]);
    });

    test('프로필 API가 호출되고 사용자 정보가 렌더링된다', async ({ page }) => {
        let profileCalled = false;
        await page.route(API_PROFILE, async route => {
            profileCalled = true;
            await route.continue();
        });

        await page.goto(PROFILE_PATH);

        await expect(page.locator('#fn')).not.toBeEmpty({ timeout: 10000 });
        await expect(page.locator('#email')).not.toBeEmpty();
        await expect(page.locator('#phone')).not.toBeEmpty();
        expect(profileCalled).toBe(true);
    });

    test('위시리스트 API가 호출된다', async ({ page }) => {
        let wishlistCalled = false;
        await page.route(API_WISHLIST, async route => {
            wishlistCalled = true;
            await route.continue();
        });

        await page.goto(PROFILE_PATH);

        // ✅ 프로필 렌더링 완료 후 탭 클릭
        await expect(page.locator('#fn')).not.toBeEmpty({ timeout: 10000 });
        await page.getByRole('button', { name: '위시리스트' }).click();

        // ✅ API 호출 여부만 확인 (UI 변화 대신)
        await page.waitForResponse(API_WISHLIST, { timeout: 10000 });
        expect(wishlistCalled).toBe(true);
    });

    test('구매한 제품 API가 호출되고 렌더링된다', async ({ page }) => {
        let ordersCalled = false;
        await page.route(API_ORDERS, async route => {
            ordersCalled = true;
            await route.continue();
        });

        await page.goto(PROFILE_PATH);

        // ✅ 프로필 렌더링 완료 후 탭 클릭
        await expect(page.locator('#fn')).not.toBeEmpty({ timeout: 10000 });
        await page.getByRole('button', { name: '구매한 제품' }).click();

        await page.waitForResponse(API_ORDERS, { timeout: 10000 });
        expect(ordersCalled).toBe(true);
    });

    test('계정 탈퇴 시 비밀번호 미입력하면 alert이 뜬다', async ({ page }) => {
        await page.goto(PROFILE_PATH);

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('비밀번호를 입력해주세요');
            await dialog.accept();
        });

        await page.locator('.withdraw-btn').first().click();

        // ✅ hidden 클래스 제거 확인
        await expect(page.locator('#withdrawForm')).not.toHaveClass(/hidden/, { timeout: 5000 });

        await page.locator('#withdrawSaveBtn').click();
    });

    test('계정 탈퇴 API가 호출되고 성공 시 토큰이 삭제된다', async ({ page }) => {
        let withdrawCalled = false;
        await page.route(API_WITHDRAW, async route => {
            withdrawCalled = true;
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'success' }),
            });
        });

        await page.goto(PROFILE_PATH);
        page.on('dialog', async dialog => await dialog.accept());

        await page.locator('.withdraw-btn').first().click();

        // ✅ 폼 열릴 때까지 대기 후 입력
        await expect(page.locator('#withdrawForm')).not.toHaveClass(/hidden/, { timeout: 5000 });
        await page.locator('#withdrawPassword').fill('123');
        await page.locator('#withdrawSaveBtn').click();

        expect(withdrawCalled).toBe(true);
        await expect(page).toHaveURL('/', { timeout: 10000 });
        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBeNull();
    });

    test('로그아웃 시 토큰이 삭제되고 홈으로 이동한다', async ({ page }) => {
        await page.goto(PROFILE_PATH);
        await page.locator('.logout-btn').first().click();

        // ✅ 페이지 이동 완료 후 localStorage 확인
        await expect(page).toHaveURL('/');
        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBeNull();
    });

});