import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}
  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");
  loginError = this.page.getByTestId("error-login-id");
  passwordError = this.page.getByTestId("error-login-password");
  emptyUserIdMessage = this.page.getByTestId("error-login-id");
  emptyUserPasswordMessage = this.page.getByTestId("error-login-password");
  logoutButton = this.page.getByTestId("logout-button");

  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
