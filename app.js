// Initialize map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Global variables
let targetLocations = [
    { name: 'Paris, France', coords: [48.8566, 2.3522] },
    { name: 'New York, USA', coords: [40.7128, -74.006] },
    { name: 'Tokyo, Japan', coords: [35.6895, 139.6917] },
    { name: 'Sydney, Australia', coords: [-33.8688, 151.2093] },
    { name: 'Cairo, Egypt', coords: [30.0444, 31.2357] },
];
let currentTarget = null;
let score = 0;
let timeLeft = 60;

// Update UI
const targetLocationElement = document.getElementById('target-location');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');

// Pick a random target location
function pickTarget() {
    currentTarget = targetLocations[Math.floor(Math.random() * targetLocations.length)];
    targetLocationElement.textContent = currentTarget.name;
}

// Timer
function startTimer() {
    const timer = setInterval(() => {
        timeLeft -= 1;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Time's up! Final Score: ${score}`);
            resetGame();
        }
    }, 1000);
}

// Calculate distance between two points
function calculateDistance(coords1, coords2) {
    const R = 6371; // Earth's radius in km
    const lat1 = coords1[0] * (Math.PI / 180);
    const lat2 = coords2[0] * (Math.PI / 180);
    const deltaLat = lat2 - lat1;
    const deltaLon = (coords2[1] - coords1[1]) * (Math.PI / 180);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Handle map click
map.on('click', function (e) {
    const distance = calculateDistance([e.latlng.lat, e.latlng.lng], currentTarget.coords);
    if (distance < 500) {
        score += Math.max(0, 1000 - Math.floor(distance)); // Closer = more points
    } else {
        score -= 100; // Penalty for being far
    }
    scoreElement.textContent = score;
    pickTarget(); // Pick a new target
});

// Reset game
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;
    pickTarget();
    startTimer();
}

// Start the game
resetGame();
