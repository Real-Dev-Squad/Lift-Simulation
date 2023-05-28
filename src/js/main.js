const dataStore = {
  numFloors: 0, // Total number of floors in the building
  numLifts: 0, // Total number of lifts in the building
  liftPositions: [], // Current floor position of each lift
  liftDirections: [], // Current direction of each lift
  isLiftBusy: [], // Status of all the lifts
  liftRequestQueue: [], // Queue to store lift requests

  // Initialize the data store with the given number of floors and lifts
  initialize(numFloors, numLifts) {
    this.numFloors = numFloors;
    this.numLifts = numLifts;
    this.liftPositions = Array(numLifts).fill(0); // Initialized to 1st floor
    this.liftDirections = Array(numLifts).fill(null); // No direction initially
    this.isLiftBusy = Array(numLifts).fill(false); // Buttons not pressed initially
    this.liftRequestQueue = []; // Initialize the lift request queue
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

  // Update lift status for a specific lift
  updateLiftStatus(liftIndex, status) {
    this.isLiftBusy[liftIndex] = status;
  },

  // Get the busy status of a specific lift
  getLiftBusyStatus(liftIndex) {
    return this.isLiftBusy[liftIndex];
  },

  // Add a lift request to the queue
  addLiftRequest(floor, direction) {
    this.liftRequestQueue.push({ floor, direction });
  },

  // Get the next lift request from the queue
  getNextLiftRequest() {
    return this.liftRequestQueue.shift();
  },

  // Check if the lift request queue is empty
  isLiftRequestQueueEmpty() {
    return this.liftRequestQueue.length === 0;
  },
};


function createFloors() {
  const floorsContainer = document.getElementById('floors');
  floorsContainer.innerHTML = '';

  const numFloors = dataStore.numFloors;

  for (let i = numFloors-1; i >= 0; i--) {
    const floorElement = document.createElement('div');
    floorElement.classList.add('floor');
    floorElement.id = `floor-${i}`;
    floorElement.style.height = '80px' // floor height goes here

    const floorNumberElement = document.createElement('span');
    floorNumberElement.classList.add('floor-number');
    floorNumberElement.textContent = `Floor ${i}`;

    const floorButtonsElement = document.createElement('div');
    floorButtonsElement.classList.add('floor-buttons');

    if(numFloors-1 !== i){
      const upButtonElement = document.createElement('button');
      upButtonElement.textContent = '▲';
      upButtonElement.addEventListener('click', () => {
        requestLift(i, 'up');
      });
      floorButtonsElement.appendChild(upButtonElement);
    }

    if( i !== 0){
      const downButtonElement = document.createElement('button');
      downButtonElement.textContent = '▼';
      downButtonElement.addEventListener('click', () => {
        requestLift(i, 'down');
      });
      floorButtonsElement.appendChild(downButtonElement);
    }
    floorElement.appendChild(floorNumberElement);
    floorElement.appendChild(floorButtonsElement);
    floorsContainer.appendChild(floorElement);
  }
}

function createLifts() {
  const numLifts = dataStore.numLifts;
  const liftsContainer = document.getElementById('lift-section');
  const startingFloor = document.getElementById('floor-0');
  liftsContainer.innerHTML = '';
  const liftWidth = 80; // Width of each lift including margins
  const containerWidth = liftsContainer.offsetWidth;
  const totalWidth = liftWidth * numLifts;
  const spacing = (containerWidth - totalWidth) / (numLifts + 1); // Calculate the spacing between lifts

  for (let i = 0; i < numLifts; i++) {
    const liftElement = document.createElement('div');
    liftElement.classList.add('lift');
    liftElement.id = `lift-${i}`;
    liftElement.style.left = `${260 + i * liftWidth}px`; // Set the left position of each lift

    // Set the initial position to floor 1

    const liftDoorsElement = document.createElement('div');
    const leftDoorElement = document.createElement('div');
    const rightDoorElement = document.createElement('div');
    leftDoorElement.classList.add('door-left');
    rightDoorElement.classList.add('door-right');
    liftDoorsElement.appendChild(leftDoorElement);
    liftDoorsElement.appendChild(rightDoorElement);

    liftElement.appendChild(liftDoorsElement);

    startingFloor.appendChild(liftElement);
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
  const allLiftsAreBusy = dataStore.isLiftBusy.every((value) => value === true);

  if (!allLiftsAreBusy) {
    console.log("Lift requested on floor", floor, " which is going ", direction)
    const allocatedLift = allocateLift(floor, direction)
    dataStore.isLiftBusy[allocatedLift] = true;
    console.log("Lift", allocatedLift, "has been allocated")

    if (allocatedLift !== -1) {
      animateLift(allocatedLift, floor, direction)
    }
  } else {
    console.log("ALL LIFTS ARE BUSY!!")
    dataStore.addLiftRequest(floor, direction); // Add the lift request to the queue
    console.log("Lift request added to the queue:", dataStore.liftRequestQueue);
  }
}

function animateLift(liftNumber, targetFloor, direction) {
  const liftElement = document.getElementById(`lift-${liftNumber}`);
  const currentFloor = dataStore.liftPositions[liftNumber];
  const floorHeight = document.getElementById('floor-1').clientHeight + 1; // Height of each floor in pixels
  // Calculate the correct distance to travel based on the current and target floor
  const distanceToTravel = Math.abs(targetFloor) * floorHeight;

  // Calculate the duration of the animation based on the number of floors to travel
  const duration = Math.abs(currentFloor - targetFloor) * 2000; // Delay of 1s per floor

  liftElement.style.transition = `transform ${duration / 1000}s linear`;
  liftElement.style.transform = `translateY(-${distanceToTravel}px)`;

  setTimeout(() => {
    liftElement.classList.add('open');
    setTimeout(() => {
      // Close the lift doors after 2.5 seconds
      liftElement.classList.remove('open');
      setTimeout(() => {
        dataStore.isLiftBusy[liftNumber] = false;
        dataStore.liftDirections[liftNumber] = null;
        dataStore.updateLiftPosition(liftNumber, targetFloor);

        // Check if there are pending lift requests in the queue
        if (dataStore.liftRequestQueue.length > 0) {
          const nextRequest = dataStore.liftRequestQueue.shift(); // Get the next request from the queue
          const { floor, direction } = nextRequest;
          requestLift(floor, direction); // Process the next request
        }
      }, 2500); // lifts door closed
    }, 2500); // lifts door open
  }, duration); // Add a delay of 5 seconds before processing the next request
}



function init() {
  dataStore.initialize(5, 2)
  createFloors()
  createLifts()
}

function init() {
  const form = document.getElementById('input-form');
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const numLiftsInput = document.getElementById('num-lifts');
  const numFloorsInput = document.getElementById('num-floors');

  const numLifts = parseInt(numLiftsInput.value);
  const numFloors = parseInt(numFloorsInput.value);

  if (isNaN(numLifts) || isNaN(numFloors) || numLifts <= 0 || numFloors <= 0) {
    alert('Please enter valid values for number of lifts and number of floors.');
    return;
  }

  if (numLifts < 1 || numFloors < 2 || numLifts > 10 || numFloors > 10) {
    event.preventDefault();
    alert("Please enter at least 2 and maximum 10 for both floors and lifts.");
  }



  dataStore.initialize(numFloors, numLifts);
  createFloors();
  createLifts();

  // Hide the form
  const formContainer = document.getElementById('form-container');
  const liftFloorContainer = document.getElementById('lift-floor-container');
  formContainer.style.display = 'none';
  liftFloorContainer.style.display = 'block';


  // Clear form inputs
  numLiftsInput.value = '';
  numFloorsInput.value = '';
}

init();


// 1. Add a queue (disable the button)
// 2. add a back button
// 3. mobile responsiveness