describe("Full integration flow, from home, to catalog, to product, to cart, to payment, then successful asserting along the way", function () {
  it("Renders Catalog Page from home, asserts successfully navigated to catalog, clicks a product", function () {
    cy.visit("http://localhost:3000/");
    cy.contains('Product Catalog') // checks landing page for product catalog
    .should("be.visible") // asserts it is visible
    .click() // clicks, navigating to beauty product catalog

    cy.url() // checks url
    .should('include', '/products') // asserts it has successfully redirected to products page

    cy.contains('Probably a cat') // checks page for product name of probably a cat
    .should("exist") // asserts it exists
    .should("be.visible") // asserts it's visible to user
    .click() // clicks, navigating to single product page

    cy.url() // checks url again
    .should('include', '/product/60f18449f974630bad0078b8') // checks if it is now within that single service
  });

  it("Adds a product to cart, asserts that it is in there", function () {
    cy.visit("http://localhost:3000/product/60f18449f974630bad0078b8");
    
    
    cy.contains('Add to cart') // checks if add to cart button is there
      .should("be.visible") // asserts button is visible to click
      .click()// then clicks, adding it to cart

    cy.contains('My Cart')
        .should("exist") // asserts label exist 
        .should("be.visible") // asserts cart popup is now visible

    cy.contains('1 Items') 
        .should("exist")// asserts 1 item exists, if product didn't add, this would be 0 items
  });

  it("Clicks checkout button on cart menu, asserts succesfully redirected to payment page", function () {
 
    cy.contains('Checkout') // checks if add to cart button is there
      .should("be.visible") // asserts button is visible to click
      .click()// then clicks, adding it to cart

    cy.url()
      .should('include', '/payment') // asserts url is payment, asserting redirection has happened

    cy.get('body') // finds body so I can click out of the MUI popover
        .click(0,0) // clicks to get out of the mui popover
  });

  it("Fills out payment form, adds stripe test key, asserts successful", function () {
 
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
