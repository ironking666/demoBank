import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}
  paymentButton = this.page.getByRole("link", { name: "płatności" });
  personalAccountsButton = this.page.getByRole("link", {
    name: "konta osobiste",
  });
}
