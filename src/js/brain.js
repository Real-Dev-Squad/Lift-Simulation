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
  // Existing code...
}

function createLifts() {
  // Existing code...
}

function allocateLift(floor, direction) {
  // Existing code...
}

function requestLift(floor, direction) {
  const allLiftsAreBusy = dataStore.isLiftBusy.every((value) => value === true);

  if (!allLiftsAreBusy) {
    console.log("Lift requested on floor", floor, " which is going ", direction)
    const allocatedLift = allocateLift(floor, direction)
    dataStore.isLiftBusy[allocatedLift] = true;
    console.log("Lift", allocatedLift, "has been allocated")
    console.log(dataStore.isLiftBusy)

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
  const duration = Math.abs(currentFloor - targetFloor) * 2500; // Delay of 1s per floor

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
        if (liftRequestQueue.length > 0) {
          const nextRequest = liftRequestQueue.shift(); // Get the next request from the queue
          const { floor, direction } = nextRequest;
          requestLift(floor, direction); // Process the next request
        }
      }, 2500);
    }, 2500);
  }, duration + 5000); // Add a delay of 5 seconds before processing the next request
}


function init() {
  // Existing code...
}

init();
