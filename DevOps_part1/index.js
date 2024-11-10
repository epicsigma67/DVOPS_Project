<<<<<<< HEAD
// index.js
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.get('/', (req, res) => {
res.sendFile(__dirname + "/public/" + startPage);
})
server = app.listen(PORT, function () {
const address = server.address();
const baseUrl = `http://${address.address == "::" ? 'localhost' :
address.address}:${address.port}`;
console.log(`Demo project at: ${baseUrl}`);
});
module.exports = {app, server}
>>>>>>> b362d63dc0f3f73b5b229c2f2f47f1244c5ad6ca
