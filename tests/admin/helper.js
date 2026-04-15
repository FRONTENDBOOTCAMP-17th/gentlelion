export async function login(page) {
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
  await page.waitForURL(/dashboard/);
}
