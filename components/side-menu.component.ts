import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}
  paymantButton = this.page.getByRole("link", { name: "płatności" });
}
