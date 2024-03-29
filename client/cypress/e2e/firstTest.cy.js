describe('template spec', () => {
  it('should continue as guest successfully', () => {
    cy.visit('http://localhost:3000/')

    cy.get('#continue-as-guest').click()

    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should register a new user successfully', () => {
    cy.visit('http://localhost:3000/')

    cy.intercept('POST', '/auth/register', {
      statusCode: 200,
      body: {
        success: true,
        user: {
            username : 'JohnSmith123',
            email : 'john.smith@gmail.com',
        }
      }
    }).as('registration')

    cy.get('#register').click()

    cy.get('#username').type('JohnSmith123')
    cy.get('#email').type('john.smith@gmail.com')
    cy.get('#password').type('password')
    cy.get('#passwordVerify').type('password')

    cy.get('#signUp').click()

    cy.wait('@registration')

    cy.url().should('eq', 'http://localhost:3000/')
  })
})