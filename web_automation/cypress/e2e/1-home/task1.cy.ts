/// <reference types = "cypress"/>

import { Environment } from "../../../Environment";
import { homePageLocators } from "../../support/locators";

const { baseUrl } = Cypress.env() as Environment;
describe("Home Page - Items Per Page", () => {
  beforeEach(() => {
    cy.clearLocalStorageAndVisitUrl(baseUrl);
  });
  it("Displays all items when 'Items Per Page' dropdown is set to maximum option", () => {
    cy.get(homePageLocators.footer).scrollIntoView();
    cy.get(homePageLocators.itemPerPage).click();
    cy.get(homePageLocators.paginationList).within(() => {
      cy.get(homePageLocators.listOption)
        .should("have.length.greaterThan", 0)
        .then((options) => {
          const length = options.length;
          cy.log(`Number of options: ${length}`);
          cy.get(homePageLocators.listOption).last().click();
        });
    });
    cy.get(homePageLocators.listOfItems).within(() => {
      cy.get(homePageLocators.itemTiles)
        .should("have.length.greaterThan", 12)
        .then((tiles) => {
          const length = tiles.length;
          cy.log(`Number of grid tiles: ${length}`);
          cy.wrap(tiles).each((tile, index) => {
            cy.wrap(tile).scrollIntoView().should("be.visible");
            cy.log(`Tile ${index + 1} is visible`);
          });
        });
    });
  });
});
