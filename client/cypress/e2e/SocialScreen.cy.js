const baseUrl = Cypress.config('baseUrl')

// Helper function to login before every test
Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
  
      cy.visit('/')
      cy.get('#login').click()
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.get('#loginSubmit').click()
      cy.url().should('eq', `${baseUrl}/`)
    })
  })

describe('Social Screen', () => {
    // Continue as registered user before each test
    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
        cy.visit('/')
        cy.get('#social-button').should('be.enabled')
        cy.get('#social-button').click()
    })

    it('should see list of friends successfully', () => {
        cy.get('#friends-button').click()
        cy.get('#friends').should('be.visible');
        cy.get('#no-friends').should('be.visible');
    })

    it('should see list of recent players successfully', () => {
        cy.get('#recent-players-button').click()
        cy.get('#recent-players').should('be.visible');
        cy.get('#no-recent-players').should('be.visible');
    })

    it('should see list of sent friend requests successfully', () => {
        cy.get('#sent-button').click()
        cy.get('#sent-requests').should('be.visible');
        cy.get('#no-sent-friend-requests').should('be.visible');
    })

    it('should see list of received friend requests successfully', () => {
        cy.get('#received-button').click()
        cy.get('#received-requests').should('be.visible');
        cy.get('#no-received-friend-requests').should('be.visible');
    })

    it('should access the add friend modal successfully', () => {
        cy.get('#add-friend').click()
        cy.get('#add-friend-modal').should('be.visible');
    })

    describe('Send Friend Request Functionality', () => {
        beforeEach(() => {
            cy.get('#add-friend').click()
            cy.get('#add-friend-modal').should('be.visible');
        })

        it('should not allow the user to add themself', () => {
            cy.get('#username').type('JohnSmith123');
            cy.get('#add-friend-submit').click();
            cy.get('#error').should('be.visible');
        })
    })

    // it('should not be able to click Profile as a guest', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#profile-button').should('be.disabled')
    // })
  
    // it('should continue as guest then display a queue modal successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#play-button').click()
    //     cy.get('#queue-modal').should('be.visible')
    // })
    
    // it('should continue as guest then navigate to the map search screen successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#map-search-button').should('be.enabled')
    //     cy.get('#map-search-button').click()
    //     cy.url().should('eq', `${baseUrl}/mapsearch`)
    // })

    // it('should continue as guest then navigate to the forums screen successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#forums-button').should('be.enabled')
    //     cy.get('#forums-button').click()
    //     cy.url().should('eq', `${baseUrl}/forum`)
    // })

    // it('should continue as guest then navigate to the settings screen successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#settings-button').should('be.enabled')
    //     cy.get('#settings-button').click()
    //     cy.url().should('eq', `${baseUrl}/settings`)
    // })

    // it('should continue as guest then navigate to the about screen successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#about-button').should('be.enabled')
    //     cy.get('#about-button').click()
    //     cy.url().should('eq', `${baseUrl}/about`)
    // })

    // it('should continue as guest then navigate to the leaderboard screen successfully', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#leaderboard-button').should('be.enabled')
    //     cy.get('#leaderboard-button').click()
    //     cy.url().should('eq', `${baseUrl}/leaderboard`)
    // })

    // it('should not be able to click Social as a guest', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#social-button').should('be.disabled')
    // })

    // it('should not be able to click Profile as a guest', () => {
    //     cy.visit('/')
    //     cy.get('#continue-as-guest').click()
    //     cy.get('#profile-button').should('be.disabled')
    // })
})