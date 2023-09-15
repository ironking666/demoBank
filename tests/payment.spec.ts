import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { paymentData } from "../test-data/payment.data";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Payment tests", () => {
  let paymentsPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.sideMenu.paymantButton.click();
    paymentsPage = new PaymentPage(page);
  });
  test("simple payment", async ({ page }) => {
    const transferReceiver = paymentData.transferReceiver;
    const accountNumber = paymentData.accountNumber;
    const transferAmount = paymentData.transferAmount;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    await paymentsPage.makeTransfer(
      transferReceiver,
      accountNumber,
      transferAmount,
    );

    await expect(paymentsPage.messageText).toHaveText(expectedMessage);
  });
});
