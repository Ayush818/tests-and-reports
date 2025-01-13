import assert from "assert";

describe("Appium Automation Test", () => {
  it("should search for 'New York', verify search bar expands, and return to home", async () => {
    await driver.pause(2000);

    const searchBar = await $(
      '//android.widget.LinearLayout[@resource-id="org.wikipedia.alpha:id/search_container"]'
    );
    await searchBar.click();

    const searchInput = await $(
      '//android.widget.AutoCompleteTextView[@resource-id="org.wikipedia.alpha:id/search_src_text"]'
    );

    await searchInput.setValue("New York");

    await driver.pause(3000);

    const searchResults = await $(
      '//android.widget.FrameLayout[@resource-id="org.wikipedia.alpha:id/fragment_search_results"]'
    );
    const isResultsVisible = await searchResults.isDisplayed();
    assert(
      isResultsVisible,
      "Search results for 'New York' were not displayed"
    );

    const closeSearchButton = await $(
      '//android.widget.ImageView[@content-desc="Clear query"]'
    );

    await closeSearchButton.click();
    await driver.pause(500);
    await closeSearchButton.click();

    await driver.pause(3000);
  });
});
