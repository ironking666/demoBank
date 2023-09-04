import { test, expect } from "@playwright/test";
test.describe("Pulpit tests", () => {
  test("quick payment with correct data", async ({ page }) => {

    const url = "https://demo-bank.vercel.app/";
    const userId = "testerLO";
    const userPassword = "Tester66";

    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "Zwrot funduszy";
    const expectedTransferReceiver = 'Chuck Demobankowy';

    
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").click();
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").fill("TesterLO");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption("503 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("40");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 40,00PLN na numer 503 xxx xxx"
    );
  });
});
