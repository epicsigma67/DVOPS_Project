const express = require('express');
const path = require('path');
const postById = require('./Util/postUtil');
const updateById = require('./Util/updateUtil');
const getById = require('./Util/getUtil');

const app = express();
app.use(express.json());

// Serve static files from the "instrumented" folder
app.use(express.static(path.join(__dirname, 'instrumented')));

// API routes
app.use('/api', postById);
app.use('/api', updateById);
app.use('/api', getById);
app.use('/api/products', getById);

// Serve the coverage endpoint
app.use('/__coverage__', express.static('.nyc_output'));

// Default route to serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'instrumented', 'index.html'));
});

// Export app for testing
module.exports = app;

// Start server only if this file is directly run (not during testing)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        // Log the base URL when the server starts
        const baseUrl = `http://localhost:${PORT}`;
        console.log(`Server running on port ${PORT}`);
        console.log(`Demo project at: ${baseUrl}`);
    });
}
    