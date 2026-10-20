import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {

    readonly page: Page;
    readonly backToSigninButton: Locator;
    readonly sendResetLinkButton: Locator;
    readonly emailField: Locator;
    readonly forgotPasswordCard: Locator;
    readonly forgotPasswordSuccessMessage: Locator;
    readonly errorMessage: Locator;

    constructor (page:Page) {
        this.page = page;
        this.backToSigninButton = page.getByRole('link', { name: 'Back to Sign In' });
        this.sendResetLinkButton = page.getByRole('button', { name: 'Send Reset Link' });
        this.emailField = page.getByLabel('Email address');
        this.forgotPasswordCard = page.getByTestId('forgot-password-card');
        this.forgotPasswordSuccessMessage = page.getByTestId('forgot-password-success-msg');
        this.errorMessage = page.getByTestId('forgot-password-error');
    }

    async assertOnForgotPasswordPage() {
        await expect(this.page).toHaveURL(/\/forgot-password$/);
        await expect(this.forgotPasswordCard).toBeVisible();
        await expect(this.forgotPasswordCard).toContainText("Enter the email address associated with your account and we'll send you a link to reset your password.");
        await expect(this.sendResetLinkButton).toBeVisible();
        await expect(this.backToSigninButton).toBeVisible();
    }

    async clickBackToSignInButton() {
        await this.backToSigninButton.click();
    }

    async enterEmailAddress(email: string) {
        await this.emailField.fill(email);
        await this.clickSendResetLinkButton();
    }

    async errorMessageContains(error: string) {
        await expect(this.errorMessage).toContainText(error);
    }

    async assertSuccessfulEmailRequest() {
        await expect(this.forgotPasswordSuccessMessage).toContainText("If an account with that email exists, you'll receive a reset link shortly.");
    }

    async clickSendResetLinkButton() {
        await this.sendResetLinkButton.click();
    }
}
