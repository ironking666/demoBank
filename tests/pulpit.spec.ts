import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });
  test("quick payment with correct data", async ({ page }) => {
    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "Zwrot funduszy";
    const expectedTransferReceiver = "Chuck Demobankowy";

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").click();
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    const topUpReceiver = "503 xxx xxx";
    const topUpAmount = "40";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReceiver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
  test("correct balance after successful mobile top-up", async ({ page }) => {
    const topUpReceiver = "503 xxx xxx";
    const topUpAmount = "40";
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReceiver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });
});
