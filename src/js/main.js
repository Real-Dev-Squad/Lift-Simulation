const dataStore = {
  numFloors: 0, // Total number of floors in the building
  numLifts: 0, // Total number of lifts in the building
  liftPositions: [], // Current floor position of each lift
  liftDirections: [], // Current direction of each lift
  isLiftBusy: [], // status of all the lifts

  // Initialize the data store with the given number of floors and lifts
  initialize(numFloors, numLifts) {
    this.numFloors = numFloors;
    this.numLifts = numLifts;
    this.liftPositions = Array(numLifts).fill(0); // Initialized to 1st floor
    this.liftDirections = Array(numLifts).fill(null); // No direction initially
    this.isLiftBusy = Array(numLifts).fill(false); // Buttons not pressed initially
  },

  // Update lift position for a specific lift
  updateLiftPosition(liftIndex, floor) {
    this.liftPositions[liftIndex] = floor;
  },

  // Get the current position of a specific lift
  getLiftPosition(liftIndex) {
    return this.liftPositions[liftIndex];
  },

  // Update lift direction for a specific lift
  updateLiftDirection(liftIndex, direction) {
    this.liftDirections[liftIndex] = direction;
  },

  // Get the current direction of a specific lift
  getLiftDirection(liftIndex) {
    return this.liftDirections[liftIndex];
  },


  updateLiftStatus(liftIndex, status) {
    this.isLiftBusy[liftIndex] = status;
  },

  getliftBusyStatus(liftIndex) {
    return this.isLiftBusy[liftIndex];
  }
};


function createFloors() {
  const floorsContainer = document.getElementById('floors');
  floorsContainer.innerHTML = '';

  const numFloors = dataStore.numFloors;

  for (let i = numFloors; i > 0; i--) {
    const floorElement = document.createElement('div');
    floorElement.classList.add('floor');
    floorElement.id = `floor-${i}`;

    const floorNumberElement = document.createElement('span');
    floorNumberElement.classList.add('floor-number');
    floorNumberElement.textContent = `Floor ${i}`;

    const floorButtonsElement = document.createElement('div');
    floorButtonsElement.classList.add('floor-buttons');

    const upButtonElement = document.createElement('button');
    upButtonElement.textContent = '▲';
    upButtonElement.addEventListener('click', () => {
      requestLift(i, 'up');
    });

    const downButtonElement = document.createElement('button');
    downButtonElement.textContent = '▼';
    downButtonElement.addEventListener('click', () => {
      requestLift(i, 'down');
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
    liftElement.style.left = `${spacing + i * liftWidth}px`; // Set the left position of each lift
    
    const liftDoorElement = document.createElement('div');
    liftDoorElement.classList.add('door-right');
    liftDoorElement.classList.add('door-left');

    liftElement.appendChild(liftDoorElement);

    liftsContainer.appendChild(liftElement);
  }
}

function allocateLift(floor, direction) {
  const liftPositions = dataStore.liftPositions;
  const liftDirections = dataStore.liftDirections;
  const isLiftBusy = dataStore.isLiftBusy;

  const availableLifts = [];
  for (let i = 0; i < liftPositions.length; i++) {
    if (!isLiftBusy[i]) {
      if (liftDirections[i] === null) {
        availableLifts.push(i);
      } else if (direction === 'up' && liftPositions[i] < floor) {
        availableLifts.push(i);
      } else if (direction === 'down' && liftPositions[i] > floor) {
        availableLifts.push(i);
      }
    }
  }
  // find the close lift if available
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
    console.log("THE CLOSEST LIFT IS", closestLiftIndex)
    return closestLiftIndex
  }
  return -1
}

function requestLift(floor, direction) {
  console.log("Lift requested on floor", floor, " which is going ", direction)
  const allocatedLift = allocateLift(floor, direction)
  dataStore.isLiftBusy[allocatedLift] = true;
  console.log("lift", allocatedLift, "has been allocated")
  console.log(dataStore.isLiftBusy)
  if (allocateLift) {
    animateLift(allocatedLift, floor, direction)
  }
}

function animateLift(liftNumber, targetFloor, direction) {
  const liftElement = document.getElementById(`lift-${liftNumber}`);
  const currentFloor = dataStore.liftPositions[liftNumber];
  const floorHeight = 133; // Height of each floor in pixels

  // Calculate the correct distance to travel based on the current and target floor
  const distanceToTravel = (targetFloor) * floorHeight;

  // Calculate the duration of the animation based on the number of floors to travel
  const duration = Math.abs(currentFloor - targetFloor) * 1000; // Delay of 1s per floor

  // Adjust the lift direction based on the target floor
  console.log(distanceToTravel)
  liftElement.style.transition = `transform ${duration / 1000}s linear`;
  liftElement.style.transform = `translateY(-${distanceToTravel}px)`;

  setTimeout(() => {
    
    liftElement.classList.add('open');
    setTimeout(() => {
      dataStore.isLiftBusy[liftNumber] = false;
      dataStore.liftDirections[liftNumber] = null;
      dataStore.updateLiftPosition(liftNumber, targetFloor);
      // Close the lift doors by removing the 'open' class after 2.5 seconds
      liftElement.classList.remove('open');
    }, 2500);

    // Logging for debugging purposes
    console.log("lift element", document.getElementById(`lift-${liftNumber}`))
    console.log("lift directions", dataStore.liftDirections)
    console.log("is lift busy", dataStore.isLiftBusy)
    console.log("lift positions", dataStore.liftPositions)
  }, duration);

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
    distanceToTravel,
    'duration:',
    duration
  );
}


function init() {
  dataStore.initialize(5, 5)
  createFloors()
  createLifts()
}

init()