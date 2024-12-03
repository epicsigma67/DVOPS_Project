// Util/getById.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

router.get('/get/:id', (req, res) => {
    const { id } = req.params;

    try {
        const data = readData();
        const item = data.find(item => item._id === id);

        if (!item) {
            return res.status(404).send({ error: "Item not found" });
        }

        res.send({ item });
    } catch (error) {
        res.status(500).send({ error: "Error retrieving item" });
    }
});

router.get('/products', (req, res) => {
    try {
        const data = readData(); // Reads all products from data.json
        res.json(data); // Return all products as an array
    } catch (error) {
        res.status(500).send({ error: "Error retrieving products" });
    }
});

module.exports = router;
