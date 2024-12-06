# GeoGame

GeoGame is a fun and educational web-based game that allows players to score points by guessing specific targets on a map. The game aims to enhance users' strategic thinking skills based on geographical information.

## About the Game

GeoGame revolves around users guessing the location of a target country on a map. Players select a coordinate on the map, and points are awarded or deducted based on their proximity to the target.

### Game Rules

- The player must guess the coordinates of the target country on the map within a specified time limit.
- Each guess is scored based on the distance to the target country's coordinates:
  - **Within 100 km:** +500 points
  - **Between 100-250 km:** +250 points
  - **Between 250-500 km:** +100 points
  - **More than 500 km:** -100 points
- The game is played with a one-minute time limit.
- The goal is to make accurate guesses and achieve the highest possible score.

### Game Mechanics

1. At the start of the game, a random country is selected and displayed as the target.
2. The player clicks on a point on the map to guess the location of the target country.
3. The distance between the guessed coordinates and the target coordinates is calculated, and the score is updated accordingly.
4. The player sees the results of their guess in a popup message, and the guess is added to a list of guesses.
5. At the end of the game, the total score is displayed.

---

## Web Page Design

The web page is structured to optimize the user experience as follows:

- **Top Menu**:
  - Top-left: Displays the name of the target country (e.g., "Find: France").
  - Top-right: Displays the user's total score (e.g., "Score: 250").
  - Timer: Displays the remaining time in the top-right corner (e.g., "Time Left: 60 seconds").

- **Main Section**:
  - A large map (created using Leaflet.js).
  - The map is optimized to show user guesses and target countries.

- **Right Panel**:
  - Displays the list of user guesses ("Your Guesses").
  - Each guess includes the coordinates and the distance from the target.

- **Game Over**:
  - At the end of the game, a "Game Over" message displays the total score.
  - A "Restart Game" button allows the user to play again.

---

## JavaScript Libraries Used

The project uses the following JavaScript libraries and their functionalities:

- **Leaflet.js**:
  - **Functions**:
    - Creates layers on the map.
    - Handles user click events and displays popup messages.
    - Marks target points on the map.
  - **Usage**:
    - The map is created using OpenStreetMap data.
    - Used to listen to user clicks and calculate the distance to the target.

- **Vanilla JavaScript**:
  - Used to manage the timer, calculate scores, and update the user interface.

---

## How to Set Up and Run

Follow these steps to run the project on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GMT-458-Web-GIS/personal-web-page-yuusamaa.git
