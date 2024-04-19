const baseUrl = Cypress.config('baseUrl')

describe('Home Navigation', () => {

    describe('Guest', () => {
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
      
        it('should display a queue modal successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#play-button').click()
            cy.get('#queue-modal').should('be.visible')
        })
        
        it('should navigate to the map search screen successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#map-search-button').should('be.enabled')
            cy.get('#map-search-button').click()
            cy.url().should('eq', `${baseUrl}/mapsearch`)
        })
    
        it('should navigate to the forums screen successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#forums-button').should('be.enabled')
            cy.get('#forums-button').click()
            cy.url().should('eq', `${baseUrl}/forum`)
        })
    
        it('should navigate to the settings screen successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#settings-button').should('be.enabled')
            cy.get('#settings-button').click()
            cy.url().should('eq', `${baseUrl}/settings`)
        })
    
        it('should navigate to the about screen successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#about-button').should('be.enabled')
            cy.get('#about-button').click()
            cy.url().should('eq', `${baseUrl}/about`)
        })
    
        it('should navigate to the leaderboard screen successfully', () => {
            cy.visit('/')
            cy.get('#continue-as-guest').click()
            cy.get('#leaderboard-button').should('be.enabled')
            cy.get('#leaderboard-button').click()
            cy.url().should('eq', `${baseUrl}/leaderboard`)
        })
    })

    describe('Registered User', () => {

        beforeEach(() => {
            cy.login('john.smith@gmail.com', 'password')
        })

        it('should navigate to the Social screen successfully', () => {
            cy.visit('/')
            cy.get('#social-button').click()
            cy.url().should('eq', `${baseUrl}/social`)
        })
      
        it('should navigate to the Profile screen successfully', () => {
            cy.visit('/')
            cy.get('#profile-button').click()
            cy.url().should('eq', `${baseUrl}/profile`)
        })
      
        it('should display a queue modal by clicking Play successfully', () => {
            cy.visit('/')
            cy.get('#play-button').click()
            cy.get('#queue-modal').should('be.visible')
        })
        
        it('should navigate to the map search screen successfully', () => {
            cy.visit('/')
            cy.get('#map-search-button').click()
            cy.url().should('eq', `${baseUrl}/mapsearch`)
        })
    
        it('should navigate to the forums screen successfully', () => {
            cy.visit('/')
            cy.get('#forums-button').click()
            cy.url().should('eq', `${baseUrl}/forum`)
        })
    
        it('should navigate to the settings screen successfully', () => {
            cy.visit('/')
            cy.get('#settings-button').click()
            cy.url().should('eq', `${baseUrl}/settings`)
        })
    
        it('should navigate to the about screen successfully', () => {
            cy.visit('/')
            cy.get('#about-button').click()
            cy.url().should('eq', `${baseUrl}/about`)
        })
    
        it('should navigate to the leaderboard screen successfully', () => {
            cy.visit('/')
            cy.get('#leaderboard-button').click()
            cy.url().should('eq', `${baseUrl}/leaderboard`)
        })
    })
})