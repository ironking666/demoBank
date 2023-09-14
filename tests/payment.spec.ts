import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { paymentData } from "../test-data/payment.data";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole("link", { name: "płatności" }).click();
  });
  test("simple payment", async ({ page }) => {
    const transferReceiver = paymentData.transferReceiver;
    const accountNumber = paymentData.accountNumber;
    const transferAmount = paymentData.transferAmount;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    const paymentsPage = new PaymentPage(page);
    await paymentsPage.transferReceiverInput.fill(transferReceiver);
    await paymentsPage.accountNumberInput.fill(accountNumber);
    await paymentsPage.transferAmountInput.fill(transferAmount);
    await paymentsPage.executeButton.click();
    await paymentsPage.closePaymentModalButton.click();

    await expect(paymentsPage.messageText).toHaveText(expectedMessage);
  });
});
