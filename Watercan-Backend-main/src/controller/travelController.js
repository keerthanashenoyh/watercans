const { fetchGraphData, fetchGraphFromFile } = require('../model/travelModel');

async function nearestNeighbor(graph, start) {
    let visited = new Set();
    let currentCity = start;
    let path = [currentCity];
    let totalDistance = 0;

    while (visited.size < Object.keys(graph).length - 1) {
        visited.add(currentCity);
        let nearestCity = null;
        let minDistance = Infinity;

        for (let neighbor in graph[currentCity]) {
            if (!visited.has(neighbor) && graph[currentCity][neighbor] < minDistance) {
                minDistance = graph[currentCity][neighbor];
                nearestCity = neighbor;
            }
        }

        if (nearestCity) {
            totalDistance += minDistance;
            path.push(nearestCity);
            currentCity = nearestCity;
        } else {
            break;
        }
    }

    return { path, totalDistance };
}

async function getTravelPlan(req, res) {
    const useAPI = true; // Change to false if using local JSON
    const url = "https://your-api-endpoint.com/graph-data"; // Replace with actual API URL
    const startCity = req.query.start || "Raichur"; // Default start city

    const graph = useAPI ? await fetchGraphData(url) : fetchGraphFromFile();
    if (!graph) {
        return res.status(500).json({ error: "Failed to load graph data" });
    }

    const result = await nearestNeighbor(graph, startCity);
    res.json(result);
}

module.exports = { getTravelPlan };
