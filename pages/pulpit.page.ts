import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page);
  receiverIdCheckbox = this.page.locator("#widget_1_transfer_receiver");
  quickPaymentTransferAmount = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");
  quickPaymentExecuteButton = this.page.getByRole("button", {
    name: "wykonaj",
  });
  topUpReceiverCheckbox = this.page.locator("#widget_1_topup_receiver");
  topUpPhoneAmount = this.page.locator("#widget_1_topup_amount");
  agreementCheckbox = this.page.locator(
    "#uniform-widget_1_topup_agreement span",
  );
  topUpPhoneButton = this.page.getByRole("button", { name: "doładuj telefon" });
  moneyValueText = this.page.locator("#money_value");
  userNameText = this.page.getByTestId("user-name");

  async qucikPayment(
    receiverId: string,
    quickPaymentTransferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.receiverIdCheckbox.selectOption(receiverId);
    await this.quickPaymentTransferAmount.fill(quickPaymentTransferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.quickPaymentExecuteButton.click();
  }

  async mobileTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiverCheckbox.selectOption(topUpReceiver);
    await this.topUpPhoneAmount.fill(topUpAmount);
    await this.agreementCheckbox.click();
    await this.topUpPhoneButton.click();
  }
}
