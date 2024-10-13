document.getElementById('ddos-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dataPackets = document.getElementById('dataPackets').value.split(',').map(item => item.trim());
    const entropyThreshold = parseFloat(document.getElementById('entropyThreshold').value);

    const response = await fetch('/detect-ddos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataPackets, entropyThreshold })
    });

    const result = await response.json();
    document.getElementById('result').textContent = 
        `Entropy: ${result.entropy.toFixed(2)} - DDoS Detected: ${result.isDDoS}`;
});

document.getElementById('fetchTestData').addEventListener('click', async () => {
    const response = await fetch('/test-data');
    const result = await response.json();
    document.getElementById('dataPackets').value = result.dataPackets.join(',');
    document.getElementById('entropyThreshold').value = '5.0'; // Set default threshold
    // Automatically submit the form after fetching test data
    document.getElementById('ddos-form').dispatchEvent(new Event('submit'));
});
