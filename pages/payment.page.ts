import { Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}
  transferReceiverInput = this.page.getByTestId("transfer_receiver");
  accountNumberInput = this.page.getByTestId("form_account_to");
  transferAmountInput = this.page.getByTestId("form_amount");
  executeButton = this.page.getByRole("button", { name: "wykonaj przelew" });
  closePaymentModalButton = this.page.getByTestId("close-button");
  messageText = this.page.locator("#show_messages");
}
