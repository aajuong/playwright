import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {

    readonly page: Page;
    readonly backToSigninButton: Locator;
    readonly sendResetLinkButton: Locator;
    readonly emailField: Locator;
    readonly forgotPasswowrdCard: Locator;
    readonly forgotPasswordSuccessMessage: Locator;

    constructor (page:Page) {
        this.page = page;
        this.backToSigninButton = page.getByRole('link', { name: 'Back to Sign In' });
        this.sendResetLinkButton = page.getByRole('button', { name: 'Send Reset Link' });
        this.emailField = page.getByLabel('Email address');
        this.forgotPasswowrdCard = page.getByTestId('forgot-password-card');
        this.forgotPasswordSuccessMessage = page.getByTestId('forgot-password-success');
    }

    

}
