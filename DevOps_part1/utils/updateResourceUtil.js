const fs = require('fs').promises;
const path = require('path');
const dbPath = path.join(__dirname, 'resources.json');

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', filename, err);
        throw new Error('Failed to read the JSON file');
    }
}

async function writeJSON(data, filename) {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file:', filename, err);
        throw new Error('Failed to write to the JSON file');
    }
}

async function updateResource(req, res) {
    try {
        const { id } = req.params;
        const { name, location, description } = req.body;

        if (!id || !name || !location || !description) {
            return res.status(400).json({ message: 'Invalid input data: all fields are required' });
        }

        const allResources = await readJSON(dbPath);
        const resourceIndex = allResources.findIndex(resource => resource.id === id);

        if (resourceIndex === -1) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Update resource details
        allResources[resourceIndex] = {
            ...allResources[resourceIndex],
            name,
            location,
            description
        };

        await writeJSON(allResources, dbPath);
        res.status(200).json({ message: 'Resource updated successfully' });
    } catch (err) {
        console.error('Error updating resource:', err);
        res.status(500).json({ message: 'Failed to update resource' });
    }
}

module.exports = {
      updateResource
};
