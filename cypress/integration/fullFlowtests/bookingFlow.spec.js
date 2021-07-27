describe("Demonstrates full booking flow, from home, to services, to single service, to booking payment, then success, asserting along the way", function () {
  it("Renders services Page from home, asserts successfully navigated to services, clicks a service", function () {
    cy.visit("http://localhost:3000/");
    cy.contains('Beauty Services') // checks landing page for beauty services
    .should("be.visible") // asserts it is visible
    .click() // clicks, navigating to beauty service 

    cy.url() // checks url
    .should('include', '/services') // asserts it has successfully redirected to services page

    cy.contains('TestService') // checks page for service name of TestService
    .should("exist") // asserts it exists
    .should("be.visible") // asserts it's visible to user
    .click() // clicks, navigating to single service page

    cy.url() // checks url again
    .should('include', '/service/60f4309a8d240005713b72bf') // checks if it is now within that single service
  });
  it("Chooses date and time, Clicks book now button, asserts succesfully redirected to booking page", function () {
 
    cy.get('.dateBooking')
    .should("exist") // asserts visible, ensuring mui library successfully integrated and displays
    .type('08/20/2021') // sets it to 08th of August 2021, note. only lets you book within 1 month advance, by time of marking this could change

    cy.contains('Book now') // checks if add to cart button is there
      .should("be.visible") // asserts button is visible to click
      .click()// then clicks, adding it to cart

    cy.url()
      .should('include', '/booking') // asserts url is booking, asserting redirection has happened

  });
  it("Fills out booking form, adds stripe test key, asserts successful", function () {
 
    cy.get('input[name="firstName"]')
      .should('exist') // asserts it's visible to user and options have rendered properly from api
      .type('firstNameTest') // types in first name value

    cy.get('input[name="lastName"]')
      .should('exist') // asserts it's visible to user and options have rendered properly from api
      .type('lastNameTest') // types in last name value

    cy.get('input[name="email"]')
      .should('exist') // asserts it's visible to user and options have rendered properly from api
      .type('email@email.com') // types in valid email value

    cy.get('input[name="phoneNumber"]')
      .should('exist') // asserts it's visible to user and options have rendered properly from api
      .type('1234567890') // types in valid phone number value

    cy.get('[type="radio"]') // finds radio button
    .check('false') // checks the radio button, changing the value

    cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242'); // filling out stripe card element
    cy.getWithinIframe('[name="exp-date"]').type('1232'); // stripe expiry date
    cy.getWithinIframe('[name="cvc"]').type('987'); // stripe cvc
    cy.getWithinIframe('[name="postal"]').type('12345'); // stripe postal

    cy.get('.submitButton')
    .click() // clicking submit button, to start processing payment

    cy.url() // checking url to see if redirection happened
    .should('include', '/success') // asserting that you have been redirected to success page
  });
});