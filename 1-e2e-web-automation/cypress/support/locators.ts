// Since OWASP Juice Shop doesn't provide data-testid attributes,
// I am using the existing HTML elements like classes, ids, and text content.
// Ideally, these locators could be further optimized if I had access to the frontend code
// to add custom data attributes for better test reliability.

import { error } from "cypress/types/jquery";

export const homePageLocators = {
  footer: ".mat-paginator-page-size",
  itemPerPage: '[aria-label="Items per page:"]',
  cookieAlert: '[aria-label="dismiss cookie message"]',
  welcomeAlert: '[aria-label="Close Welcome Banner"]',
  paginationList: 'div[role="listbox"]',
  listOption: ".mat-option",
  listOfItems: ".mat-grid-list",
  itemTiles: ".mat-grid-tile",
};

export const productPageLocators = {
  appleJuice: "Apple Juice (1000ml)",
  reviews: 'mat-expansion-panel-header[aria-expanded="false"]',
  productPopupModal: "mat-expansion-panel-header",
  productImage: ".img-thumbnail",
  expandReview: ".mat-expansion-indicator",
  closeProductPopup: 'button[aria-label="Close Dialog"]',
};

export const registerPageLocators = {
  userRegistration: "User Registration",
  inputFields: "input",
  inputEmail: 'input[aria-label="Email address field"]',
  inputPassword: 'input[aria-label="Field for the password"]',
  inputRepeatPassword: 'input[aria-label="Field to confirm the password"]',
  selectSecurityQuestion:
    'mat-select[aria-label="Selection list for the security question"]',
  inputSecurityAnswer:
    'input[aria-label="Field for the answer to the security question"]',
  errorLabel: ".mat-error",
};
