import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

  // Declare the things this page object holds. "readonly" means they are
  // assigned once (in the constructor) and never reassigned.
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly showPassworButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.loginButton = page.getByTestId('login-submit-btn');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
    this.errorMessage = page.getByTestId('login-error-message');
    this.showPassworButton = page.locator('.relative button');

  }

  async goto() {
    await this.page.goto('login');
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL("https://qaplayground.com/bank/login");
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterUserName(username: string) {
    await this.usernameInput.fill(username);
  }

  async clearUsername() {
    await this.usernameInput.clear();
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clearPassword() {
    await this.passwordInput.clear();
  }

  async submit() {
    await this.loginButton.click();
  }

  async errorMessageContains(text: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async togglePasswordVisibility() {
    await this.showPassworButton.click();
  }

  async assertVisiblePassword(password: string) {
    await expect(this.passwordInput).toHaveAttribute("type", "text");
    await expect(this.passwordInput).toHaveValue(password);
    await expect(this.showPassworButton).toHaveAttribute("aria-label", "Hide password");
  }

  async assertHiddenPassword() {
    await expect(this.passwordInput).toHaveAttribute("type", "password");
    await expect(this.showPassworButton).toHaveAttribute("aria-label", "Show password");
  }








  // Fill in the form and submit it.
  async login(username: string, password: string) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.submit();
  }



  // Assertion helpers keep expect() calls out of your spec files.
async expectErrorMessage(text: string) {
    await expect(this.invalidCredentialsErrorMessage).toContainText(text);
  }

  async expectLoggedIn() {
    // TODO: adjust to whatever proves login worked (URL, heading, etc.)
    await expect(this.page).not.toHaveURL(/login/);
  }
}
