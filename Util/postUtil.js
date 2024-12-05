// Util/postById.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        console.log('Data written successfully to data.json');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

router.post('/post/:id', (req, res) => {
    const { id } = req.params;
    const newItem = { _id: id, ...req.body };

    console.log('Received new item:', newItem);

    try {
        const data = readData();

        if (data.find(item => item._id === id)) {
            console.warn('Item with this ID already exists:', id);
            return res.status(400).send({ error: "Item with this ID already exists" });
        }

        data.push(newItem);
        writeData(data);

        res.status(201).send({ message: "Item posted successfully", item: newItem });
    } catch (error) {
        console.error('Error during post operation:', error);
        res.status(500).send({ error: "Error posting item" });
    }
});

module.exports = router;
