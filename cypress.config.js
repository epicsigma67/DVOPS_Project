const { defineConfig } = require("cypress");
const { spawn } = require("child_process");
let server;
let baseUrl;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      on("task", {
        startServer() {
          console.log("Attempting to start the server...");

          // If the server is already running, return the base URL
          if (server) {
            console.log("Server is already running.");
            return Promise.resolve(baseUrl || 'http://localhost:3000');
          }

          return new Promise((resolve, reject) => {
            // Start the server by spawning a new process
            server = spawn("node", ["-r", "nyc", "index-test.js"]);

            // Log the stdout of the server for debugging
            server.stdout.on("data", (data) => {
              const output = data.toString();
              console.log(output);  // Log the output for debugging

              // Check if the server logs the base URL message
              if (output.includes("Demo project at:")) {
                const baseUrlPrefix = "Demo project at: ";
                const startIndex = output.indexOf(baseUrlPrefix);
                if (startIndex !== -1) {
                  baseUrl = output.substring(startIndex + baseUrlPrefix.length).trim();
                  console.log(`Resolved base URL: ${baseUrl}`);  // Log the resolved URL
                  resolve(baseUrl);  // Resolve with the base URL
                }
              }
            });

            // Handle any error from stderr
            server.stderr.on("data", (data) => {
              console.error("Server stderr:", data.toString());
              reject(new Error("Failed to start server"));
            });

            // Handle process exit
            server.on("exit", (code) => {
              if (code !== 0) {
                console.error(`Server exited with code ${code}`);
                reject(new Error(`Server exited with code ${code}`));
              }
            });
          });
        },

        stopServer() {
          if (server) {
            console.log("Stopping server...");
            server.kill();  // Kill the server process
            server = null;  // Reset the server variable
          }
          return null;  // Return null explicitly to satisfy Cypress requirements
        },
      });

      return config;  // Return the config object
    },
  },
});
