import 'cypress-file-upload'

const baseUrl = Cypress.config('baseUrl')

// Helper function to login before every test
Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.visit('/')
        cy.wait(3000)
        cy.get('#login').click()
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#loginSubmit').click()
        cy.url().should('eq', `${baseUrl}/`)
    })
})

describe('Profile Info Modification', () => {

    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
    })

    it('should change a username successfully', () => {
        cy.visit('/')

        cy.intercept('POST', '/api/updateProfile', {
            statusCode: 200,
        }).as('updateProfile')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#username-input').clear().type('JaneDoe')
        cy.get('#edit-button').click()
        cy.wait('@updateProfile')
        cy.get('#username-text').invoke('text').should('eq', 'JaneDoe')
    })

    it('should display the same username given an empty username', () => {
        cy.visit('/')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#username-input').clear()
        cy.get('#edit-button').click()
        cy.get('#username-text').invoke('text').should('eq', 'JohnSmith')
    })

    it('should change a bio successfully', () => {
        cy.visit('/')

        cy.intercept('POST', '/api/updateProfile', {
            statusCode: 200,
        }).as('updateProfile')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#bio').type('Hello!')
        cy.get('#edit-button').click()
        cy.wait('@updateProfile')
        cy.get('#bio').invoke('val').should('eq', 'Hello!')
    })

    it('should change a bio to empty successfully', () => {
        cy.visit('/')

        cy.intercept('POST', '/api/updateProfile', {
            statusCode: 200,
        }).as('updateProfile')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#bio').clear()
        cy.get('#edit-button').click()
        cy.wait('@updateProfile')
        cy.get('#bio').invoke('val').should('eq', '')
    })

    it('should change a profile picture successfully', () => {
        cy.visit('/')

        cy.intercept('POST', '/api/updateProfile', {
            statusCode: 200,
        }).as('updateProfile')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#file-upload').attachFile('../fixtures/images/Pokémon_Pikachu_art.png')
    })

    it('should change a profile picture successfully', () => {
        cy.visit('/')

        cy.intercept('POST', '/api/updateProfile', {
            statusCode: 200,
        }).as('updateProfile')

        cy.get('#profile-button').click()
        cy.url().should('eq', `${baseUrl}/profile`)
        cy.get('#edit-button').click()
        cy.get('#file-upload').attachFile('../fixtures/images/Pokémon_Pikachu_art.png')
    })
})