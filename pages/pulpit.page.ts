import { Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}
  receiverIdCheckbox = this.page.locator("#widget_1_transfer_receiver");
  quickPaymentTransferAmount = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");
  quickPaymentExecuteButton = this.page.getByRole("button", {
    name: "wykonaj",
  });
  topUpReceiverCheckbox = this.page.locator("#widget_1_topup_receiver");
  topUpPhoneAmount = this.page.locator("#widget_1_topup_amount");
  agreementCheckbox = this.page.locator(
    "#uniform-widget_1_topup_agreement span"
  );
  topUpPhoneButton = this.page.getByRole("button", { name: "doładuj telefon" });
  moneyValueText = this.page.locator("#money_value");
  userNameText = this.page.getByTestId("user-name");
}
