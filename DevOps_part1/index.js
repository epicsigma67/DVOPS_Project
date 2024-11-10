const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const path = require('path');

const { addResource, viewResources, deleteResource } = require('./utils/ResourceUtil');
const { updateResource } = require('./utils/updateResourceUtil');

// Middleware to parse incoming request bodies (using built-in methods)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Internal Server Error');
        }
    });
});

// Define routes
app.post('/add-resource', addResource);
app.get('/view-resources', viewResources);
app.put('/update-resource/:id', updateResource);
app.delete('/delete-resource/:id', deleteResource);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Export app and server for testing or further usage
module.exports = { app, server };
