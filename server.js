const express = require('express');  // Import Express (used to create server)

const cache = {};    // This is my CDN cache storage
const TTL = 10000;   // 10 seconds → data valid for 10 seconds

const app = express();     // Creating server (Edge Server simulation)


// 🔹 Root route
app.get("/", (req, res) => {
    res.send("Edge server is running 🚀");
});


// 🔹 CDN Simulation Route
app.get("/data", async (req, res) => {

    const key = "data";         // Cache key (identifies stored data)
    const now = Date.now();     // Current time (used for TTL check)


    //  Cache HIT → return cached data instantly
    if (cache[key] && (now - cache[key].timestamp < TTL)) {
        console.log(" Cache HIT");

        return res.json({
            source: "cache",             // Data coming from cache
            data: cache[key].data
        });
    }


    //  Cache MISS → fetch from origin server
    console.log(" Cache MISS - Fetching from origin");

    try {
        // 🔹 Origin API call (simulating origin server)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        // Convert response into JSON
        const data = await response.json();


        // Store in cache (CDN stores data at edge)
        cache[key] = {
            data: data,
            timestamp: now
        };


        // Send response to user
        return res.json({
            source: "origin",            // Data coming from origin
            data: data
        });

    } catch (error) {

        console.error(error);  // Print error in terminal

        return res.status(500).send("Error fetching from origin");
    }
});   // This means when user visits /data , run this function


// 🔹 Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});