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

describe('Character Builder Screen', () => {

    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
        cy.visit('/')
        cy.get('#map-builder-button').should('be.enabled')
        cy.get('#map-builder-button').click()
    })

  it('should be able to select all premade characters', () => {
        cy.visit('/mapbuilder')
        for(let i=0; i<6; i++) {
            cy.get('#character-'+(i)).click()
        }
    })

    it('should be able to confirm changes', () => {
        cy.visit('/mapbuilder')
        cy.get('#confirm-changes').click()
        cy.get('#confirm-changes').should('be.enabled')
    })

    it('should be able to move sliders', () => {
        cy.visit('/mapbuilder')
        for(let i=0; i<3; i++) {
            cy.get('#slider-speed').invoke('val', i).trigger('change')
            cy.get('#slider-strength').invoke('val', i).trigger('change')
            cy.get('#slider-defense').invoke('val', i).trigger('change')

            cy.get('#slider-speed').should('have.value', i)
            cy.get('#slider-strength').should('have.value', i)
            cy.get('#slider-defense').should('have.value', i)
        }
    })
})

