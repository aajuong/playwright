import { test } from '../fixtures/pages';

test.beforeEach("Go to login screen", async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.assertOnLoginPage();
})

test('Form Validation for Blank Input Fields', async ({loginPage}) => {
    await loginPage.submit();
    await loginPage.assertOnLoginPage();
    await loginPage.errorMessageContains("Please enter your username.");
    await loginPage.enterUserName("some_user");
    await loginPage.submit();
    await loginPage.assertOnLoginPage();
    await loginPage.errorMessageContains("Please enter your password.");
    await loginPage.clearUsername();
    await loginPage.enterPassword("some_password");
    await loginPage.submit();
    await loginPage.assertOnLoginPage();
    await loginPage.errorMessageContains("Please enter your username.");
});

test('Login with invalid credentials', async ({loginPage}) => {
    await loginPage.login("invalidUser", "invalidPassword");
    await loginPage.assertOnLoginPage();
    await loginPage.errorMessageContains("The username or password you entered is incorrect.");
});

test('Login with locked user credentials', async ({loginPage}) => {
    await loginPage.login("locked_user", "bank_sauce");
    await loginPage.assertOnLoginPage();
    await loginPage.errorMessageContains("Your account has been suspended. Please contact support.");
});

test('Toggle password visibility', async ({loginPage}) => {
    await loginPage.enterUserName("some_user");
    await loginPage.enterPassword("some_password");
    await loginPage.togglePasswordVisibility();
    await loginPage.assertVisiblePassword("some_password");
    await loginPage.togglePasswordVisibility();
    await loginPage.assertHiddenPassword();
});

test('Dashboard Navigation & Session Logout', async ({loginPage, landingPage}) => {
    await loginPage.login("standard_user", "bank_sauce");
    await landingPage.assertOnLandingPage();
    await landingPage.assertUserLoggedIn("standard_user");
    await landingPage.clickLogOutButton();
    await loginPage.assertOnLoginPage();
});

test('Direct unauthorized URL Access', async ({loginPage, landingPage}) => {
    await landingPage.goto();
    await loginPage.assertOnLoginPage();
});
