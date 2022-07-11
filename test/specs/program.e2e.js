const loginPage = require("../pageobjects/login.page");
const planPage = require("../pageobjects/plan.page");

describe("Adding first plan and verifying content", () => {
  it("Should login and verify user is on My plan tab", async () => {
    // Logs the user in
    loginPage.login("qa-prod1@gymondo.de", "purpleSquid22!");
    // Verify window title
    await expect(browser).toHaveTitle(
      "Gymondo Online Fitness - Get Fit & Happy at Home"
    );
    //  Verify nav link attribute
    await expect(await $(".top-nav__list").$("a=My plan")).toHaveAttribute(
      "aria-current",
      "page"
    );
    // Verify nav link color
    const colorobj = await $(".top-nav__list")
      .$("a=My plan")
      .getCSSProperty("color");
    let colorHex = colorobj.parsed.hex;
    await expect(colorHex).toBe("#ff7f66");
    // Verify head titles are displayed
    expect(await $(".page-wrapper h1").getText()).toContain(", Tester!");
    await expect(await $(".page-wrapper h2")).toBeDisplayed();
  });

  it("Should start a new program", async () => {
    //  Start a program
    planPage.startProgram();
    //  Verify program settings and timeline area appears.
    await expect(await $("div[class*=calendar_buttons]")).toBeDisplayed();
    // Verify program stats appear
    await expect(await $("div[class*=header_statsLink]")).toBeDisplayed();
  });

  it("Should remove the added program", async () => {
    //  Clean after the test
    planPage.removeProgram();
    await browser.pause(1000);
    // Verify welcome text appear again
    expect(await $(".page-wrapper h2").getText()).toEqual(
      "Select a program and start planning your workout routine."
    );
  });
});