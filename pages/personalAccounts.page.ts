import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PersonalAccountsPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page);

  moreDatailsButton = this.page.getByText("więcej");
  moreDetailsBlock = this.page.getByText(
    "saldo 3 159 ,20 PLN blokady na koncie 300 ,00 PLN limit kredytowy do wykorzystan"
  );
}
