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

Cypress.Commands.add('reenter', () => {
    cy.get('#back-button').click();
    cy.get('#settings-button').should('be.visible').click();
})

Cypress.Commands.add('moveSlider', (vol) => {
    const random = Math.floor(Math.random() * (Math.floor(101) - Math.ceil(0)) + Math.ceil(0));
    cy.get(`#${vol}-slider`).within(() => cy.get(`span[data-index=${random}]`).click({multiple: true, force: true}));
    cy.get('#confirm-audio').click();
    cy.reenter();
    // Margin of error in testing
    cy.get(`#${vol}-volume`).should('be.visible').each(x => {
        expect(x.text()).to.be.oneOf([`${random}`, `${random + 1}`, `${random - 1}`]);
    });
})

describe('Settings Screen', () => {
    // Continue as registered user before each test
    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
        cy.visit('/')
        cy.get('#settings-button').should('be.visible').should('be.enabled')
        cy.get('#settings-button').should('be.visible').click()
    })

    // Modify volume
    it('should be able to modify master volume', () => cy.moveSlider('master'));
    it('should be able to modify music volume', () => cy.moveSlider('music'));
    it('should be able to modify sfx volume', () => cy.moveSlider('sfx'));
    
    // Reset volume
    it('should be able to reset audio settings', () => {
        cy.get('#reset-audio').click();
        cy.get('#master-volume').should('be.visible').contains('100');
        cy.get('#music-volume').should('be.visible').contains('100');
        cy.get('#sfx-volume').should('be.visible').contains('100');
        cy.reenter();
        cy.get('#master-volume').should('be.visible').contains('100');
        cy.get('#music-volume').should('be.visible').contains('100');
        cy.get('#sfx-volume').should('be.visible').contains('100');
    })
    // it('should be able to modify keybinds')
})