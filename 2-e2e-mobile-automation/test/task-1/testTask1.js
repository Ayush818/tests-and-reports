describe("Appium Automation Test", () => {
  it("should launch the app, scroll, and interact with elements", async () => {
    await driver.pause(2000);
    const myLists = await $(
      '(//android.widget.ImageView[@resource-id="org.wikipedia.alpha:id/icon"])[2]'
    );
    await myLists.click();
    await driver.pause(3000);
    const history = await $(
      '//android.widget.FrameLayout[@content-desc="History"]'
    );
    await history.click();
    await driver.pause(3000);
    const nearby = await $(
      '//android.widget.FrameLayout[@content-desc="Nearby"]/android.view.ViewGroup'
    );
    await nearby.click();
    await driver.pause(3000);
    const browseIcon = await $(
      '//android.widget.FrameLayout[@content-desc="Explore"]'
    );

    await browseIcon.click();
    await driver.pause(3000);
  });
});
