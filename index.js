const express = require('express');
const path = require('path');
const postById = require('./Util/postUtil');
const updateById = require('./Util/updateUtil');
const getById = require('./Util/getUtil');

const app = express();
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', postById);
app.use('/api', updateById);
app.use('/api', getById);
app.use('/api/products', getById);

// Default route to serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export app for testing
module.exports = app;

// Start server only if this file is directly run (not during testing)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
