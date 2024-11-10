var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050;
var startPage = "index.html";

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("./public"));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage, (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});
// View Resources
const { addResource, viewResources, editResource, deleteResource } = require('./utils/ResourceUtil');

// Define routes
app.post('/add-resource', addResource);
app.get('/view-resources', viewResources);
app.put('/edit-resource/:id', editResource);
app.delete('/delete-resource/:id', deleteResource);

// Start the server
const server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address === "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});

// Export app and server for testing or further usage
module.exports = { app, server };
