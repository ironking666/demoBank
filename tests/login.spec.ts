import { test, expect } from "@playwright/test";
test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("successful login with correct credentials", async ({ page }) => {
    const userId = "testerLO";
    const userPassword = "Tester66";
    const expectedUserName = "Jan Demobankowy";

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("login-input").press("Tab");
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const incorrectUserId = "tester";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    await page.getByTestId("login-input").fill(incorrectUserId);
    await page.getByTestId("login-input").press("Tab");
    await page.getByTestId("password-input").click();
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage,
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const userId = "testerLO";
    const incorrectUserPassword = "1233";
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorMessage,
    );
  });
});
