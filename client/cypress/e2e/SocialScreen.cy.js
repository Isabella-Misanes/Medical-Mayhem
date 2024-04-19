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
            cy.get('#username').type('JohnSmith');
            cy.get('#add-friend-submit').click();
            cy.get('#error').should('be.visible');
        })

        it('should not allow the user to add a user that doesn\'t exist', () => {
            cy.get('#username').type('skibidi');
            cy.get('#add-friend-submit').click();
            cy.get('#error').should('be.visible');
        })

        it('should allow the user to add a user that exists', () => {
            cy.get('#username').type('JareBear');

            cy.intercept('POST', /\/api\/friendRequest\/.*/, {
                statusCode: 200
            }).as('sendFriend')

            cy.get('#add-friend-submit').click();
            cy.wait('@sendFriend');
            cy.get('#add-friend-modal').should('not.exist');
            cy.get('#sent-button').click();
        })
    })
})