import { pageURL, loginDetails } from "../data/testData";

export const logIntoInterestCalculator = async (page) => {
  await page.goto(pageURL);
  await page.locator("#UserName").fill(loginDetails.username);
  await page.locator("#Password").fill(loginDetails.password);
  await page.getByRole("button", { name: "Log in" }).click();
};
