import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { paymentData } from "../test-data/payment.data";
import { PulpitPage } from "../pages/pulpit.page";
import { addressData } from "../test-data/address.data";

test.describe("Payment tests", () => {
  let paymentsPage: PaymentPage;
  const transferReceiver = paymentData.transferReceiver;
  const accountNumber = paymentData.accountNumber;
  const transferAmount = paymentData.transferAmount;
  //const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
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
    await paymentsPage.makeTransfer(
      transferReceiver,
      accountNumber,
      transferAmount,
    );
    await paymentsPage.checkExpectedMessage(expect);
  });

  test("correct payment with address data", async ({ page }) => {
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
    await paymentsPage.paymentsTab.click();
    await paymentsPage.transferReceiverInput.fill(paymentData.transferReceiver);
    await paymentsPage.accountNumberInput.fill(paymentData.accountNumber);
    await paymentsPage.addAddressForm.first().click();
    await paymentsPage.streetInput.fill(addressData.street);
    await paymentsPage.zipCodeInput.fill(addressData.zipCode);
    await paymentsPage.cityInput.fill(addressData.city);
    await paymentsPage.transferAmountInput.fill(paymentData.transferAmount);
    await paymentsPage.transferTitleInput.fill(paymentData.transferTitle);
    await paymentsPage.executeButton.click();
    await paymentsPage.closePaymentModalButton.click();

    await paymentsPage.checkExpectedMessage(expect);
  });
});
