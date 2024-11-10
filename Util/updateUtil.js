// Util/updateById.js
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

router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const data = readData();
        const itemIndex = data.findIndex(item => item._id === id);

        if (itemIndex === -1) {
            return res.status(404).send({ error: "Item not found" });
        }

        data[itemIndex] = { ...data[itemIndex], ...updatedData };
        writeData(data);

        res.send({ message: "Item updated successfully", item: data[itemIndex] });
    } catch (error) {
        res.status(500).send({ error: "Error updating item" });
    }
});

module.exports = router;
