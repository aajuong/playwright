import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { LandingPage } from '../pages/landing';
import { ForgotPasswordPage } from '../pages/forgotPassword';


type Pages = {
  loginPage: LoginPage;
  landingPage: LandingPage;
  forgotPasswordPage: ForgotPasswordPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
});
