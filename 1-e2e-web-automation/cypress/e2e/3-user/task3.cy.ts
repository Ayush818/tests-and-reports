/// <reference types = "cypress"/>
import { Environment } from "../../../Environment";
import { UserRegistration } from "../../helpers/userRegistration";
import { UserLogin } from "../../helpers/userLogin";
import {
  generateEmail,
  generatePassword,
} from "../../fixtures/generateUserDetails";

const { baseUrl } = Cypress.env() as Environment;

const email = generateEmail();
const password = generatePassword();

const userRegistration = new UserRegistration(email, password);
const userLogin = new UserLogin(email, password);

describe("User Registraction and form validation", () => {
  before(() => {
    cy.clearLocalStorageAndVisitUrl(baseUrl);
  });
  it("should validate input filed validation of signup form", () => {
    cy.visit(baseUrl + "register");
    userRegistration.validateSignupForm();
  });
  it("should be able to register a user with required data", () => {
    cy.visit(baseUrl + "register");
    userRegistration.registerUser();
  });
  it("should be able to login with registered user", () => {
    cy.visit(baseUrl + "login");
    userLogin.userLogin();
  });
});
