/// <reference types="cypress" />

function userID_Alpha() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
let createAccBtnLoc = '[class="_btnFill_1hv0m_1"]';
let emailValidationLoc = '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]';

describe('Sign Up Test Suite', () => {

  beforeEach( () => {
      cy.visit('/sign-up');
  })

  it('TC07 - 1 symbol for the email local part required', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"][type="email"]').type('@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc,'Sign In').click()

    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
         .should('contain', 'Введите часть адреса до символа "@". Адрес "@gmail.com" неполный.');

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('a@gmail.com');
    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('be.empty');
  }); 

  it('TC15 - 1 symbol for the email local part required', () => {
    cy.get('input[name="name"][type="text"]').type('NoLocalpart NoLove');
    cy.get('input[name="email"][type="email"]').type('@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').clear();

    cy.contains(createAccBtnLoc,'Create Account').click()

    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
         .should('contain', 'Please enter a part followed by \'@\'. \'@gmail.com\' is incomplete.');

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('a@gmail.com');
    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('be.empty');
  })
  it('TC05 Email in Cyrillic', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"][type="email"]').type('вася@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.contains(createAccBtnLoc,'Sign In').click()
    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('contain', 'A part followed by \'@\' should not contain the symbol \'в\'.');
  }); 

  it('TC17 - Email domain part cannot start with a hyphen', () => {
    cy.get('input[name="name"][type="text"]').type('Hyphen Fan');
    cy.get('input[name="email"][type="email"]').type('abc123@-mail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc,'Create Account').click()

    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('contain', 'Please enter an email address.');
  });  

  it('TC19 Email in Cyrillic', () => {
    cy.get('input[name="name"][type="text"]').type('Cyrillics Fan');
    cy.get('input[name="email"][type="email"]').type('вася@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc,'Create Account').click()

    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('contain', 'A part followed by \'@\' should not contain the symbol \'в\'.');
});  

it('TC20 Email should contain @ symbol', () => {
  cy.get('input[name="name"][type="text"]').type('Lost Dog');
  cy.get('input[name="email"][type="email"]').type('abc123mail.com');
  cy.get('input[name="password"][type="password"]').type('11111111');
  cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

  cy.contains(createAccBtnLoc,'Create Account').click()

  cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
      .should('contain', 'Please include an \'@\' in the email address. \'abc123mail.com\' is missing an \'@\'.');
}); 

  }
)