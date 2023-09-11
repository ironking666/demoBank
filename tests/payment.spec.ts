import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.getByRole("link", { name: "płatności" }).click();
  });
  test("simple payment", async ({ page }) => {
    const transferReceiver = "Jan Nowak";
    const accountNumber = "12 3456 7890 1234 5678 9012 3456";
    const transferAmount = "223";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page
      .getByTestId("form_account_to")
      .fill(accountNumber);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
