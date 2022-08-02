const floors = document.querySelector('.floors');
const addFloorbtn = document.querySelector('.navbar__add-floor');
const addLiftBtn = document.querySelector('.navbar__add-lift');
const allFloors = document.querySelectorAll('.floor');
const moveLiftUpBtn = document.querySelector('.floor__call-lift-up');
const liftsContainer = document.querySelector('.floor__lifts');
let lift = document.querySelectorAll('.doors');

let arr = [];
const liftsData = [...document.querySelectorAll('.doors')].map((element) => {
  return {
    element,
    lastFloor: 1,
    isLiftRunning: false,
  };
});

const moveLiftUp = (e) => {
  const parentElement = e.target.parentElement.parentElement;
  const floorIndex = parentElement.dataset.floor;
  moveLift(floorIndex);
};

const findNonBusyLift = () => {
  let nearestLift = {};
  for (let i = 0; i < liftsData.length; i++) {
    if (!liftsData[i].isLiftRunning) {
      nearestLift = { ...liftsData[i], i };
      break;
    }
  }
  return nearestLift;
};

const moveLift = (index) => {
  const { i } = findNonBusyLift();
  if (i >= 0) {
    liftsData[i].isLiftRunning = true;
    const floorDiff = liftsData[i].lastFloor - Number(index);
    console.log(floorDiff);
    lift[i].style.transform = `translateY(${-(Number(index) - 1) * 100}%)`;
    lift[i].style.transition = `transform ${
      Math.abs(floorDiff) * 2000
    }ms ease-out`;
    liftsData[i].lastFloor = Number(index);
    setTimeout(() => {
      lift[i].classList.add('doors--stop');
      setTimeout(() => {
        lift[i].classList.remove('doors--stop');
        liftsData[i].isLiftRunning = false;
        if (arr.length >= 1) {
          moveLift(Number(arr.shift()));
        }
      }, 5000);
    }, Math.abs(floorDiff) * 2000 + 1);
  } else {
    arr.push(index);
  }
};

const createFloorWithIndex = (floorIndex) => {
  return () => {
    floorIndex++;
    const floorContainer = document.createElement('div');
    const floorActionsContainer = document.createElement('div');
    const callLiftUpBtn = document.createElement('button');
    const callLiftDownBtn = document.createElement('button');
    callLiftUpBtn.addEventListener('click', moveLiftUp);
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

const addNewLift = () => {
  const liftEl = document.createElement('div');
  liftEl.classList.add('doors');
  liftsContainer.appendChild(liftEl);
  lift = document.querySelectorAll('.doors');
  liftsData.push({
    element: lift[lift.length - 1],
    lastFloor: 1,
    isLiftRunning: false,
  });
};

moveLiftUpBtn.addEventListener('click', moveLiftUp);
addFloorbtn.addEventListener('click', addNewFloor);
addLiftBtn.addEventListener('click', addNewLift);
