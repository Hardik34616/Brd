import { test, expect } from "@playwright/test";

test("responsive page has no horizontal overflow and all narrative sections remain visible", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const width of [1440, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "From conversation to clarity." }),
    ).toBeVisible();
    await page.waitForTimeout(2800);
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport + 1);
    await expect(page.locator("#use-cases")).toBeAttached();
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
  }
  expect(errors).toEqual([]);
});

test("language, input, clarification and comparison demos respond to real input", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "हिन्दी Hindi", exact: true }).click();
  await expect(page.locator(".language-note")).toContainText(
    "किसानों को मौसम की जानकारी चाहिए।",
  );
  await page.getByRole("tab", { name: /Start with a rough draft/ }).click();
  await page
    .getByLabel("YOUR ROUGH IDEA")
    .fill("A learning platform for teachers.");
  await expect(page.locator(".extracted")).toContainText(
    "A learning platform for teachers.",
  );
  await page
    .getByRole("button", { name: "Order updates", exact: true })
    .click();
  await expect(page.locator(".requirement-result")).toContainText(
    "order updates",
  );
  await expect(page.locator(".score-ring strong")).toHaveText("75%");
  await page.getByRole("button", { name: "Add acceptance criteria" }).click();
  await expect(page.locator(".score-ring strong")).toHaveText("100%");
  const range = page.getByRole("slider", {
    name: "Before and after comparison",
  });
  await range.focus();
  await page.keyboard.press("End");
  await expect(range).toHaveValue("100");
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  await page.getByRole("button", { name: "SMS", exact: true }).click();
  await expect(page.locator(".clarified-result")).toContainText("via sms");
  await page
    .getByRole("button", { name: "Business analysts", exact: true })
    .click();
  await expect(page.locator(".use-art-paper")).toContainText(
    "The requirements brief",
  );
});

test("mobile navigation and coming-soon dialog are keyboard accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Features" })
    .click();
  await expect(page.locator("#mobile-nav")).not.toBeAttached();
  await page
    .getByRole("button", { name: "Get started", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download a sample BRD" }),
  ).toHaveAttribute("download", "");
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download a sample BRD" }).click();
  expect((await download).suggestedFilename()).toBe("sample-brd.md");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Get started", exact: true }).first(),
  ).toBeFocused();
});

test("scroll story scrubs forward and backward and replay returns to its beginning", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(2800);
  const bounds = await page.locator("#how-it-works").evaluate((el) => {
    const spacer = el.parentElement!;
    return {
      top: spacer.getBoundingClientRect().top + scrollY,
      distance: innerHeight * 3,
    };
  });
  await page.evaluate(
    ({ top, distance }) =>
      window.scrollTo({ top: top + distance - 10, behavior: "instant" }),
    bounds,
  );
  await page.waitForTimeout(1500);
  await expect(page.locator(".final-panel")).toHaveCSS("visibility", "visible");
  await page.getByRole("button", { name: "Replay story" }).click();
  await page.waitForTimeout(1500);
  await expect(page.locator(".raw-panel")).toHaveCSS("visibility", "visible");
  await expect(page.locator(".final-panel")).toHaveCSS("visibility", "hidden");
});

test("essential copy is present without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "From conversation to clarity." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "The details find their place." }),
  ).toBeVisible();
  await context.close();
});
