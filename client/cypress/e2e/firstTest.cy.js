describe('template spec', () => {
  it('should continue as guest successfully', () => {
    cy.visit('https://medical-mayhem-7429b.firebaseapp.com/')

    cy.get('#continue-as-guest').click()

    cy.url().should('eq', 'https://medical-mayhem-7429b.firebaseapp.com/')
  })

  it('should register a new user successfully', () => {
    cy.visit('https://medical-mayhem-7429b.firebaseapp.com/')

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

    cy.url().should('eq', 'https://medical-mayhem-7429b.firebaseapp.com//')
  })
})