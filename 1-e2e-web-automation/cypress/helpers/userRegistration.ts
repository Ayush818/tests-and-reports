export class UserRegistration {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  registerPageLocators = {
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

  validateSignupForm() {
    cy.contains(this.registerPageLocators.userRegistration).should(
      "be.visible"
    );
    cy.get(this.registerPageLocators.inputEmail).click().clickOutside();
    cy.get(this.registerPageLocators.errorLabel)
      .contains("Please provide an email address.")
      .should("be.visible");
    cy.get(this.registerPageLocators.inputPassword).click().clickOutside();
    cy.get(this.registerPageLocators.errorLabel)
      .contains("Please provide a password.")
      .should("be.visible");
    cy.get(this.registerPageLocators.inputRepeatPassword)
      .click()
      .clickOutside();
    cy.get(this.registerPageLocators.errorLabel)
      .contains("Please repeat your password.")
      .should("be.visible");
    cy.get(this.registerPageLocators.selectSecurityQuestion)
      .click()
      .focus()
      .type("{esc}");
    cy.get("app-register").click({ force: true });
    cy.get(this.registerPageLocators.errorLabel)
      .contains("Please select a security question.")
      .should("be.visible");
    cy.get(this.registerPageLocators.inputSecurityAnswer)
      .click()
      .clickOutside();
    cy.get(this.registerPageLocators.errorLabel)
      .contains("Please provide an answer to your security question.")
      .should("be.visible");
  }
  registerUser() {
    cy.intercept({
      method: "POST",
      url: "/api/Users/",
    }).as("registerUser");
    cy.get(this.registerPageLocators.inputEmail).type(this.email);
    cy.setLocalStorage("email", this.email);
    cy.get(this.registerPageLocators.passwordAdvide).click();
    cy.get(this.registerPageLocators.inputPassword).type(this.password);
    cy.setLocalStorage("password", this.password);
    cy.get(this.registerPageLocators.inputRepeatPassword).type(this.password);
    cy.get(this.registerPageLocators.selectSecurityQuestion).click().focus();
    cy.get("#mat-option-2").click({ force: true }); //selecting the second option
    cy.get(this.registerPageLocators.inputSecurityAnswer).type("answer");
    cy.get(this.registerPageLocators.registerButton).click();
    cy.wait("@registerUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      console.log(interception.response);
      expect(interception.response.body.data).to.have.property(
        "email",
        this.email
      );
      cy.get(this.registerPageLocators.successMessage)
        .should("be.visible")
        .and(
          "contain.text",
          "Registration completed successfully. You can now log in."
        );
      cy.url().should("include", "/login");
    });
  }
}
