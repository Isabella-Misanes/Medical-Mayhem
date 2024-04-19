const baseUrl = Cypress.config('baseUrl')

describe('Guest Navigation', () => {
    it('should not be able to click Social as a guest', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#social-button').should('be.disabled')
      })
  
    it('should not be able to click Profile as a guest', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#profile-button').should('be.disabled')
    })
  
    it('should continue as guest then display a queue modal successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#play-button').click()
        cy.get('#queue-modal').should('be.visible')
    })
    
    it('should continue as guest then navigate to the map search screen successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#map-search-button').should('be.enabled')
        cy.get('#map-search-button').click()
        cy.url().should('eq', `${baseUrl}/mapsearch`)
    })

    it('should continue as guest then navigate to the forums screen successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#forums-button').should('be.enabled')
        cy.get('#forums-button').click()
        cy.url().should('eq', `${baseUrl}/forum`)
    })

    it('should continue as guest then navigate to the settings screen successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#settings-button').should('be.enabled')
        cy.get('#settings-button').click()
        cy.url().should('eq', `${baseUrl}/settings`)
    })

    it('should continue as guest then navigate to the about screen successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#about-button').should('be.enabled')
        cy.get('#about-button').click()
        cy.url().should('eq', `${baseUrl}/about`)
    })

    it('should continue as guest then navigate to the leaderboard screen successfully', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#leaderboard-button').should('be.enabled')
        cy.get('#leaderboard-button').click()
        cy.url().should('eq', `${baseUrl}/leaderboard`)
    })

    it('should not be able to click Social as a guest', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#social-button').should('be.disabled')
    })

    it('should not be able to click Profile as a guest', () => {
        cy.visit('/')
        cy.get('#continue-as-guest').click()
        cy.get('#profile-button').should('be.disabled')
    })
})