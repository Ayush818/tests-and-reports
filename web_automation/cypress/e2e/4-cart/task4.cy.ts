/// <reference types = "cypress"/>
import { Environment } from "../../../Environment";
import { UserRegistration } from "../../helpers/userRegistration";
import { AddProductToCart } from "../../helpers/addRandomProductToCart";
import { UserLogin } from "../../helpers/userLogin";
import {
  generateEmail,
  generatePassword,
} from "../../fixtures/generateUserDetails";

const { baseUrl } = Cypress.env() as Environment;
let email = generateEmail();
let password = generatePassword();

const addProductToCart = new AddProductToCart();

describe("Website Login and Shopping Cart Automation", () => {
  beforeEach(() => {
    cy.registerUserAndLogin(email, password);
  });
  it("should be able to add random five product to cart", () => {
    cy.visit(baseUrl);
    addProductToCart.selectRandomProduct();
  });
  it("should be able to modify random product quantity and validate total price", () => {
    cy.visit(baseUrl + "basket");
    addProductToCart.updateProductQuantity();
  });
  it("should checkout the product from the cart", () => {
    cy.visit(baseUrl + "basket");
    addProductToCart.checkOutProduct();
  });
});
