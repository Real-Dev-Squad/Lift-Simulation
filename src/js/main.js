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
    this.liftPositions = Array(numLifts).fill(1); // Initialized to 1st floor
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
    liftElement.style.bottom = '0'; // Initialize the bottom position to 0
    liftElement.style.left = `${spacing + i * liftWidth}px`; // Set the left position of each lift

    const liftDoorElement = document.createElement('div');
    liftDoorElement.classList.add('door');
    liftElement.appendChild(liftDoorElement);

    liftsContainer.appendChild(liftElement);
  }
}

function requestLift(floor, direction){
    console.log("Lift requested on floor", floor, " which is going ", direction)
}

function init(){
    dataStore.initialize(5,5)
    createFloors()
    createLifts()
}

init()