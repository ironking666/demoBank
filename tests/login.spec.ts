import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("User login to Demobank", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });
  test("successful login with correct credentials", async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";

    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);

    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const incorrectUserId = "tester";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const userId = loginData.userId;
    const incorrectUserPassword = "1233";
    const expectedErrorMessage = "hasło ma min. 8 znaków";
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.loginInput.blur();

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();

    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
