//const path = "http://localhost:3000"
const path = "https://medical-mayhem-c0832c3f548e.herokuapp.com"

describe('template spec', () => {
  it('should continue as guest successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()

    cy.url().should('eq', `${path}/`)
  })

  it('should register a new user successfully', () => {
    cy.visit(path)

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

    cy.url().should('eq', `${path}/`)
  })

  
  it('should continue as guest then navigate to the game screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#play-button').click()

    cy.url().should('eq', `${path}/game`)
  })

  it('should continue as guest then navigate to the map search screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#map-search-button').click()

    cy.url().should('eq', `${path}/mapsearch`)
  })

  // it('should continue as guest then navigate to the map builder screen successfully', () => {
  //   cy.visit(path)

  //   cy.get('#continue-as-guest').click()
  //   cy.get('#map-builder-button').click()

  //   cy.url().should('eq', `${path}/mapbuilder`)
  // })

  // it('should continue as guest then navigate to the social screen successfully', () => {
  //   cy.visit(path)

  //   cy.get('#continue-as-guest').click()
  //   cy.get('#social-button').click()

  //   cy.url().should('eq', `${path}/social`)
  // })

  it('should continue as guest then navigate to the forums screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#forums-button').click()

    cy.url().should('eq', `${path}/forum`)
  })

  // it('should continue as guest then navigate to the profile screen successfully', () => {
  //   cy.visit(path)

  //   cy.get('#continue-as-guest').click()
  //   cy.get('#profile-button').click()

  //   cy.url().should('eq', `${path}/profile`)
  // })

  it('should continue as guest then navigate to the settings screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#settings-button').click()

    cy.url().should('eq', `${path}/settings`)
  })

  it('should continue as guest then navigate to the about screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#about-button').click()

    cy.url().should('eq', `${path}/about`)
  })

  it('should continue as guest then navigate to the leaderboard screen successfully', () => {
    cy.visit(path)

    cy.get('#continue-as-guest').click()
    cy.get('#leaderboard-button').click()

    cy.url().should('eq', `${path}/leaderboard`)
  })
})