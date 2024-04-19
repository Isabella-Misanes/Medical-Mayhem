const baseUrl = Cypress.config('baseUrl')

describe('Authentication', () => {

  it('should register an account' , () => {
    cy.visit('/')

    cy.intercept('POST', '/auth/register', {
      statusCode: 200,
      body: {
        success: true,
        username : 'JohnSmith123',
        email : 'john.smith@gmail.com',
      }
    }).as('registration')

    cy.wait(3000);
    
    cy.get('#register').click()

    cy.get('#username').type('JohnSmith123')
    cy.get('#email').type('john.smith@gmail.com')
    cy.get('#password').type('password')
    cy.get('#passwordVerify').type('password')

    cy.get('#signUp').click()

    cy.wait('@registration')

    cy.url().should('eq', `${baseUrl}/`)
  })

  it('should login an account' , () => {
    cy.visit('/')
    cy.get('#login').click()

    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        username : 'JohnSmith123',
        email : 'john.smith@gmail.com',
      }
    }).as('login')

    cy.get('#email').type('john.smith@gmail.com')
    cy.get('#password').type('password')
    cy.get('#loginSubmit').click()
    cy.wait('@login')
    cy.url().should('eq', `${baseUrl}/`)
  })

  describe('Registered Accounts', () => {

    beforeEach(() => {
      cy.login('john.smith@gmail.com', 'password')
      cy.visit('/')
    })

    it('should log out using the Log Out button', () => {
      cy.get('#settings-button').click()
      cy.get('#log-out').click()
      cy.url().should('eq', `${baseUrl}/`)
    })

    it('should log out using the Delete Account button', () => {
      cy.get('#settings-button').click()

      cy.intercept('POST', '/auth/deleteUser', {
        statusCode: 200
      }).as('delete-account')

      cy.get('#delete-account').click()
      cy.wait('@delete-account')

      cy.url().should('eq', `${baseUrl}/`)
    })
  })

  describe('Guests', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get('#continue-as-guest').click()
      cy.url().should('eq', `${baseUrl}/`)
    })

    it('should login from the Settings screen', () => {
      cy.get('#settings-button').click()
      cy.url().should('eq', `${baseUrl}/settings`)
      cy.get('#login').click()
      cy.url().should('eq', `${baseUrl}/login`)
      
      cy.intercept('POST', '/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          username : 'JohnSmith123',
          email : 'john.smith@gmail.com',
        }
      }).as('login')
  
      cy.get('#email').type('john.smith@gmail.com')
      cy.get('#password').type('password')
      cy.get('#loginSubmit').click()
      cy.wait('@login')
      cy.url().should('eq', `${baseUrl}/`)
    })

    it('should register from the Settings screen', () => {
      cy.get('#settings-button').click()
      cy.url().should('eq', `${baseUrl}/settings`)
      cy.get('#register').click()
      cy.url().should('eq', `${baseUrl}/register`)
      
      cy.intercept('POST', '/auth/register', {
        statusCode: 200,
        body: {
          success: true,
          username : 'JohnSmith123',
          email : 'john.smith@gmail.com',
        }
      }).as('registration')
  
      cy.get('#username').type('JohnSmith123')
      cy.get('#email').type('john.smith@gmail.com')
      cy.get('#password').type('password')
      cy.get('#passwordVerify').type('password')
  
      cy.get('#signUp').click()
  
      cy.wait('@registration')
  
      cy.url().should('eq', `${baseUrl}/`)
    })
  })
})