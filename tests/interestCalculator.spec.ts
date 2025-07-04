import { test, expect } from "@playwright/test";
import { InterestCalculatorPage } from "../src/pages/InterestCalculatorPage.ts";
import { logIntoInterestCalculator } from "../src/helpers/logIntoPage.ts";
import { testData, testData2 } from "../src/data/testData";

test.describe("Scenario 1: The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly.", () => {
  test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
    await logIntoInterestCalculator(page);
  });

  test("The application allows you to choose Daily interest", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I select Daily interest", async () => {
      const classList =
        await interestCalculatorPage.dailyInterestBtn.getAttribute("class");

      if (classList?.includes("active")) {
        await interestCalculatorPage.monthlyInterestBtn.click();
        await expect(interestCalculatorPage.monthlyInterestBtn).toContainClass(
          "active"
        );
      }
      await interestCalculatorPage.dailyInterestBtn.click();
    });

    await test.step("THEN Daily Interest is selected", async () => {
      // check btn is highlighted
      await expect(interestCalculatorPage.dailyInterestBtn).toContainClass(
        "active"
      );
    });
  });

  test("The application allows you to choose Monthly interest", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I select Monthly interest", async () => {
      const classList =
        await interestCalculatorPage.monthlyInterestBtn.getAttribute("class");

      if (classList?.includes("active")) {
        await interestCalculatorPage.yearlyInterestBtn.click();
        await expect(interestCalculatorPage.yearlyInterestBtn).toContainClass(
          "active"
        );
      }
      await interestCalculatorPage.monthlyInterestBtn.click();
    });

    await test.step("THEN Monthly Interest is selected", async () => {
      await expect(interestCalculatorPage.monthlyInterestBtn).toContainClass(
        "active"
      );
    });
  });

  test("The application allows you to choose Yearly interest", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I select Yearly interest", async () => {
      const classList =
        await interestCalculatorPage.yearlyInterestBtn.getAttribute("class");

      if (classList?.includes("active")) {
        await interestCalculatorPage.monthlyInterestBtn.click();
        await expect(interestCalculatorPage.monthlyInterestBtn).toContainClass(
          "active"
        );
      }
      await interestCalculatorPage.yearlyInterestBtn.click();
    });

    await test.step("THEN Yearly Interest is selected", async () => {
      await expect(interestCalculatorPage.yearlyInterestBtn).toContainClass(
        "active"
      );
    });
  });
  //   await page.getByRole("button", { name: "Logout" }).click();
  // });
  // });

  // test.describe("Scenario 2: Users should be able to input the principal amount.", () => {
  //   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
  //     await logIntoInterestCalculator(page);
  //   });

  test("Users should be able to input the principal amount.", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const principalAmount = testData.principalAmount;

    await test.step("WHEN I can input the principal amount", async () => {
      interestCalculatorPage.selectPrincipalAmount(principalAmount);
    });
    await test.step("THEN The principal amount is selected", async () => {
      await expect(
        interestCalculatorPage.selectedPrincipalAmount
      ).toContainText(principalAmount);
    });
  });

  test.afterEach("logout of application", async ({ page }) => {
    await page.getByRole("button", { name: "Logout" }).click();
  });

  test("Users should be able to select the interest rate from a predefined list of rates up to 15%.", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const interestRate = testData.interestRate;
    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });
    await test.step("WHEN I select the interest rate", async () => {
      await interestCalculatorPage.selectInterestRate(page, interestRate);
    });
    await test.step("THEN I have loaded the login Page", async () => {
      await expect(
        page.getByRole("button", { name: `Selected Rate: ${interestRate}%` })
      ).toContainText(interestRate.toString());
    });
  });

  // This also covers: The application should display the calculated interest and the total amount including interest.
  test("The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const interestRate = testData2.interestRate;
    const principalAmount = testData2.principalAmount;
    const expectedInterest = testData2.expectedInterest;
    const expectedTotal = testData2.expectedTotal;

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I select a duration, principal amount, and interest rate", async () => {
      await interestCalculatorPage.selectPrincipalAmount(principalAmount);
      await interestCalculatorPage.selectInterestRate(page, interestRate);
      await interestCalculatorPage.yearlyInterestBtn.click();
      await interestCalculatorPage.calculateInterest();
    });

    await test.step("THEN The application will calculate the correct interest", async () => {
      interestCalculatorPage.verifyInterestAmount(expectedInterest);
      interestCalculatorPage.verifyTotalAmount(expectedTotal);
    });
  });

  // The application should inform the user if any field is left empty or not selected.
  // Mandatory consent check box
  test("Interest rate is mandatory.", async ({ page }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const principalAmount = testData2.principalAmount;

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I don't select an interest rate", async () => {
      await interestCalculatorPage.selectPrincipalAmount(principalAmount);
    });

    await test.step("THEN the page alerts me to Please fill in all fields", async () => {
      await interestCalculatorPage.calculateInterest(page);
      await interestCalculatorPage.verifyCalculationNotDisplayed();
    });
  });

  test("Principal amount is mandatory.", async ({ page }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const interestRate = testData2.interestRate;

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I set the princiapl amount to 0", async () => {
      await interestCalculatorPage.selectPrincipalAmount("0");
      await interestCalculatorPage.selectInterestRate(page, interestRate);
    });

    await test.step("THEN the page alerts me to Please fill in all fields", async () => {
      await interestCalculatorPage.calculateInterest(page);
      await interestCalculatorPage.verifyCalculationNotDisplayed();
    });
  });

  // This test fails because the consent checkbox is does not prevent you from using the calculator
  test("Consent is mandatory.", async ({ page }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);
    const interestRate = testData2.interestRate;
    const principalAmount = testData2.principalAmount;

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      await interestCalculatorPage.verifyInterestCalculatorPageOpen();
    });

    await test.step("WHEN I don't accept the mandatory consent", async () => {
      await interestCalculatorPage.selectPrincipalAmount(principalAmount);
      await interestCalculatorPage.selectInterestRate(page, interestRate);
    });

    await test.step("THEN the page alerts me to Please fill in all fields", async () => {
      await interestCalculatorPage.calculateInterest(page, false);
      await interestCalculatorPage.verifyCalculationNotDisplayed();
    });
  });

  // For simplicity, the calculated interest and total amount should be rounded to two decimal places.
  // The application should be responsive and user-friendly.
  // Clear error messages should be displayed to guide users in case of missing or incorrect inputs.
});
