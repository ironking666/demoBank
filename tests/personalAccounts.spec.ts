import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PersonalAccountsPage } from "../pages/personalAccounts.page";

test.describe("Personal accounts tab tests @personalAccount", () => {
  let personalAccountsPage: PersonalAccountsPage;

  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto(url);
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.sideMenu.personalAccountsButton.click();
    personalAccountsPage = new PersonalAccountsPage(page);
  });
  test("check if the more details button works properly", async ({ page }) => {
    await personalAccountsPage.moreDatailsButton.click();

    await expect(personalAccountsPage.moreDetailsBlock).not.toBeVisible();
  });
});
