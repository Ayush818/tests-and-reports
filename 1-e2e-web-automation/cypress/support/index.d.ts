declare namespace Cypress {
  interface Chainable {
    clearLocalStorageAndVisitUrl(baseUrl: string): Chainable<Element>;
    clickOutside(): Chainable<Element>;
    registerUserAndLogin(email: string, password: string): Chainable<Element>;
  }
}
