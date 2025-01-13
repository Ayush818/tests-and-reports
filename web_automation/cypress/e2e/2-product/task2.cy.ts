/// <reference types = "cypress"/>
import { Environment } from "../../../Environment";
import { productPageLocators } from "../../support/locators";
const { baseUrl } = Cypress.env() as Environment;

describe("Product Interaction Test - Apple Juice", () => {
  beforeEach(() => {
    cy.clearLocalStorageAndVisitUrl(baseUrl);
  });
  it("should click on Apple and validate image is of same product", () => {
    cy.contains(productPageLocators.appleJuice).click();
    cy.get(productPageLocators.productPopupModal).should("be.visible");
    cy.get(productPageLocators.productImage)
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "apple_juice.jpg");
    cy.wait(300);
    cy.get(productPageLocators.reviews).then((reviews) => {
      const hasReview = reviews[0].innerText[9];
      if (hasReview != "0") {
        cy.get(productPageLocators.expandReview).click();
      }
    });
    cy.wait(2000);
    cy.get(productPageLocators.closeProductPopup).click();
  });
});
