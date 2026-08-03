const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchGraphData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching data:", error.message);
        return null;
    }
}

// Optional: Load from a local JSON file instead of an API
function fetchGraphFromFile() {
    try {
        const filePath = path.join(__dirname, '../data/graph.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error reading graph file:", error.message);
        return null;
    }
}

module.exports = { fetchGraphData, fetchGraphFromFile };
