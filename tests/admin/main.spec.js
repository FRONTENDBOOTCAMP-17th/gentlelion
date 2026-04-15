import { test, expect } from '@playwright/test';

test('메인 페이지가 정상적으로 열린다', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/관리자 로그인/);
});