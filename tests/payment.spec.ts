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
  const transferTitle = paymentData.transferTitle;
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.sideMenu.paymentButton.click();
    paymentsPage = new PaymentPage(page);
  });
  test("simple payment", async ({ page }) => {
    await paymentsPage.makeQuickTransfer(
      transferReceiver,
      accountNumber,
      transferAmount
    );
    await paymentsPage.checkExpectedMessage(expect);
  });

  test("correct payment with address data", async ({ page }) => {
    await paymentsPage.goToPaymentsAndEnterTransferData(
      transferReceiver,
      accountNumber,
      transferAmount,
      transferTitle
    );
    await paymentsPage.addAddressForm.first().click();
    await paymentsPage.streetInput.fill(addressData.street);
    await paymentsPage.zipCodeInput.fill(addressData.zipCode);
    await paymentsPage.cityInput.fill(addressData.city);
    await paymentsPage.executeTransfer();

    await paymentsPage.checkExpectedMessage(expect);
  });

  test("correct payment with email confirmation", async ({ page }) => {
    await paymentsPage.goToPaymentsAndEnterTransferData(
      transferReceiver,
      accountNumber,
      transferAmount,
      transferTitle
    );
    await paymentsPage.emailConfirmationCheckbox.click();
    await paymentsPage.emailInput.fill(addressData.email);
    await paymentsPage.executeTransfer();

    await paymentsPage.checkExpectedMessageFromPaymentPanel(expect);
  });

  test("correct payment and added to the recipient list", async ({ page }) => {
    await paymentsPage.goToPaymentsAndEnterTransferData(
      transferReceiver,
      accountNumber,
      transferAmount,
      transferTitle
    );
    await paymentsPage.addToRecipientListCheckbox.click();
    await paymentsPage.recipientNameInput.fill(transferReceiver);
    await paymentsPage.executeTransfer();

    await paymentsPage.checkExpectedMessageFromPaymentPanel(expect);
  });
  test("correct payment with express option", async ({ page }) => {
    await paymentsPage.goToPaymentsAndEnterTransferData(
      transferReceiver,
      accountNumber,
      transferAmount,
      transferTitle
    );
    await paymentsPage.expressOptionRadiobButton.check();
    await paymentsPage.executeTransfer();

    await paymentsPage.checkExpectedMessageFromPaymentPanel(expect);
  });
  test("correct payment with data change", async ({ page }) => {
    await paymentsPage.goToPaymentsAndEnterTransferData(
      transferReceiver,
      accountNumber,
      transferAmount,
      transferTitle
    );
    await paymentsPage.formDate.click();
    await paymentsPage.selectedData.click();
    await paymentsPage.executeTransfer();

    await paymentsPage.checkExpectedMessageFromPaymentPanel(expect);
  });
});
