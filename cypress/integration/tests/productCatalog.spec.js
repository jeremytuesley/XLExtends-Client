describe("test product catalog render and api call", function () {
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
});
