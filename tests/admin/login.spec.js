import { test, expect } from "@playwright/test";

test.describe("로그인 페이지", () => {
  test("로그인 페이지가 정상적으로 로드된다", async ({ page }) => {
    await page.goto("/pages/login.html");
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('input[type="email"], #email')).toBeVisible();
    await expect(
      page.locator('input[type="password"], #password'),
    ).toBeVisible();
  });

  test("올바른 계정으로 로그인하면 대시보드로 이동한다", async ({ page }) => {
    await page.goto("/pages/login.html");
    await page.fill(
      'input[type="email"], input[name="email"], #email',
      "admin@gentlemonster.com",
    );
    await page.fill(
      'input[type="password"], input[name="password"], #password',
      "admin123",
    );
    await page.click('button[type="submit"], .login-btn, #login-btn');
    await expect(page).toHaveURL(/dashboard/);
  });

  test("잘못된 비밀번호로 로그인하면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    await page.goto("/pages/login.html");
    await page.fill(
      'input[type="email"], input[name="email"], #email',
      "admin@gentlemonster.com",
    );
    await page.fill(
      'input[type="password"], input[name="password"], #password',
      "wrongpassword",
    );
    await page.click('button[type="submit"], .login-btn, #login-btn');
    const stillOnLogin = page.url().includes("login");
    const hasAlert = await page
      .locator('.error, .alert, [class*="error"], [class*="alert"]')
      .isVisible()
      .catch(() => false);
    expect(stillOnLogin || hasAlert).toBeTruthy();
  });

  test("이메일 필드가 비어있으면 로그인이 되지 않는다", async ({ page }) => {
    await page.goto("/pages/login.html");
    await page.fill(
      'input[type="password"], input[name="password"], #password',
      "admin123",
    );
    await page.click('button[type="submit"], .login-btn, #login-btn');
    await expect(page).toHaveURL(/login/);
  });

  // API 테스트
  test("로그인 API가 200을 반환하고 토큰을 저장한다", async ({ page }) => {
    await page.goto("/pages/login.html");

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/auth/login") &&
          res.request().method() === "POST",
      ),
      (async () => {
        await page.fill(
          'input[type="email"], input[name="email"], #email',
          "admin@gentlemonster.com",
        );
        await page.fill(
          'input[type="password"], input[name="password"], #password',
          "admin123",
        );
        await page.click('button[type="submit"], .login-btn, #login-btn');
      })(),
    ]);

    expect(response.status()).toBe(200);

    // 네비게이션 완료 후 localStorage 읽기
    await page.waitForURL(/dashboard/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).not.toBeNull();
  });

  test("잘못된 계정으로 로그인 시 API가 401을 반환한다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/auth/login") &&
          res.request().method() === "POST",
      ),
      (async () => {
        await page.goto("/pages/login.html");
        await page.fill(
          'input[type="email"], input[name="email"], #email',
          "admin@gentlemonster.com",
        );
        await page.fill(
          'input[type="password"], input[name="password"], #password',
          "wrongpassword",
        );
        await page.click('button[type="submit"], .login-btn, #login-btn');
      })(),
    ]);
    expect(response.status()).toBe(401);
  });
});
