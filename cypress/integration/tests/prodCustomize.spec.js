describe("Test able to customize product, add it to cart, asserts customizations are in cart", function () {
  it("Fills out customization form while asserting elements exist from API", function () {
    cy.visit("http://localhost:3000/product/60f463315c00201ad739317f");

    cy.contains("Product with customize") // checks product name
      .should("exist"); // asserts on right page

    cy.get(".colour") // retrieves form element colour
      .should("be.visible") // asserts it's visible to user and options have rendered properly from api
      .click(); // clicks to open select menu

    cy.contains("Blue") // Finds select item Blue
      .should("be.visible") // asserts it is visible
      .click(); // selects blue as an option

    cy.get("body") // finds body so I can click out of the MUI popover
      .click(0, 0); // clicks to get out of the mui popover

    cy.get(".theme") // retrieves form element theme
      .should("be.visible") // asserts it's visible to user
      .type("testtheme"); // types in testtheme into the form

    cy.get(".text") // retireves form element text
      .should("be.visible") // asserts it's visisble to user
      .type("testtext"); // types in testtext into the form
  });
  it("Adds the product to cart, asserts that it is in there and checks customizations", function () {
    cy.contains("Add to cart") // checks if add to cart button is there
      .should("be.visible") // asserts button is visible to click
      .click(); // then clicks, adding it to cart

    cy.contains("My Cart")
      .should("exist") // asserts label exist
      .should("be.visible"); // asserts cart popup is now visible

    cy.contains("1 Items").should("exist"); // asserts 1 item exists, if product didn't add, this would be 0 items

    cy.contains("Customizations") // checks if title customizations is there
      .should("be.visible"); // asserts it is visible

    cy.contains("Colours - Blue") // checks if the customization colour blue is there on the page
      .should("exist") // asserts it exists, ensuring it has carried over from the form
      .should("be.visible"); // asserts customization is visible to user
  });
});
