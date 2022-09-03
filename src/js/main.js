const floors = document.querySelector('.floors');
const addFloorbtn = document.querySelector('.navbar__add-floor');
const addLiftBtn = document.querySelector('.navbar__add-lift');
const allFloors = document.querySelectorAll('.floor');
const moveLiftUpBtn = document.querySelector('.floor__call-lift-up');
const moveLiftDownBtn = document.querySelector('.floor__call-lift-down');
const liftsContainer = document.querySelector('.floor__lifts');
let lift = document.querySelectorAll('.doors');

const destinations = [];
const currentlyServedFloors = [];
let numOfLifts = 1;
const liftsData = [...document.querySelectorAll('.doors')].map((element) => {
  return {
    element,
    lastFloor: 1,
    isLiftRunning: false,
  };
});

const callLift = (e) => {
  const parentElement = e.target.parentElement.parentElement;
  const floorIndex = parentElement.dataset.floor;
  moveLift(floorIndex);
};

const findFirstNonBusyLift = () => {
  let nearestLift = {};
  for (let i = 0; i < liftsData.length; i++) {
    if (!liftsData[i].isLiftRunning) {
      nearestLift = { ...liftsData[i], i };
      return nearestLift;
    }
  }
  return { ...nearestLift, i: -1 };
};

const openCloseLift = (index, floorDiff) => {
  setTimeout(() => {
    lift[index].classList.add('doors--stop');
    setTimeout(() => {
      lift[index].classList.remove('doors--stop');
      liftsData[index].isLiftRunning = false;
      currentlyServedFloors.shift();
      if (destinations.length >= 1) {
        moveLift(Number(destinations.shift()));
      }
    }, 5000);
  }, Math.abs(floorDiff) * 2000 + 1);
};

const moveLift = (index) => {
  const { i } = findFirstNonBusyLift();
  if (i >= 0 && !currentlyServedFloors.includes(index)) {
    liftsData[i].isLiftRunning = true;
    currentlyServedFloors.push(index);
    const floorDiff = liftsData[i].lastFloor - Number(index);
    lift[i].style.transform = `translateY(${-(Number(index) - 1) * 100}%)`;
    lift[i].style.transition = `transform ${
      Math.abs(floorDiff) * 2000
    }ms ease-out`;
    liftsData[i].lastFloor = Number(index);
    openCloseLift(i, floorDiff);
  } else {
    if (!currentlyServedFloors.includes(index)) {
      destinations.push(index);
    }
  }
};

const createFloorWithIndex = (floorIndex) => {
  return () => {
    floorIndex++;
    const floorContainer = document.createElement('div');
    const floorActionsContainer = document.createElement('div');
    const callLiftUpBtn = document.createElement('button');
    const callLiftDownBtn = document.createElement('button');
    callLiftUpBtn.addEventListener('click', callLift);
    callLiftDownBtn.addEventListener('click', callLift);
    floorContainer.classList.add('floor');
    floorActionsContainer.classList.add('floor__actions');
    callLiftDownBtn.classList.add('floor__call-lift-down');
    callLiftUpBtn.classList.add('floor__call-lift-up');
    floorContainer.setAttribute('data-floor', floorIndex);
    callLiftDownBtn.textContent = 'Down';
    callLiftUpBtn.textContent = 'Up';
    floorContainer.appendChild(floorActionsContainer);
    floorActionsContainer.appendChild(callLiftUpBtn);
    floorActionsContainer.appendChild(callLiftDownBtn);
    return floorContainer;
  };
};

const createFloor = createFloorWithIndex(1);

const addNewFloor = () => {
  floors.insertAdjacentElement('afterbegin', createFloor());
};

const getMaxLiftsAllowed = () => {
  const liftsContainerWidth = floors.clientWidth;
  const liftSize = 120 + 32;
  return Math.floor((liftsContainerWidth - 108) / liftSize);
};

const addNewLift = () => {
  if (numOfLifts >= getMaxLiftsAllowed()) {
    return;
  }
  const liftEl = document.createElement('div');
  liftEl.classList.add('doors');
  liftsContainer.appendChild(liftEl);
  lift = document.querySelectorAll('.doors');
  liftsData.push({
    element: lift[lift.length - 1],
    lastFloor: 1,
    isLiftRunning: false,
  });
  numOfLifts++;
};

moveLiftUpBtn.addEventListener('click', callLift);
moveLiftDownBtn.addEventListener('click', callLift);
addFloorbtn.addEventListener('click', addNewFloor);
addLiftBtn.addEventListener('click', addNewLift);
