import { Page, Locator, expect } from "@playwright/test";
import { assert } from "console";

export class InterestCalculatorPage {
  readonly calculatorPageTitle: Locator;
  readonly dailyInterestBtn: Locator;
  readonly monthlyInterestBtn: Locator;
  readonly yearlyInterestBtn: Locator;
  readonly principalAmountField: Locator;
  readonly interestAmountDropdown: Locator;
  readonly calculatedInterest: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    this.calculatorPageTitle = page.locator("h1");
    this.dailyInterestBtn = page.getByRole();
    this.monthlyInterestBtn = page.getByRole();
    this.yearlyInterestBtn = page.getByRole();
    this.principalAmountField = getByRole("slider", {
      name: "Principal Amount:",
    });
    this.interestAmountDropdown = page.getByRole();
    this.calculatedInterest = page.getAttribute();
    this.totalAmount = page.locator("");
  }

  pageTitle = "Interest Calculator";

  verifyInterestCalculatorPageOpen = async () => {
    await expect(this.calculatorPageTitle).toContainText(this.pageTitle);
  };

  verifyTotalAmount = async (totalAmountExpected) => {
    await expect(this.totalAmount).toHaveValue(totalAmountExpected);
  };

  enterPrincipalAmount = async (principalAmount) => {
    await this.principalAmountField.fill(principalAmount);
  };
}

test("test", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("markdavidhalliday@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("tqx1utu0VMA7jfp!hqp");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.locator("h1")).toContainText("Interest Calculator");
  await expect(page.getByRole("main")).toContainText("Principal Amount:");
  await expect(page.getByRole("link", { name: "Daily" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Monthly" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Yearly" })).toBeVisible();
  await expect(page.getByText("Consent", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("checkbox", { name: "Please accept this mandatory" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Calculate" })).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Please accept this mandatory" })
    .check();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(
    page.getByRole("button", { name: "Select Interest Rate" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Select Interest Rate" }).click();
  await expect(
    page
      .getByLabel("Select Interest Rate")
      .locator("div")
      .filter({ hasText: "10%" })
  ).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "10%" })).toBeVisible();
  await page.getByRole("checkbox", { name: "10%" }).check();
  await page
    .locator("div")
    .filter({ hasText: "Principal Amount: 0 7500" })
    .nth(2)
    .click();
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(
    page.getByRole("heading", { name: "Interest Amount:" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Total Amount with Interest:" })
  ).toBeVisible();
  await expect(page.locator("#selectedValue")).toContainText("7500");
  await expect(
    page.getByRole("heading", { name: "Please enter your login" })
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
});
