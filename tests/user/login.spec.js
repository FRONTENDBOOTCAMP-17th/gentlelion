import { test, expect } from '@playwright/test';

const LOGIN_PATH = '/components/login/login.html';

test.describe('로그인 페이지', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PATH);
    });

    test('페이지 타이틀이 올바르다', async ({ page }) => {
        await expect(page).toHaveTitle(/login \/ register/i);
    });

    test('이메일/비밀번호 입력창이 보인다', async ({ page }) => {
        await expect(page.locator('#emailInput')).toBeVisible();
        await expect(page.locator('#pwInput')).toBeVisible();
    });

    test('계속하기 버튼이 보인다', async ({ page }) => {
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('회원가입 링크가 보인다', async ({ page }) => {
        await expect(page.getByRole('link', { name: '회원가입' })).toBeVisible();
    });

    test('이메일과 비밀번호를 입력할 수 있다', async ({ page }) => {
        await page.locator('#emailInput').fill('test@example.com');
        await page.locator('#pwInput').fill('password123');

        await expect(page.locator('#emailInput')).toHaveValue('test@example.com');
        await expect(page.locator('#pwInput')).toHaveValue('password123');
    });

    test('이메일 없이 제출하면 막힌다', async ({ page }) => {
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('#emailInput')).toBeFocused();
    });

    test('잘못된 이메일 형식은 입력이 막힌다', async ({ page }) => {
        await page.locator('#emailInput').fill('invalid-email');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('#emailInput')).toBeFocused();
    });

    test('회원가입 클릭 시 register 페이지로 이동한다', async ({ page }) => {
        await page.getByRole('link', { name: '회원가입' }).click();
        await expect(page).toHaveURL(/register/);
    });

});

test.describe('로그인 API', () => {

    test('로그인 성공 시 API 호출되고 토큰이 저장된다', async ({ page }) => {
        // ✅ 요청을 가로채서 응답 body를 미리 캡처
        let responseBody = null;
        await page.route('**/auth/login', async route => {
            const response = await route.fetch();       // 실제 API 호출
            responseBody = await response.json();        // 페이지 이동 전에 읽힘
            await route.fulfill({ response });           // 브라우저에 그대로 전달
        });

        await page.goto(LOGIN_PATH);
        await page.locator('#emailInput').fill('123@123.com');
        await page.locator('#pwInput').fill('123');
        await page.locator('button[type="submit"]').click();

        // 홈으로 이동 대기
        await expect(page).toHaveURL('/');

        // 검증
        expect(responseBody).not.toBeNull();
        expect(responseBody.token).toBeDefined();

        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).not.toBeNull();
        expect(token).toBe(responseBody.token);
    });

    test('잘못된 정보로 로그인 시 토큰이 저장되지 않는다', async ({ page }) => {
        await page.goto(LOGIN_PATH);

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('이메일 또는 비밀번호를 확인해주세요');
            await dialog.accept();
        });

        await page.locator('#emailInput').fill('wrong@wrong.com');
        await page.locator('#pwInput').fill('wrongpassword');

        // ✅ API 응답(실패)까지 기다린 후 확인
        await Promise.all([
            page.waitForResponse(res =>
                res.url().includes('/auth/login') && res.request().method() === 'POST'
            ),
            page.locator('button[type="submit"]').click(),
        ]);

        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBeNull();

        await expect(page).not.toHaveURL('/');
    });

});