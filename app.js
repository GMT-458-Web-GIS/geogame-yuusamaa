// Initialize map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Global variables
let targetLocations = [
    { name: 'France', coords: [46.2276, 2.2137] },
    { name: 'United States', coords: [37.0902, -95.7129] },
    { name: 'Japan', coords: [36.2048, 138.2529] },
    { name: 'Australia', coords: [-25.2744, 133.7751] },
    { name: 'Egypt', coords: [26.8206, 30.8025] },
];
let currentTarget = null;
let scoreTracker = createScoreTracker();
let timeLeft = 60;

// DOM Elements
const targetLocationElement = document.getElementById('target-location');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const guessesList = document.getElementById('guesses-list');

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
            endGame();
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

// Calculate score based on distance
function calculateScore(distance) {
    if (distance <= 100) {
        return 500;
    } else if (distance > 100 && distance <= 250) {
        return 250;
    } else if (distance > 250 && distance <= 500) {
        return 100;
    } else {
        return -100;
    }
}

// Handle map click
map.on('click', function (e) {
    const clickedCoords = [e.latlng.lat, e.latlng.lng];
    const targetCoord = currentTarget.coords;
    const distance = calculateDistance(clickedCoords, targetCoord);

    // Calculate score for this guess
    const guessScore = calculateScore(distance);
    scoreTracker.increment(guessScore);
    scoreElement.textContent = scoreTracker.getScore();

    // Display appropriate popup message
    let popupMessage = `Distance: ${distance.toFixed(2)} km<br>Score: ${guessScore > 0 ? '+' : ''}${guessScore} points`;

    L.popup()
        .setLatLng(e.latlng)
        .setContent(`<b>${popupMessage}</b>`)
        .openOn(map);

    // Add guess to the list
    const guessItem = document.createElement('li');
    guessItem.textContent = `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}, Distance: ${distance.toFixed(2)} km, Score: ${guessScore}`;
    guessesList.appendChild(guessItem);

    pickTarget(); // Pick a new target
});

// Reset game
function resetGame() {
    scoreTracker.reset();
    timeLeft = 60;
    scoreElement.textContent = scoreTracker.getScore();
    timeLeftElement.textContent = timeLeft;
    gameOverElement.style.display = 'none';
    restartButton.style.display = 'none';
    guessesList.innerHTML = ''; // Clear the list
    pickTarget();
    startTimer();
}

// End game
function endGame() {
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = scoreTracker.getScore();
    restartButton.style.display = 'inline-block';
}

// Create score tracker
function createScoreTracker() {
    let score = 0;
    return {
        increment: function (points) {
            score += points;
        },
        reset: function () {
            score = 0;
        },
        getScore: function () {
            return score;
        },
    };
}

// Restart button event
restartButton.addEventListener('click', resetGame);

// Start the game
resetGame();
