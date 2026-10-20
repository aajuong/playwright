import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.beforeEach("Go to login screen", async ({page}) => {
    const onLoginPage = new LoginPage(page);
    await onLoginPage.goto();
    await onLoginPage.assertOnLoginPage();
})

test('Form Validation for Blank Input Fields', async ({page}) => {
    const onLoginPage = new LoginPage(page);

    await onLoginPage.submit();
    await onLoginPage.assertOnLoginPage();
    await onLoginPage.errorMessageContains("Please enter your username.");
    await onLoginPage.enterUserName("some_user");
    await onLoginPage.submit();
    await onLoginPage.assertOnLoginPage();
    await onLoginPage.errorMessageContains("Please enter your password.");
    await onLoginPage.clearUsername();
    await onLoginPage.enterPassword("some_password");
    await onLoginPage.submit();
    await onLoginPage.assertOnLoginPage();
    await onLoginPage.errorMessageContains("Please enter your username.");
});

test('Login with invalid credentials', async ({page}) => {
    const onLoginPage = new LoginPage(page);

    await onLoginPage.login("invalidUser", "invalidPassword");
    await onLoginPage.assertOnLoginPage();
    await onLoginPage.errorMessageContains("The username or password you entered is incorrect.");
});

test('Login with locked user credentials', async ({page}) => {
    const onLoginPage = new LoginPage(page);

    await onLoginPage.login("locked_user", "bank_sauce");
    await onLoginPage.assertOnLoginPage();
    await onLoginPage.errorMessageContains("Your account has been suspended. Please contact support.");
});

test('Toggle password visibility', async ({page}) => {
    const onLoginPage = new LoginPage(page);

    await onLoginPage.enterUserName("some_user");
    await onLoginPage.enterPassword("some_password");
    await onLoginPage.togglePasswordVisibility();
    await onLoginPage.assertVisiblePassword("some_password");
    await onLoginPage.togglePasswordVisibility();
    await onLoginPage.assertHiddenPassword();
});

test('Dashboard Navigation & Session Logout', async ({page}) => {
    const onLoginPage = new LoginPage(page);

    await onLoginPage.login("standard_user", "bank_sauce");
});

test('Direct unauthorized URL Access', async ({page}) => {
    const onLoginPage = new LoginPage(page);
});
