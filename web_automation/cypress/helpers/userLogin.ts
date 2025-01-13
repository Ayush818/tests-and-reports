import { Environment } from "../../Environment";

const { baseUrl } = Cypress.env() as Environment;

export class UserLogin {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  loginPageLocators = {
    inputEmail: 'input[name="email"]',
    inputPassword: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
  };
  userLogin() {
    cy.setCookie("cookieconsent_status", "dismiss");
    cy.setCookie("welcomebanner_status", "dismiss");
    cy.visit(baseUrl + "login");
    cy.intercept({
      method: "POST",
      url: "/rest/user/login",
    }).as("login");
    cy.get(this.loginPageLocators.inputEmail).type(this.email);
    cy.get(this.loginPageLocators.inputPassword).type(this.password);
    cy.get(this.loginPageLocators.loginButton).click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.wait(2000);
    cy.url().should("include", "/search");
  }
}
