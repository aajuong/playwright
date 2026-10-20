import { Page, Locator, expect, LocatorScreenshotOptions } from '@playwright/test';

export class LandingPage {

    readonly page: Page;
    readonly welcomeMessage: Locator;
    readonly userName: Locator;
    readonly logOutButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.welcomeMessage = page.getByTestId('dashboard-welcome-message');
        this.userName = page.getByTestId('sidebar-user-info');
        this.logOutButton = page.getByTestId('topbar-logout-btn');
    }

    async goto() {
        await this.page.goto('dashboard');
    }

    async assertOnLandingPage() {
        await expect(this.page).toHaveURL(/\/dashboard$/);
        await expect(this.welcomeMessage).toBeVisible();
        await expect(this.welcomeMessage).toContainText("Welcome back,");
    }

    async assertUserLoggedIn(user: string) {
        await expect(this.userName).toBeVisible();
        await expect(this.userName).toContainText(user);
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}
