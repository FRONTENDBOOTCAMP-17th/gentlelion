import { test, expect } from "@playwright/test";

test.describe("인덱스 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("신제품 상품 목록이 API에서 불러와서 렌더링된다", async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes("/products") && res.status() === 200,
      ),
      page.goto("/"),
    ]);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);

    const slides = page.locator("#arrivals-wrapper .swiper-slide");
    await expect(slides.first()).toBeVisible();
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });

  test("신제품 상품 클릭 시 상품 상세 페이지로 이동한다", async ({ page }) => {
    await page.waitForSelector("#arrivals-wrapper .swiper-slide");
    const firstSlide = page
      .locator("#arrivals-wrapper .swiper-slide a")
      .first();
    await firstSlide.click();
    await expect(page).toHaveURL(/product-detail/);
  });

  test("베스트셀러 상품 목록이 API에서 불러와서 렌더링된다", async ({
    page,
  }) => {
    const responses = [];
    page.on("response", (res) => {
      if (res.url().includes("/products")) responses.push(res);
    });

    await page.waitForTimeout(2000);
    expect(responses.length).toBeGreaterThanOrEqual(2);

    const slides = page.locator(".best-swiper .swiper-wrapper .swiper-slide");
    await expect(slides.first()).toBeVisible();
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });

  test("베스트셀러 상품 클릭 시 상품 상세 페이지로 이동한다", async ({
    page,
  }) => {
    await page.waitForSelector(".best-swiper .swiper-slide");
    const firstSlide = page.locator(".best-swiper .swiper-wrapper a").first();
    await firstSlide.click();
    await expect(page).toHaveURL(/product-detail/);
  });
});
test("오른쪽 클릭 시 다음 콘텐츠로 넘어가고 제목이 바뀐다", async ({
  page,
}) => {
  await page.goto("/");

  const title = page.locator("#video-title");
  const firstTitle = await title.textContent();

  const container = page.locator(".main-video");
  const box = await container.boundingBox();

  await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);

  await page.waitForTimeout(500);
  const nextTitle = await title.textContent();
  expect(nextTitle).not.toBe(firstTitle);
});

test("왼쪽 클릭 시 이전 콘텐츠로 넘어가고 제목이 바뀐다", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("#video-title");

  const container = page.locator(".main-video");
  const box = await container.boundingBox();
  await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
  await page.waitForTimeout(500);

  const secondTitle = await title.textContent();

  await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
  await page.waitForTimeout(500);

  const prevTitle = await title.textContent();
  expect(prevTitle).not.toBe(secondTitle);
});
