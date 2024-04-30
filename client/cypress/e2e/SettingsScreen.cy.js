const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.visit('/')
        cy.get('#login').should('be.visible').click()
        cy.get('#email').should('be.visible').type(email)
        cy.get('#password').should('be.visible').type(password)
        cy.get('#loginSubmit').should('be.visible').click()
        cy.url().should('eq', `${baseUrl}/`)
    })
})

describe('Settings Screen', () => {
    // Continue as registered user before each test
    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
        cy.visit('/')
        cy.get('#settings-button').should('be.visible').should('be.enabled')
        cy.get('#settings-button').should('be.visible').click()
    })

    it('should be able to move master volume slider', () => {
        cy.get('#master-slider').within(() => { cy.get('span[data-index=59]').click(); })
    })

    it('should be able to move music volume slider', () => {
        cy.get('#music-slider').within(() => { cy.get('span[data-index=59]').click(); })
    })

    it('should be able to move master volume slider', () => {
        cy.get('#sfx-slider').within(() => { cy.get('span[data-index=59]').click(); })
    })
})