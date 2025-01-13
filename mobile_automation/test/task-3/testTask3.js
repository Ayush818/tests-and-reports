describe("Appium Automation Test", () => {
  it("should open app, go to settings, disable all options, and return to home", async () => {
    await driver.pause(2000);

    const menuButton = await driver.$(
      "//android.widget.TextView[@content-desc='More options']"
    );
    await menuButton.click();

    const settingsButton = await driver.$(
      "//android.widget.TextView[@resource-id='org.wikipedia.alpha:id/explore_overflow_settings']"
    );
    await settingsButton.click();

    const showImagesSwitch = await driver.$(
      "(//android.widget.Switch[@resource-id='org.wikipedia.alpha:id/switchWidget'])[1]"
    );

    await showImagesSwitch.click();

    const linkPreviewSwitch = await driver.$(
      "(//android.widget.Switch[@resource-id='org.wikipedia.alpha:id/switchWidget'])[2]"
    );

    await linkPreviewSwitch.click();

    const userReportsSwitch = await driver.$(
      "(//android.widget.Switch[@resource-id='org.wikipedia.alpha:id/switchWidget'])[3]"
    );

    await userReportsSwitch.click();

    const crashReportsSwitch = await driver.$(
      "(//android.widget.Switch[@resource-id='org.wikipedia.alpha:id/switchWidget'])[4]"
    );

    await crashReportsSwitch.click();

    const backButton = await driver.$(
      "//android.widget.ImageButton[@content-desc='Navigate up']"
    );
    await backButton.click();

    await driver.pause(3000);
  });
});
