describe("test servicesrender and api call", function () {
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
});