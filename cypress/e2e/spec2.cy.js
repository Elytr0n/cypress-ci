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


  it('TC15 - 1 symbol for the email local part required', () => {
    cy.get('input[name="name"][type="text"]').type('NoLocalpart NoLove');
    cy.get('input[name="email"][type="email"]').type('@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').clear();

    cy.contains(createAccBtnLoc,'Create Account').click()

    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
         .should('contain', 'Введите часть адреса до символа "@". Адрес "@gmail.com" неполный.');

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('a@gmail.com');
    cy.get('input[name="email"][type="email"]').invoke('prop', 'validationMessage')
        .should('be.empty');
  })
  }
)