import { test, expect } from '@playwright/test';

const REGISTER_PATH = '/components/login/register.html';
const API_REGISTER = 'https://api.fullstackfamily.com/api/gentlelion/v1/auth/signup';

const validData = {
    email: 'newuser@test.com',
    password: 'password123',
    firstName: '김',
    lastName: '테스트',
    phone: '010-1234-5678',
    addressDetail: '101호',
};

async function fillForm(page, data = validData) {
    await page.locator('#emailInput').fill(data.email);
    await page.locator('#passwordInput').fill(data.password);
    await page.locator('#passwordCheck').fill(data.password);
    await page.locator('#firstName').fill(data.firstName);
    await page.locator('#lastName').fill(data.lastName);
    await page.locator('#phoneNumber').fill(data.phone);
    await page.locator('#addressDetail').fill(data.addressDetail);
}

test.describe('회원가입 페이지', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(REGISTER_PATH);
    });

    // ✅ 비밀번호 토글
    test('비밀번호 토글 버튼 클릭 시 텍스트로 전환된다', async ({ page }) => {
        await expect(page.locator('#passwordInput')).toHaveAttribute('type', 'password');
        await page.locator('#passwordInput ~ .toggle-button').click();
        await expect(page.locator('#passwordInput')).toHaveAttribute('type', 'text');
    });

    test('비밀번호 토글 다시 클릭 시 다시 가려진다', async ({ page }) => {
        await page.locator('#passwordInput ~ .toggle-button').click();
        await page.locator('#passwordInput ~ .toggle-button').click();
        await expect(page.locator('#passwordInput')).toHaveAttribute('type', 'password');
    });

    // ✅ 전체 동의
    test('모두 동의하기 해제 시 하위 체크박스가 모두 해제된다', async ({ page }) => {
        await page.locator('#agreeAll').uncheck();
        await expect(page.locator('#agreeTerms')).not.toBeChecked();
        await expect(page.locator('#agreeAge')).not.toBeChecked();
        await expect(page.locator('#agreeNewsletter')).not.toBeChecked();
        await expect(page.locator('#agreePrivacy')).not.toBeChecked();
    });

    test('모두 동의하기 체크 시 하위 체크박스가 모두 체크된다', async ({ page }) => {
        await page.locator('#agreeAll').uncheck();
        await page.locator('#agreeAll').check();
        await expect(page.locator('#agreeTerms')).toBeChecked();
        await expect(page.locator('#agreeAge')).toBeChecked();
        await expect(page.locator('#agreeNewsletter')).toBeChecked();
        await expect(page.locator('#agreePrivacy')).toBeChecked();
    });

    // ✅ 비밀번호 불일치
    test('비밀번호 불일치 시 alert이 뜬다', async ({ page }) => {
        await fillForm(page);
        await page.locator('#passwordCheck').fill('wrongpassword');

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('비밀번호가 일치하지 않습니다');
            await dialog.accept();
        });

        await page.locator('#success').click();
    });

    // ✅ 한글 이름 검증
    test('이름에 한글 외 문자 입력 시 alert이 뜬다', async ({ page }) => {
        await fillForm(page);
        await page.locator('#firstName').fill('Kim');

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('한글만 입력 가능합니다');
            await dialog.accept();
        });

        await page.locator('#success').click();
    });

    // ✅ 필수 약관 미동의
    test('필수 약관 미동의 시 alert이 뜬다', async ({ page }) => {
        await fillForm(page);
        await page.locator('#agreeTerms').uncheck();

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('필수 항목에 동의해주세요');
            await dialog.accept();
        });

        await page.locator('#success').click();
    });

    // ✅ 회원가입 성공 (mock)
    test('회원가입 성공 시 로그인 페이지로 이동한다', async ({ page }) => {
        await page.route(API_REGISTER, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'success' }),
            });
        });

        await fillForm(page);
        page.on('dialog', async dialog => await dialog.accept());
        await page.locator('#success').click();
        await expect(page).toHaveURL(/login/);
    });

    // ✅ 회원가입 실패 (mock)
    test('회원가입 API 실패 시 alert이 뜬다', async ({ page }) => {
        await page.route(API_REGISTER, async route => {
            await route.fulfill({ status: 500 });
        });

        await fillForm(page);

        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('회원가입에 실패했습니다');
            await dialog.accept();
        });

        await page.locator('#success').click();

        await expect(page).toHaveURL(/register/);
    });

});