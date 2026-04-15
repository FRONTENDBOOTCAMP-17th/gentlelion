import { test, expect } from "@playwright/test";
import { login } from "./helper";

test.describe("유저 상세 페이지", () => {
  let popup;

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/pages/users.html");

    const detailBtn = page
      .locator("table tbody tr")
      .first()
      .locator("td:last-child button")
      .first();

    [popup] = await Promise.all([
      page.waitForEvent("popup"),
      detailBtn.click(),
    ]);

    await popup.waitForLoadState();
  });

  test("유저 상세 페이지가 정상적으로 로드된다", async () => {
    await expect(popup).toHaveURL(/user-details/);
  });

  test("유저 기본 정보가 표시된다", async () => {
    await expect(popup.locator("#user-id")).toBeVisible();
    await expect(popup.locator("#user-email")).toBeVisible();
    await expect(popup.locator("#user-firstname")).toBeVisible();
  });

  test("포인트 조정 기능이 존재한다", async () => {
    await expect(popup.locator("#user-points")).toBeVisible();
    await expect(popup.locator("#point-input")).toBeVisible();
    await expect(popup.locator("#addPointBtn")).toBeVisible();
    await expect(popup.locator("#subPointBtn")).toBeVisible();
  });

  test("닫기 버튼이 존재한다", async () => {
    await expect(popup.locator("#closeBtn")).toBeVisible();
  });

  // API 테스트
  test("유저 상세 API가 200을 반환한다", async () => {
    const url = popup.url();
    const userId = new URL(url).searchParams.get("userId");

    const response = await popup.request.get(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${await popup.evaluate(() => localStorage.getItem("token"))}`,
        },
      },
    );
    expect(response.status()).toBe(200);
  });

  test("유저 상세 API 응답에 유저 정보가 존재한다", async () => {
    const url = popup.url();
    const userId = new URL(url).searchParams.get("userId");

    const response = await popup.request.get(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${await popup.evaluate(() => localStorage.getItem("token"))}`,
        },
      },
    );
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.userId).toBeDefined();
    expect(body.data.email).toBeDefined();
  });
});
