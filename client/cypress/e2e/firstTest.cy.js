const path = "http://localhost:3000"
//const path = "https://medical-mayhem-c0832c3f548e.herokuapp.com"

describe('authorization', () => {

  Cypress.Commands.add('register', (username, email, password, passwordVerify) => {
    cy.session([username, email, password, passwordVerify], () => {
      cy.visit(path)
  
      cy.intercept('POST', '/auth/register', {
        statusCode: 200,
        body: {
          success: true,
          username : 'JohnSmith123',
          email : 'john.smith@gmail.com',
        }
      }).as('registration')
  
      cy.get('#register').click()
  
      cy.get('#username').type(username)
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.get('#passwordVerify').type(passwordVerify)
  
      cy.get('#signUp').click()
  
      cy.wait('@registration')
  
      cy.url().should('eq', `${path}/`)

      cy.log(cy.getAllLocalStorage())

      cy.getCookie('token').should('exist')
    })
  })

  beforeEach(() => {
    cy.register('JohnSmith123', 'john.smith@gmail.com', 'password', 'password')
    
  })

  it('should log a user in successfully given a registered account', () => {
    cy.visit(path)

    cy.get('#settings-button').click()
  })

  // it('should continue as guest successfully', () => {
  //   cy.visit(path)

  //   cy.get('#continue-as-guest').click()

  //   cy.url().should('eq', `${path}/`)
  // })
})
  
// describe('simple navigation as a guest', () => {
//   it('should continue as guest then display a queue modal successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#play-button').click()

//     cy.get('#queue-modal').should('be.visible')
//   })

//   it('should continue as guest then navigate to the map search screen successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#map-search-button').click()

//     cy.url().should('eq', `${path}/mapsearch`)
//   })

//   it('should continue as guest then navigate to the forums screen successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#forums-button').click()

//     cy.url().should('eq', `${path}/forum`)
//   })

//   it('should continue as guest then navigate to the settings screen successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#settings-button').click()

//     cy.url().should('eq', `${path}/settings`)
//   })

//   it('should continue as guest then navigate to the about screen successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#about-button').click()

//     cy.url().should('eq', `${path}/about`)
//   })

//   it('should continue as guest then navigate to the leaderboard screen successfully', () => {
//     cy.visit(path)

//     cy.get('#continue-as-guest').click()
//     cy.get('#leaderboard-button').click()

//     cy.url().should('eq', `${path}/leaderboard`)
//   })
// })