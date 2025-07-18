import { Page, Locator, expect } from "@playwright/test";

export class InterestCalculatorPage {
  readonly calculatorPageTitle: Locator;
  readonly dailyInterestBtn: Locator;
  readonly monthlyInterestBtn: Locator;
  readonly yearlyInterestBtn: Locator;
  readonly principalAmountSlider: Locator;
  readonly selectedPrincipalAmount: Locator;
  readonly interestAmountDropdown: Locator;
  readonly calculateInterestBtn: Locator;
  readonly consentCheckBox: Locator;
  readonly calculatedInterest: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    this.calculatorPageTitle = page.locator("h1");
    this.dailyInterestBtn = page.getByRole("link", { name: "Daily" });
    this.monthlyInterestBtn = page.getByRole("link", { name: "Monthly" });
    this.yearlyInterestBtn = page.getByRole("link", { name: "Yearly" });
    this.principalAmountSlider = page.getByRole("slider", {
      name: "Principal Amount:",
    });
    this.selectedPrincipalAmount = page.locator("#selectedValue");
    this.interestAmountDropdown = page.getByRole("button", {
      name: "Select Interest Rate",
    });
    this.calculateInterestBtn = page.getByRole("button", { name: "Calculate" });
    this.consentCheckBox = page.getByRole("checkbox", {
      name: "Please accept this mandatory",
    });
    this.calculatedInterest = page.getByRole("heading", {
      name: "Interest Amount:",
    });
    this.totalAmount = page.getByRole("heading", {
      name: "Total Amount with Interest:",
    });
  }

  pageTitle = "Interest Calculator";
  interestAmountText = "Interest Amount: ";
  totalAmountText = "Total Amount with Interest: ";
  errorDialogMessage = "Please fill in all fields.";

  verifyInterestCalculatorPageOpen = async () => {
    await expect(this.calculatorPageTitle).toContainText(this.pageTitle);
    await expect(this.dailyInterestBtn).toBeVisible();
    await expect(this.monthlyInterestBtn).toBeVisible();
    await expect(this.yearlyInterestBtn).toBeVisible();
    await expect(this.interestAmountDropdown).toBeVisible();
    await expect(this.principalAmountSlider).toBeVisible();
    console.log("All checks passed, The page has loaded.");
  };

  verifyInterestAmount = async (interestAmountExpected) => {
    await expect(this.calculatedInterest).toContainText(
      this.interestAmountText + interestAmountExpected
    );
  };

  verifyTotalAmount = async (totalAmountExpected) => {
    await expect(this.totalAmount).toContainText(
      this.totalAmountText + totalAmountExpected
    );
  };

  selectPrincipalAmount = async (principalAmount) => {
    await this.principalAmountSlider.fill(principalAmount);
    await expect(this.selectedPrincipalAmount).toContainText(principalAmount);
  };

  selectInterestRate = async (page, interestRate) => {
    await this.interestAmountDropdown.click();
    await page.getByRole("checkbox", { name: interestRate + "%" }).check();
    await page.getByText("Consent", { exact: true }).click();
  };

  calculateInterest = async (page?, acceptConsent = true) => {
    console.log("acceptConsent: " + acceptConsent);
    if (acceptConsent === true) {
      await this.consentCheckBox.check();
    }
    if (page) {
      page.once("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toEqual(this.errorDialogMessage);
        dialog.dismiss().catch(() => {});
      });
    }
    await this.calculateInterestBtn.click();
  };

  verifyCalculationNotDisplayed = async () => {
    await expect(this.calculatedInterest).not.toBeVisible();
    await expect(this.totalAmount).not.toBeVisible();
  };
}
