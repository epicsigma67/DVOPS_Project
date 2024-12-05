const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, 'data.json');  // Use absolute path

// Function to read data from file
function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

// Function to write data to file
function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));  // Use full path
        console.log('Data written successfully to data.json');
    } catch (error) {
        console.error('Error writing data:', error);
        throw new Error('Error writing data');  // Ensure an error is thrown
    }
}

// POST route to add a new item
router.post('/post', (req, res) => {
    const { name, price, description } = req.body;

    // Check if price is a valid number
    if (isNaN(price)) {
        return res.status(400).send({ error: 'Price must be a number' });
    }

    // Validate that name and description are present
    if (!name || !description) {
        return res.status(400).send({ error: 'Name and description are required' });
    }

    const data = readData();
    const newId = (data.length + 1).toString();  // Auto-generate ID based on data length
    const newItem = { _id: newId, name, price, description };

    console.log('Received new item:', newItem);

    try {
        // Add the new item to the data and write it to the file
        data.push(newItem);
        writeData(data);

        // Send response indicating the item was successfully posted
        res.status(201).send({ message: 'Item posted successfully', item: newItem });
    } catch (error) {
        console.error('Error during post operation:', error);
        res.status(500).send({ error: 'Error posting item' });
    }
});

module.exports = router;
