// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'
// Alternatively you can use CommonJS syntax:
// require('./commands')

// Ensure we don't collect coverage on the backend if it's not needed
Cypress.on('after:run', (results) => {
  if (results.totalFailed > 0) {
    console.log('Skipping backend coverage collection');
  }
});
