const fs = require('fs').promises;
const path = require('path');
const dbPath = path.join(__dirname, 'resources.json');

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        throw new Error('Failed to read the JSON file');
    }
}

async function writeJSON(data, filename) {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
        throw new Error('Failed to write to the JSON file');
    }
}

async function updateResourceById(req, res) {
    try {
        const { id } = req.params;
        const { name, location, description } = req.body;

        if (!id || !name || !location || !description) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const allResources = await readJSON(dbPath);
        let modified = false;

        for (let i = 0; i < allResources.length; i++) {
            if (allResources[i].id === id) {
                allResources[i].name = name;
                allResources[i].location = location;
                allResources[i].description = description;
                modified = true;
                break;
            }
        }

        if (modified) {
            await writeJSON(allResources, dbPath);
            return res.status(200).json({ message: 'Resource updated successfully' });
        } else {
            return res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        console.error('Error updating resource:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    updateResourceById
};
