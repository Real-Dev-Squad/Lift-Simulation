const floors = document.querySelector('.floors');
const addFloorbtn = document.querySelector('.navbar__add-floor');
const allFloors = document.querySelectorAll('.floor');
const moveLiftUpBtn = document.querySelector('.floor__call-lift-up');
const lift = document.querySelector('.doors');

let lastFloor = 1;

let arr = [];
let isLiftRunning = false;

const moveLiftUp = (e) => {
  const parentElement = e.target.parentElement.parentElement;
  const floorIndex = parentElement.dataset.floor;
  moveLift(floorIndex);
};

const moveLift = (index) => {
  if (!isLiftRunning) {
    isLiftRunning = true;
    const floorDiff = lastFloor - Number(index);
    lift.style.transform = `translateY(${-(Number(index) - 1) * 100}%)`;
    lift.style.transition = `transform ${
      Math.abs(floorDiff) * 2000
    }ms ease-out`;
    lastFloor = Number(index);
    setTimeout(() => {
      lift.classList.add('doors--stop');
      setTimeout(() => {
        lift.classList.remove('doors--stop');
        isLiftRunning = false;
        if (arr.length >= 1) {
          moveLift(Number(arr.shift()));
        }
      }, 5000);
    }, Math.abs(floorDiff) * 2000);
  } else {
    arr.push(index);
  }
};

const createFloorWithIndex = (floorIndex) => {
  return () => {
    floorIndex++;
    const floorContainer = document.createElement('div');
    const floorActionsContainer = document.createElement('div');
    const floorLiftsContainer = document.createElement('div');
    const callLiftUpBtn = document.createElement('button');
    const callLiftDownBtn = document.createElement('button');
    callLiftUpBtn.addEventListener('click', moveLiftUp);
    floorContainer.classList.add('floor');
    floorActionsContainer.classList.add('floor__actions');
    floorLiftsContainer.classList.add('floor__lifts');
    callLiftDownBtn.classList.add('floor__call-lift-down');
    callLiftUpBtn.classList.add('floor__call-lift-up');
    floorContainer.setAttribute('data-floor', floorIndex);
    callLiftDownBtn.textContent = 'Down';
    callLiftUpBtn.textContent = 'Up';
    floorContainer.appendChild(floorActionsContainer);
    floorContainer.appendChild(floorLiftsContainer);
    floorActionsContainer.appendChild(callLiftUpBtn);
    floorActionsContainer.appendChild(callLiftDownBtn);
    return floorContainer;
  };
};

const createFloor = createFloorWithIndex(1);

const addNewFloor = () => {
  floors.insertAdjacentElement('afterbegin', createFloor());
};

moveLiftUpBtn.addEventListener('click', moveLiftUp);
addFloorbtn.addEventListener('click', addNewFloor);
