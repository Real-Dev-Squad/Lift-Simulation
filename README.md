# Lift-Simulation

Create a web app where you can simulate lift mechanics

Run the program:
git clone
cd Lift-Simulation
npm install
npm start

- After npm start, webpack dev server will start with hot reloading.
- Execution of program starts from index.js.
- We have separate classes defined for Elevator, Button, Floor and the main Lift controller class
- Initially all lifts are grounded, when any button is pressed, the floor number and the direction is passed to handlebuttonpress and it starts to analyse lift. Analysing lift means finding the lift which is closest and then moving the particular lift to the same floor with delicate animation.
