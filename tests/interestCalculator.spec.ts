import { test, expect, type Page } from "@playwright/test";
import { InterestCalculatorPage } from "../src/pages/InterestCalculatorPage";
import { pageURL, loginDetails } from "../src/data/testData";

const logIntoInterestCalculator = async (page) => {
  await page.goto(pageURL);
  await page.locator("#UserName").fill(loginDetails.username);
  await page.locator("#Password").fill(loginDetails.password);
  await page.getByRole("button", { name: "Log in" }).click();
};

test.describe("Scenario 1: The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly.", () => {
  test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
    logIntoInterestCalculator(page);
  });

  test("The application allows you to choose Daily interest", async ({
    page,
  }) => {
    const interestCalculatorPage = new InterestCalculatorPage(page);

    await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {
      interestCalculatorPage.verifyInterestCalculatorPageOpen;
    });

    await test.step("WHEN I select Daily interest", async () => {
      await interestCalculatorPage.dailyInterestBtn.click();
      
    });

    await test.step("THEN Daily Interest is selected", async () => {
      // check btn is highlighted
    });
  });
});

// test.describe("Scenario 2: Users should be able to input the principal amount.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("Users should be able to input the principal amount.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 3: Users should be able to select the interest rate from a predefined list of rates up to 15%.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("Users should be able to select the interest rate from a predefined list of rates up to 15%.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 4: The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 5: The application should display the calculated interest and the total amount including interest.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("The application should display the calculated interest and the total amount including interest.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 6: All input fields (principal amount, interest rate, duration and consent) are mandatory.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("All input fields (principal amount, interest rate, duration and consent) are mandatory.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 7: The application should inform the user if any field is left empty or not selected.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("The application should inform the user if any field is left empty or not selected..", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// test.describe("Scenario 8: For simplicity, the calculated interest and total amount should be rounded to two decimal places.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("For simplicity, the calculated interest and total amount should be rounded to two decimal places..", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });

// // * The application should be responsive and user-friendly.

// test.describe("Scenario 9: Clear error messages should be displayed to guide users in case of missing or incorrect inputs.", () => {
//   test.beforeEach("Load Interest Calculator Page", async ({ page }) => {
//     logIntoInterestCalculator(page);
//   });
// });

// test("Clear error messages should be displayed to guide users in case of missing or incorrect inputs.", async ({
//   page,
// }) => {
//   await test.step("GIVEN I have loaded the Interest Calculator Page", async () => {});
//   await test.step("WHEN I have loaded the login Page", async () => {});
//   await test.step("THEN I have loaded the login Page", async () => {});
// });
