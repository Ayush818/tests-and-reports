/// <reference types="cypress" />

import { Environment } from "../../Environment";
import { homePageLocators } from "./locators";
const { baseUrl } = Cypress.env() as Environment;

const registerPageLocators = {
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
  passwordAdvide: "mat-slide-toggle",
  registerButton: 'button[type="submit"]',
  successMessage: ".mat-simple-snack-bar-content",
};

const loginPageLocators = {
  inputEmail: 'input[name="email"]',
  inputPassword: 'input[name="password"]',
  loginButton: 'button[type="submit"]',
};

// cypress custom commands for reusability
Cypress.Commands.add("clearLocalStorageAndVisitUrl", (baseUrl) => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit(baseUrl);
});

Cypress.Commands.add("clickOutside", () => {
  cy.get("mat-toolbar-row").click(0, 0, { force: true, multiple: true });
});

Cypress.Commands.add("registerUserAndLogin", (email, password) => {
  cy.session(`user-${email}`, () => {
    cy.setCookie("cookieconsent_status", "dismiss");
    cy.setCookie("welcomebanner_status", "dismiss");

    cy.visit(baseUrl + "register");
    cy.get(registerPageLocators.inputEmail).type(email);
    cy.setLocalStorage("email", email);
    cy.get(registerPageLocators.passwordAdvide).click();
    cy.get(registerPageLocators.inputPassword).type(password);
    cy.setLocalStorage("password", password);
    cy.get(registerPageLocators.inputRepeatPassword).type(password);
    cy.get(registerPageLocators.selectSecurityQuestion).click().focus();
    cy.get("#mat-option-2").click({ force: true }); //selecting the second option
    cy.get(registerPageLocators.inputSecurityAnswer).type("answer");
    cy.get(registerPageLocators.registerButton).click();
    cy.intercept({
      method: "POST",
      url: "/rest/user/login",
    }).as("login");
    cy.visit(baseUrl + "login");
    cy.get(loginPageLocators.inputEmail).type(email);
    cy.get(loginPageLocators.inputPassword).type(password);
    cy.get(loginPageLocators.loginButton).click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.wait(2000);
    cy.url().should("include", "/search");
  });
});
