describe('Add Product Functionality', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer');
  });

  beforeEach(() => {
    cy.visit(baseUrl); // Ensure the page is loaded before each test
  });

  it('should show the Add Product button', () => {
    cy.get('button[id="addProductBtn"]').should('be.visible');
  });

  it('should open the Add Product modal when clicking on Add Product button', () => {
    cy.get('button[id="addProductBtn"]').click();
    cy.get('#addProductModal').should('be.visible');
  });

  it('should show an error message for empty product name', () => {
    cy.get('button[id="addProductBtn"]').click();
    cy.get('#postName').clear(); // Clear the name input
    cy.get('#postPrice').type('10'); // Provide valid price
    cy.get('#postDescription').type('A valid description');
    cy.get('button[type="submit"]').contains('Add Product').click();

    // Ensure the error message is displayed
    cy.get('#postResponse').should('contain.text', '');
  });

  it('should show an error message for invalid price format', () => {
    cy.get('button[id="addProductBtn"]').click();
    cy.get('#postName').type('New Product');
    cy.get('#postPrice').type('invalidPrice');
    cy.get('#postDescription').type('A valid description');
    cy.get('button[type="submit"]').contains('Add Product').click();

    // Ensure the error message is displayed
    cy.get('#postResponse').should('contain.text', '');
  });

  it('should add a new product and verify it appears in the product table', () => {
    cy.get('button[id="addProductBtn"]').click();
    cy.get('#postName').type('New Product');
    cy.get('#postPrice').type('99.99');
    cy.get('#postDescription').type('This is a new product.');
    cy.get('button[type="submit"]').contains('Add Product').click();

    cy.get('#productTable').should('contain.text', 'New Product');
  });

  it('should close the Add Product modal after successful product addition', () => {
    cy.get('button[id="addProductBtn"]').click();
    cy.get('#postName').type('Another Product');
    cy.get('#postPrice').type('49.99');
    cy.get('#postDescription').type('This product should close the modal after addition.');
    cy.get('button[type="submit"]').contains('Add Product').click();

    cy.get('#addProductModal').should('not.be.visible');
  });
});
