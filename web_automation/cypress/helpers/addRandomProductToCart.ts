import { faker } from "@faker-js/faker";

export class AddProductToCart {
  productPageLocators = {
    listOfItems: ".mat-grid-list",
    itemTiles: ".mat-grid-tile",
    addToBasket: "button[aria-label='Add to Basket']",
    homePage: 'button[aria-label="Back to homepage"]',
    yourBasket: ".fa-layers-counter",
    snackBar: ".mat-simple-snack-bar-content",
    deleteFromBasket: '[data-icon="trash-alt"]',
    decreaseQuantity: '[data-icon="minus-square"]',
    increaseQuantity: '[data-icon="plus-square"]',
    checkOutButton: 'button[id="checkoutButton"]',
    addNewAddress: 'button[aria-label="Add a new address"]',
    addNewAddressHeaderByText: 'h1:contains("Add New Address")',
    addCountry: '[data-placeholder="Please provide a country."]',
    addName: '[data-placeholder="Please provide a name."]',
    addMobileNumber: '[data-placeholder="Please provide a mobile number."]',
    addZipCode: '[data-placeholder="Please provide a ZIP code."]',
    addAddress: '[data-placeholder="Please provide an address."]',
    addCity: '[data-placeholder="Please provide a city."]',
    addState: '[data-placeholder="Please provide a state."]',
    submitButton: 'button[type="submit"]',
    addressList: "mat-radio-button",
    continueButton: "Continue",
    addOtherPaymentOption: "",
    placeOrder: 'button[aria-label="Complete your purchase"]',
  };

  selectRandomProduct() {
    this._checkIfCartHasItems();

    for (let i = 0; i < 5; i++) {
      cy.get(this.productPageLocators.yourBasket)
        .invoke("text")
        .then((initialText) => {
          const initialCount = parseInt(initialText, 10);
          cy.log(`Initial basket count: ${initialCount}`);

          // Add a random product to the basket
          cy.get(this.productPageLocators.homePage).click({
            force: true,
          });

          cy.get(this.productPageLocators.listOfItems).within(() => {
            cy.get(this.productPageLocators.itemTiles).then((options) => {
              const length = options.length;
              cy.log(`Number of products available: ${length}`);
              const randomOption = Math.floor(Math.random() * length);
              cy.get(this.productPageLocators.itemTiles)
                .eq(randomOption)
                .find(this.productPageLocators.addToBasket)
                .click();
            });
          });

          // Verify the item was added
          cy.get(this.productPageLocators.snackBar).should("be.visible");

          // Assert basket count increased
          cy.wait(2000); // Ensure the update is reflected
          cy.get(this.productPageLocators.yourBasket)
            .invoke("text")
            .then((updatedText) => {
              const updatedCount = parseInt(updatedText, 10);
              cy.log(`Updated basket count: ${updatedCount}`);

              if (updatedCount <= initialCount) {
                cy.log("Basket count did not increase. Retrying...");
                i--;
              } else {
                cy.log("Basket count increased successfully.");
              }
            });
        });
    }
  }

  _checkIfCartHasItems() {
    cy.intercept({
      method: "DELETE",
      url: "/api/BasketItems/*",
    }).as("delete");
    cy.get(this.productPageLocators.yourBasket)
      .invoke("text")
      .then((text) => {
        cy.log(`The basket count is: ${text}`);
        cy.log(typeof text);
        const value = parseInt(text, 10);
        cy.log(`The basket count is: ${value}`);
        expect(value).to.be.a("number");
        if (value > 0) {
          cy.get(this.productPageLocators.yourBasket).click();

          cy.get(this.productPageLocators.deleteFromBasket).each(
            ($el, index) => {
              cy.wrap($el);

              cy.get(this.productPageLocators.deleteFromBasket).eq(0).click();
            }
          );
        } else {
          cy.log("Your cart is empty.");
        }
      });
  }

  updateProductQuantity() {
    let initialTotalPrice = 0;
    cy.wait(2000);
    cy.get("#price")
      .invoke("text")
      .then((text) => {
        const numericValue = parseInt(text.replace(/[^\d.-]/g, ""), 10);
        initialTotalPrice = numericValue;

        cy.log(
          `Initial total price: ${numericValue} type: ${typeof numericValue}`
        );

        cy.get(this.productPageLocators.increaseQuantity).each(($el, index) => {
          cy.wrap($el);
          cy.get(this.productPageLocators.increaseQuantity).eq(index).click();
        });
      });
    this._assertTotalPrice(initialTotalPrice);
    cy.log("Delete any Product from the cart");
    cy.get(this.productPageLocators.deleteFromBasket).eq(0).click();
    this._assertTotalPrice(initialTotalPrice);
  }

  _assertTotalPrice(initialTotalPrice: number) {
    cy.get("#price")
      .invoke("text")
      .then((text) => {
        const numericValue = parseInt(text.replace(/[^\d.-]/g, ""), 10);
        cy.log(
          `Updated total price: ${numericValue} type: ${typeof numericValue}`
        );

        expect(numericValue).to.be.greaterThan(initialTotalPrice);
      });
  }

  checkOutProduct() {
    cy.get(this.productPageLocators.checkOutButton)
      .should("be.visible")
      .click();
    this._addUserAddress();
    this._addPaymentDetails();
    this._placeOrder();
  }

  _addUserAddress() {
    cy.intercept({
      method: "POST",
      url: "/api/Addresss/",
    }).as("addAddress");
    cy.get(this.productPageLocators.addNewAddress)
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.get(this.productPageLocators.addNewAddressHeaderByText).should(
      "be.visible"
    );
    cy.get(this.productPageLocators.addCountry).type(faker.address.country());
    cy.get(this.productPageLocators.addName).type(faker.name.fullName());
    cy.get(this.productPageLocators.addMobileNumber).type(
      faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
    );
    cy.get(this.productPageLocators.addZipCode).type(
      faker.number.int({ min: 10000, max: 99999 }).toString()
    );
    cy.get(this.productPageLocators.addAddress).type(faker.address.street());
    cy.get(this.productPageLocators.addCity).type(faker.address.city());
    cy.get(this.productPageLocators.addState).type(faker.address.state());
    cy.get(this.productPageLocators.submitButton).click();
    cy.wait("@addAddress").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
    cy.get(this.productPageLocators.addressList).each(($el, index) => {
      cy.wrap($el).should("have.length.greaterThan", 0);
      cy.wait(2000);
      cy.get(this.productPageLocators.addressList)
        .eq(index - 1)
        .click({ force: true, multiple: true });
    });
    cy.contains(this.productPageLocators.continueButton)
      .scrollIntoView()
      .click();
    cy.contains("Fast Delivery").click();
    cy.contains(this.productPageLocators.continueButton).click();
  }
  _addPaymentDetails() {
    cy.contains("My Payment Options").should("be.visible");
    cy.wait(2000);
    cy.clickOutside();
    cy.get(".confirmation.card-title")
      .invoke("text")
      .then((text) => {
        const walletBalance = parseFloat(text.trim());
        if (walletBalance === 0) {
          cy.contains("Add new card").click();
          cy.contains("mat-label", "Name")
            .parents(".mat-form-field-infix")
            .find("input")
            .type(faker.name.fullName());
          cy.contains("mat-label", "Card Number")
            .parents(".mat-form-field-infix")
            .find("input")
            .type("3529999999999999");
          cy.contains("mat-label", "Expiry Month") // Find the label "Expiry Month"
            .parents(".mat-form-field-infix") // Navigate to the parent containing the dropdown
            .find("select") // Locate the <select> element inside
            .select("6"); // Select the value '6'
          cy.contains("mat-label", "Expiry Year")
            .parents(".mat-form-field-infix")
            .find("select")
            .select("2085") // Select the desired year (e.g., 2085)
            .should("have.value", "2085"); // Assert the selected value
          cy.get(this.productPageLocators.submitButton).eq(0).click({});
        }
      });
    cy.get(".mat-radio-button").click();
    cy.contains(this.productPageLocators.continueButton).click();
  }
  _placeOrder() {
    cy.intercept({
      method: "POST",
      url: "/rest/basket/*/checkout",
    }).as("placeOrder");
    cy.get(this.productPageLocators.placeOrder).click();
    cy.wait("@placeOrder").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  }
}
