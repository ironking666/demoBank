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
    const expectedUserName = "Jan Demobankowy 1122";

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

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();

    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });

  test("unsuccessful login with empty login and correct password", async ({
    page,
  }) => {
    const emptyUserId = "";
    const userPassword = loginData.userPassword;
    const validationMessage = "pole wymagane";

    await loginPage.loginInput.fill(emptyUserId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginInput.blur();

    await expect(loginPage.loginButton).toBeDisabled();
    await expect(loginPage.emptyUserIdMessage).toHaveText(validationMessage);
  });

  test("unsuccessful login with empty password and correct login", async ({
    page,
  }) => {
    const userId = loginData.userId;
    const emptyUserPassword = "";
    const validationMessage = "pole wymagane";

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(emptyUserPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.loginButton).toBeDisabled();
    await expect(loginPage.emptyUserPasswordMessage).toHaveText(
      validationMessage,
    );
  });

  test("unsuccessful login with empty password and empty login", async ({
    page,
  }) => {
    const emptyUserId = "";
    const emptyUserPassword = "";
    const validationMessage = "pole wymagane";

    await loginPage.loginInput.fill(emptyUserId);
    await loginPage.passwordInput.fill(emptyUserPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.loginButton).toBeDisabled();
    await expect(loginPage.emptyUserIdMessage).toHaveText(validationMessage);
    await expect(loginPage.emptyUserPasswordMessage).toHaveText(
      validationMessage,
    );
  });

  test("successful logout ", async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await loginPage.login(userId, userPassword);
    await loginPage.logoutButton.click();

    await expect(loginPage.loginInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
