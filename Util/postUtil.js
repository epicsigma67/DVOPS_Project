// Util/postById.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

router.post('/post/:id', (req, res) => {
    const { id } = req.params;
    const newItem = { _id: id, ...req.body }; // Use req.body to extract the data sent from the client

    try {
        const data = readData();
        
        // Check if item with this ID already exists
        if (data.find(item => item._id === id)) {
            return res.status(400).send({ error: "Item with this ID already exists" });
        }

        data.push(newItem);
        writeData(data);
        
        res.status(201).send({ message: "Item posted successfully", item: newItem });
    } catch (error) {
        res.status(500).send({ error: "Error posting item" });
    }
});

module.exports = router;
