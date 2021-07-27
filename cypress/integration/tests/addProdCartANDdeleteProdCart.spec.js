describe("Test able to add product to cart and then another test for removal", function () {
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

    it("Checks if delete icon exists, removes a product in cart, asserts that it is gone", function () {
    cy.get('.delete') // gets element by css class, in this case the bin icon
    .should("exist") // asserts it exists
    .click() // then clicks, removing it from cart

    cy.contains('Your Cart is empty') // checks if element is there
    .should("be.visible") // asserts cart is empty is visible and deletion worked
  });
});