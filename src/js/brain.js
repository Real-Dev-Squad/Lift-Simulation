const dataStore = {
  numFloors: 0, // Total number of floors in the building
  numLifts: 0, // Total number of lifts in the building
  liftPositions: [], // Current floor position of each lift
  liftDirections: [], // Current direction of each lift
  isLiftBusy: [],
  floorButtons: [], // Status of buttons on each floor

  // Initialize the data store with the given number of floors and lifts
  initialize(numFloors, numLifts) {
    this.numFloors = numFloors;
    this.numLifts = numLifts;
    this.liftPositions = Array(numLifts).fill(1); // Initialized to 1st floor
    this.liftDirections = Array(numLifts).fill(null); // No direction initially
    this.floorButtons = Array(numFloors).fill(false); // Buttons not pressed initially
    this.isLiftBusy = Array(numLifts).fill(false); // Buttons not pressed initially
  },

  // Update lift position for a specific lift
  updateLiftPosition(liftIndex, floor) {
    this.liftPositions[liftIndex] = floor;
  },

  // Update lift direction for a specific lift
  updateLiftDirection(liftIndex, direction) {
    this.liftDirections[liftIndex] = direction;
  },

  updateLiftStatus(liftIndex, status) {
    this.isLiftBusy[liftIndex] = status;
  },

  liftBusyStatus(liftIndex) {
    return this.isLiftBusy[liftIndex];
  },

  // Set the status of a floor button to indicate it's pressed
  pressFloorButton(floor) {
    this.floorButtons[floor - 1] = true; // Floors are 1-indexed
    console.log(`Button pressed on Floor ${floor}`);
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
  getDataStore() {
    return [this.liftPositions, this.liftDirections];
  },
  // Animate the movement of a specific lift
  // Animate the movement of a specific lift
  animateLift(liftIndex) {
    const liftElement = document.getElementById(`lift-${liftIndex}`);
    const currentFloor = this.liftPositions[liftIndex];
    const targetFloor = this.getLiftPosition(liftIndex);
    const floorHeight = 160; // Height of each floor in pixels
    const distance = Math.abs(targetFloor - currentFloor);
    const duration = distance * 2000; // Delay of 2s per floor
    console.log('=====ANIMATE LIFT BEING CALLED=========');
    console.log(
      'liftElement:',
      liftElement,
      'currentFloor:',
      currentFloor,
      'targetFloor:',
      targetFloor,
      'floorHeight:',
      floorHeight,
      'distance:',
      distance,
      'duration:',
      duration
    );

    const direction = targetFloor > currentFloor ? 'up' : 'down';
    const transitionProperty = `bottom ${duration}ms`;

    liftElement.style.transition = transitionProperty;
    liftElement.style.bottom = `${(targetFloor - 1) * floorHeight}px`; // Adjust the position of the lift

    // Update the lift position after the animation completes
    setTimeout(() => {
      this.liftPositions[liftIndex] = targetFloor;

      // Update the lift visuals in the user interface
      liftElement.style.transition = '';
      liftElement.style.bottom = `${(targetFloor - 1) * floorHeight}px`; // Set the final position of the lift

      dataStore.updateLiftStatus(liftIndex, true);
    }, duration);

    // Update the lift direction visual indicator
    setTimeout(() => {
      liftElement.style.transition = `transform 0.5s`;
      liftElement.style.transform =
        direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)';
    }, 0);
  },

  // Open and close lift doors with a delay
  animateLiftDoors(liftIndex) {
    const liftElement = document.getElementById(`lift-${liftIndex}`);
    const liftDoorElement = liftElement.querySelector('.door');

    // Open the doors with a delay
    setTimeout(() => {
      liftElement.classList.add('open');
    }, 2500);

    // Close the doors after a delay of 0.5s
    setTimeout(() => {
      dataStore.updateLiftDirection(liftIndex, null);
      liftElement.classList.remove('open');
    }, 4000);
    dataStore.updateLiftStatus(liftIndex, false);
  },
};

dataStore.initialize(5, 5);
const liftControlEngine = {
  // ...existing code...

  allocateLift(floor, direction) {
    const liftPositions = dataStore.liftPositions;
    const liftDirections = dataStore.liftDirections;

    // Find the available lifts
    const availableLifts = [];
    for (let i = 0; i < liftPositions.length; i++) {
      if (!dataStore.liftBusyStatus(i)) {
        if (liftDirections[i] === null) {
          availableLifts.push(i);
        } else if (direction === 'up' && liftPositions[i] < floor) {
          availableLifts.push(i);
        } else if (direction === 'down' && liftPositions[i] > floor) {
          availableLifts.push(i);
        }
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

      // Animate the lift movement after updating the position
      dataStore.animateLift(closestLiftIndex);
      dataStore.animateLiftDoors(closestLiftIndex);

      // Get the current position of the allocated lift
      const currentLiftPosition = dataStore.getLiftPosition(closestLiftIndex);

      // Return the index of the allocated lift
      return closestLiftIndex;
    }

    // If no available lifts, return -1
    return -1;
  },
};

function createFloors() {
  const floorsContainer = document.getElementById('floors');
  floorsContainer.innerHTML = '';

  const numFloors = dataStore.numFloors;

  for (let i = numFloors; i > 0; i--) {
    const floorElement = document.createElement('div');
    floorElement.classList.add('floor');
    floorElement.id = `lift-${i}`;

    const floorNumberElement = document.createElement('span');
    floorNumberElement.classList.add('floor-number');
    floorNumberElement.textContent = `Floor ${i}`;

    const floorButtonsElement = document.createElement('div');
    floorButtonsElement.classList.add('floor-buttons');

    const upButtonElement = document.createElement('button');
    upButtonElement.textContent = '▲';
    upButtonElement.addEventListener('click', () => {
      requestLift(i, 'up');
      console.log(`Requested lift to Floor ${i} going up`);
      console.log(dataStore.getDataStore());
    });

    const downButtonElement = document.createElement('button');
    downButtonElement.textContent = '▼';
    downButtonElement.addEventListener('click', () => {
      requestLift(i, 'down');
      console.log(`Requested lift to Floor ${i} going down`);
      console.log(dataStore.getDataStore());
    });

    floorButtonsElement.appendChild(upButtonElement);
    floorButtonsElement.appendChild(downButtonElement);

    floorElement.appendChild(floorNumberElement);
    floorElement.appendChild(floorButtonsElement);

    floorsContainer.appendChild(floorElement);
  }
}

function createLifts() {
  const numLifts = dataStore.numLifts;
  const liftsContainer = document.getElementById('lift-section');
  liftsContainer.innerHTML = '';
  const liftWidth = 80; // Width of each lift including margins
  const containerWidth = liftsContainer.offsetWidth;
  const totalWidth = liftWidth * numLifts;
  const spacing = (containerWidth - totalWidth) / (numLifts + 1); // Calculate the spacing between lifts

  for (let i = 0; i < numLifts; i++) {
    const liftElement = document.createElement('div');
    liftElement.classList.add('lift');
    liftElement.id = `lift-${i}`;
    liftElement.style.bottom = '0'; // Initialize the bottom position to 0
    liftElement.style.left = `${spacing + i * liftWidth}px`; // Set the left position of each lift

    const liftDoorElement = document.createElement('div');
    liftDoorElement.classList.add('door');
    liftElement.appendChild(liftDoorElement);

    liftsContainer.appendChild(liftElement);
  }
}

function requestLift(floor, direction) {
  const allocatedLiftIndex = liftControlEngine.allocateLift(floor, direction);

  if (allocatedLiftIndex !== -1) {
    console.log(`Lift ${allocatedLiftIndex} allocated for Floor ${floor}`);
  } else {
    console.log(`No available lifts for Floor ${floor}`);
  }
}

createFloors();
createLifts();

function getDivHeightRelativeToBody(divElement) {
  let height = 0;
  let element = divElement;

  while (element) {
    height += element.offsetHeight;
    element = element.offsetParent;
  }

  return height;
}
