const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve frontend

// Function to simulate sending data packets to the server
function generateTestDataPackets() {
    const packetTypes = ['0.0.0.0','414.25.202.22','55.052.021.52','44.005.54.54'];
    const dataPackets = [];
    const numPackets = 10; // Number of packets to simulate

    for (let i = 0; i < numPackets; i++) {
        const packet = packetTypes[Math.floor(Math.random() * packetTypes.length)];
        dataPackets.push(packet);
    }

    return dataPackets;
}

// Function to calculate entropy
function calculateEntropy(dataPackets) {
    const packetCount = {};
    dataPackets.forEach(packet => {
        packetCount[packet] = (packetCount[packet] || 0) + 1;
    });

    const totalPackets = dataPackets.length;
    let entropy = 0.0;

    for (const count of Object.values(packetCount)) {
        const probability = count / totalPackets;
        entropy -= probability * Math.log2(probability);
    }

    return entropy;
}

// Function to detect DDoS attack
function detectDDoS(entropy, threshold) {
    return entropy < threshold;
}

// API Endpoint to detect DDoS
app.post('/detect-ddos', (req, res) => {
    const { dataPackets, entropyThreshold } = req.body;

    const entropy = calculateEntropy(dataPackets);
    const isDDoS = detectDDoS(entropy, entropyThreshold);

    res.json({ entropy, isDDoS });
});

// API Endpoint to generate test data packets
app.get('/test-data', (req, res) => {
    const dataPackets = generateTestDataPackets();
    res.json({ dataPackets });
});

app.listen(port, () => {
    console.log(`DDoS detection backend running on http://localhost:${port}`);
});
