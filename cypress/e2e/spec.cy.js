describe('Movies', () => {
  it('first', () => {
    cy.visit('/')
    cy.get(':nth-child(1) > a.jsx-251689666 > h3.jsx-251689666')
      .should('contain', 'WALL·E')
  })
})