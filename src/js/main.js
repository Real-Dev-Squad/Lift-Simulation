// Create the data store object
const dataStore = {
    numFloors: 0, // Total number of floors in the building
    numLifts: 0, // Total number of lifts in the building
    liftPositions: [], // Current floor position of each lift
    liftDirections: [], // Current direction of each lift
    floorButtons: [], // Status of buttons on each floor
  
    // Initialize the data store with the given number of floors and lifts
    initialize(numFloors, numLifts) {
      this.numFloors = numFloors;
      this.numLifts = numLifts;
      this.liftPositions = Array(numLifts).fill(1); // Initialized to 1st floor
      this.liftDirections = Array(numLifts).fill(null); // No direction initially
      this.floorButtons = Array(numFloors).fill(false); // Buttons not pressed initially
    },
  
    // Update lift position for a specific lift
    updateLiftPosition(liftIndex, floor) {
      this.liftPositions[liftIndex] = floor;
    },
  
    // Update lift direction for a specific lift
    updateLiftDirection(liftIndex, direction) {
      this.liftDirections[liftIndex] = direction;
    },
  
    // Set the status of a floor button to indicate it's pressed
    pressFloorButton(floor) {
      this.floorButtons[floor - 1] = true; // Floors are 1-indexed
    },
  
    // Get the current position of a specific lift
    getLiftPosition(liftIndex) {
      return this.liftPositions[liftIndex];
    },
  
    // Get the current direction of a specific lift
    getLiftDirection(liftIndex) {
      return this.liftDirections[liftIndex];
    },
  
    // Get the status of a floor button
    getFloorButtonStatus(floor) {
      return this.floorButtons[floor - 1]; // Floors are 1-indexed
    },
  };
  
  
  // Initialize the data store with the desired number of floors and lifts
  dataStore.initialize(2, 2);


  // Assuming the data store object is already defined and initialized

// Define the JS Engine for lift control
const liftControlEngine = {
    allocateLift(floor, direction) {
      const liftPositions = dataStore.liftPositions;
      const liftDirections = dataStore.liftDirections;
  
      // Find the available lifts
      const availableLifts = [];
      for (let i = 0; i < liftPositions.length; i++) {
        if (liftDirections[i] === null || liftDirections[i] === direction) {
          availableLifts.push(i);
        }
      }
  
      // If there are available lifts, find the closest one
      if (availableLifts.length > 0) {
        let closestLiftIndex = availableLifts[0];
        let minDistance = Math.abs(liftPositions[closestLiftIndex] - floor);
  
        for (let i = 1; i < availableLifts.length; i++) {
          const liftIndex = availableLifts[i];
          const distance = Math.abs(liftPositions[liftIndex] - floor);
          if (distance < minDistance) {
            minDistance = distance;
            closestLiftIndex = liftIndex;
          }
        }
  
        // Update the lift position and direction in the data store
        dataStore.updateLiftPosition(closestLiftIndex, floor);
        dataStore.updateLiftDirection(closestLiftIndex, direction);
  
        // Return the index of the allocated lift
        return closestLiftIndex;
      }
  
      // If no available lifts, return -1
      return -1;
    },
  };
  

// Function to update the UI with the latest lift positions
// function updateUI() {
//     const liftPositions = dataStore.liftPositions;
  
//     for (let i = 0; i < liftPositions.length; i++) {
//       const liftPositionElement = document.getElementById(`lift${i + 1}Position`);
//       liftPositionElement.textContent = liftPositions[i];
//     }
//   }
  
//   // Function to request a lift when a floor button is clicked
  function requestLift(floor, direction) {
    const allocatedLiftIndex = liftControlEngine.allocateLift(floor, direction);
    console.log(`Lift ${allocatedLiftIndex + 1} allocated to go to floor ${floor} in ${direction} direction`);
  
    // Update the UI after allocating the lift
    updateUI();
  }


  // Assuming the data store object and lift control engine are already defined

// Function to create the floors dynamically based on the number of floors in the data store
function createFloors() {
    const floorsContainer = document.getElementById('floors');
    floorsContainer.innerHTML = '';
  
    const numFloors = dataStore.numFloors;
  
    for (let i = numFloors; i > 0; i--) {
      const floorElement = document.createElement('div');
      floorElement.classList.add('floor');
  
      const floorNumberElement = document.createElement('span');
      floorNumberElement.textContent = `Floor ${i}`;
  
      const upButtonElement = document.createElement('button');
      upButtonElement.textContent = 'UP';
      upButtonElement.addEventListener('click', () => requestLift(i, 'up'));
  
      const downButtonElement = document.createElement('button');
      downButtonElement.textContent = 'DOWN';
      downButtonElement.addEventListener('click', () => requestLift(i, 'down'));
  
      floorElement.appendChild(floorNumberElement);
      floorElement.appendChild(upButtonElement);
      floorElement.appendChild(downButtonElement);
  
      floorsContainer.appendChild(floorElement);
    }
  }
  
  // Update the UI with the latest lift positions and directions
// Update the UI with the latest lift positions and directions
function updateUI() {
    const liftPositions = dataStore.liftPositions;
    const liftDirections = dataStore.liftDirections;
    const floorButtons = dataStore.floorButtons;
  
    const floorsContainer = document.getElementById('floors');
    const floorElements = floorsContainer.getElementsByClassName('floor');
  
    for (let i = 0; i < liftPositions.length; i++) {
      const liftPosition = liftPositions[i];
      const liftDirection = liftDirections[i];
      const floorIndex = dataStore.numFloors - liftPosition;
  
      const floorElement = floorElements[floorIndex];
  
      // Remove existing lift status element
      const existingLiftStatusElement = floorElement.querySelector('.lift-status');
      if (existingLiftStatusElement) {
        existingLiftStatusElement.remove();
      }
  
      // Add lift status element
      const liftStatusElement = document.createElement('span');
      liftStatusElement.classList.add('lift-status');
      liftStatusElement.textContent = `Lift ${i + 1}`;
      floorElement.appendChild(liftStatusElement);
  
      // Update lift direction class
      floorElement.classList.remove('lift-up', 'lift-down');
      if (liftDirection === 'up') {
        floorElement.classList.add('lift-up');
      } else if (liftDirection === 'down') {
        floorElement.classList.add('lift-down');
      }
  
      // Update floor buttons
      const upButtonElement = floorElement.querySelector('.up-button');
      const downButtonElement = floorElement.querySelector('.down-button');
      upButtonElement.disabled = floorButtons[floorIndex];
      downButtonElement.disabled = floorButtons[floorIndex];
    }
  }
  
  
  // Initialize the UI
  createFloors();
  updateUI();
  
  
  // Update the UI initially
  updateUI();
  
  