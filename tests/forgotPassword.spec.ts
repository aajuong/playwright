import { test } from '../fixtures/pages';

test.beforeEach("Go to login screen", async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.assertOnLoginPage();
})


test("Forgot password flow", async ({loginPage, forgotPasswordPage}) => {
    await loginPage.goto();
    await loginPage.clickForgotPasswordLink();
    await forgotPasswordPage.assertOnForgotPasswordPage();
    await forgotPasswordPage.clickBackToSignInButton();
    await loginPage.assertOnLoginPage();
    await loginPage.clickForgotPasswordLink();
    await forgotPasswordPage.enterEmailAddress("invalid_email");
    await forgotPasswordPage.errorMessageContains("Please enter a valid email address.");
    await forgotPasswordPage.enterEmailAddress("user@example.com");
    await forgotPasswordPage.assertSuccessfulEmailRequest();
    await forgotPasswordPage.clickBackToSignInButton();
    await loginPage.assertOnLoginPage();
})
