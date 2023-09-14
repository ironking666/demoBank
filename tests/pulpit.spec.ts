import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";
import { paymentData } from "../test-data/payment.data";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const paymentsPage = new PaymentPage(page);
    const pulpitPage = new PulpitPage(page);

    await page.goto(url);
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test("quick payment with correct data", async ({ page }) => {
    const receiverId = "2";
    const quickPaymentTransferAmount = "150";
    const transferTitle = "Zwrot funduszy";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const paymentsPage = new PaymentPage(page);
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.receiverIdCheckbox.selectOption(receiverId);
    await pulpitPage.quickPaymentTransferAmount.fill(
      quickPaymentTransferAmount
    );
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.quickPaymentExecuteButton.click();
    await paymentsPage.closePaymentModalButton.click();

    //await expect(paymentsPage.quickPaymentMessage).toHaveText(
    //`Przelew wykonany! ${expectedTransferReceiver} - ${quickPaymentTransferAmount},00PLN - ${transferTitle}`
    //);
    await expect(paymentsPage.messageText).toBeVisible();
    await expect(paymentsPage.messageText).not.toBeEmpty();
  });

  test("successful mobile top-up", async ({ page }) => {
    const topUpReceiver = paymentData.topUpReceiver;
    const topUpAmount = paymentData.topUpAmount;
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    const paymentsPage = new PaymentPage(page);
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topUpReceiverCheckbox.selectOption(topUpReceiver);
    await pulpitPage.topUpPhoneAmount.fill(topUpAmount);
    await pulpitPage.agreementCheckbox.click();
    await pulpitPage.topUpPhoneButton.click();
    await paymentsPage.closePaymentModalButton.click();

    await expect(paymentsPage.messageText).toHaveText(expectedMessage);
  });
  test("correct balance after successful mobile top-up", async ({ page }) => {
    const pulpitPage = new PulpitPage(page);
    const topUpReceiver = paymentData.topUpReceiver;
    const topUpAmount = paymentData.topUpAmount;
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    const paymentsPage = new PaymentPage(page);

    await pulpitPage.topUpReceiverCheckbox.selectOption(topUpReceiver);
    await pulpitPage.topUpPhoneAmount.fill(topUpAmount);
    await pulpitPage.agreementCheckbox.click();
    await pulpitPage.topUpPhoneButton.click();
    await paymentsPage.closePaymentModalButton.click();

    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
