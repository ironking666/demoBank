import { Page } from "@playwright/test";
import { paymentData } from "../test-data/payment.data";

export class PaymentPage {
  constructor(private page: Page) {}
  transferReceiverInput = this.page.getByTestId("transfer_receiver");
  accountNumberInput = this.page.getByTestId("form_account_to");
  transferAmountInput = this.page.getByTestId("form_amount");
  executeButton = this.page.getByRole("button", { name: "wykonaj przelew" });
  closePaymentModalButton = this.page.getByTestId("close-button");
  messageText = this.page.locator("#show_messages");
  addAddressForm = this.page.locator(".i-show");
  streetInput = this.page.getByPlaceholder("ulica i numer domu / mieszkania");
  zipCodeInput = this.page.getByPlaceholder("kod pocztowy, miejscowość");
  cityInput = this.page.getByPlaceholder("adres - trzecia linia");
  numberAndStreetInput = this.page.getByPlaceholder(
    "ulica i numer domu / mieszkania"
  );
  transferTitleInput = this.page.getByTestId("form_title");
  paymentsTab = this.page.getByRole("link", { name: "płatności" });
  emailConfirmationCheckbox = this.page.locator("#uniform-form_is_email span");
  emailInput = this.page.locator("#form_email");
  addToRecipientListCheckbox = this.page.locator(
    "#uniform-form_add_receiver span"
  );
  recipientNameInput = this.page.locator("#form_receiver_name");
  expressOptionRadiobButton = this.page.getByLabel("ekspresowy");

  async makeQuickTransfer(
    transferReceiver: string,
    accountNumber: string,
    transferAmount: string
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.accountNumberInput.fill(accountNumber);
    await this.transferAmountInput.fill(transferAmount);
    await this.executeButton.click();
    await this.closePaymentModalButton.click();
  }

  async checkExpectedMessage(expect: any): Promise<void> {
    const expectedMessage = `Przelew wykonany! ${paymentData.transferAmount},00PLN dla ${paymentData.transferReceiver}`;
    await expect(this.messageText).toHaveText(expectedMessage);
  }

  async checkExpectedMessageFromPaymentPanel(expect: any): Promise<void> {
    const expectedMessageFromPaymentPanel = `Przelew wykonany! ${paymentData.transferAmount}PLN dla ${paymentData.transferReceiver}`;
    await expect(this.messageText).toHaveText(expectedMessageFromPaymentPanel);
  }

  async goToPaymentsAndEnterTransferData(
    transferReceiver: string,
    accountNumber: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiverInput.fill(paymentData.transferReceiver);
    await this.accountNumberInput.fill(paymentData.accountNumber);
    await this.transferAmountInput.fill(paymentData.transferAmount);
    await this.transferTitleInput.fill(paymentData.transferTitle);
  }
  async executeTransfer(): Promise<void> {
    await this.executeButton.click();
    await this.closePaymentModalButton.click();
  }
}
