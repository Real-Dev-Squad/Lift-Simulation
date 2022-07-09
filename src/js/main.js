const floors = document.getElementById("input-floors");
const lifts = document.getElementById("input-lifts");
const inputContainer = document.getElementById("input-container");
const btnGenerateLifts = document.getElementById("btn-generate");
const errorDisplay = document.querySelector(".error-display");

let noOfLifts;
let noOfFloors;

let liftQueue = [];
let haltedQueue = [];
var requestQueue = [];

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function validateInputs() {
  if (!noOfFloors || !noOfLifts) {
    errorDisplay.textContent = "Please enter all the fields";
    errorDisplay.style.display = "flex";
    return false;
  }
  if (noOfFloors < 0 || noOfLifts < 0) {
    errorDisplay.textContent = "Please enter positive values";
    errorDisplay.style.display = "flex";
    return false;
  }
  return true;
}

function fillLiftQueue() {
  liftQueue = [];
  haltedQueue = [];
  requestQueue = [];
  for (let i = 1; i <= noOfLifts; i++) {
    let lift = {};
    lift.number = i;
    lift.status = "idle";
    lift.currentFloor = 0;
    liftQueue.push(lift);
  }
}

function generateFloors() {
  const ele = document?.querySelector(".floors");
  ele?.remove();
  const floors = document.createElement("section");
  floors.classList.add("floors");
  insertAfter(inputContainer, floors);
  for (let i = 0; i < noOfFloors; i++) {
    const floor = document.createElement("div");
    floor.setAttribute("class", "floor");
    floors.prepend(floor);
    const liftController = generateLiftControllers(i);
    floor.append(liftController);

    if (i === 0) {
      for (let i = 1; i <= noOfLifts; i++) {
        const lift = generateLift(i);
        floor.append(lift);
      }
    }
  }
}

function generateLiftControllers(index) {
  const liftController = document.createElement("div");
  liftController.setAttribute("class", "lift-controller");
  const btnUp = document.createElement("button");
  btnUp.innerText = "UP";
  btnUp.setAttribute("class", "btn-up");
  btnUp.dataset.floor = index;
  const btnDown = document.createElement("btn-down");
  btnDown.innerText = "DOWN";
  btnDown.setAttribute("class", "btn-down");
  btnDown.dataset.floor = index;
  liftController.append(btnUp);
  liftController.append(btnDown);
  return liftController;
}

function generateLift(index) {
  const lift = document.createElement("div");
  lift.setAttribute("class", "lift");
  lift.dataset.liftnum = index;
  const leftLift = document.createElement("div");
  leftLift.setAttribute("class", "lift-left");
  const rightLift = document.createElement("div");
  rightLift.setAttribute("class", "lift-right");
  lift.append(leftLift);
  lift.append(rightLift);
  return lift;
}

function getNearestLift(floorNumber) {
  let minDistance = Infinity;
  let nearestLiftIndex;
  let currentLiftDistance;

  liftQueue.sort(
    ({ number: liftOnePos }, { number: liftTwoPos }) => liftOnePos - liftTwoPos
  );

  for (let index = liftQueue.length - 1; index >= 0; index--) {
    currentLiftDistance = Math.abs(liftQueue[index].currentFloor - floorNumber);
    if (currentLiftDistance <= minDistance) {
      nearestLiftIndex = index;
      minDistance = currentLiftDistance;
    }
  }
  const deletedEle = liftQueue.splice(nearestLiftIndex, 1);
  liftQueue.unshift(deletedEle[0]);
}

function getFloorsHeight(floorNumber) {
  const floors = document.querySelectorAll(".floor");
  let height = 0;

  for (let i = floors.length - 1; i > floors.length - floorNumber - 1; i--) {
    height += floors[i].offsetHeight;
  }

  return height;
}

function simulateLift() {
  let floorNumber = requestQueue[0];
  let allLifts = document.querySelectorAll(".lift");
  let heightFromGroundFloor = getFloorsHeight(floorNumber);
  getNearestLift(floorNumber);

  let lift = allLifts[liftQueue[0].number - 1];
  let transitionTime =
    Math.abs(Number(floorNumber) - Number(liftQueue[0].currentFloor)) * 2;

  lift.style.transform = `translateY(${-parseInt(heightFromGroundFloor)}px)`;
  lift.style.transitionDuration = `${transitionTime}s`;

  setLiftToMoving(transitionTime, floorNumber, lift);
  requestQueue.splice(0, 1);
}

function setLiftToMoving(delay, floorNumber, currLift) {
  liftQueue = liftQueue.map((lift, index) =>
    index === 0
      ? { ...lift, status: "moving", currentFloor: floorNumber }
      : lift
  );
  const firstLiftInQueue = liftQueue.shift();

  haltedQueue.push(firstLiftInQueue);

  let timerId1 = setTimeout(() => {
    currLift.firstChild.classList.add("open-lift-left");
    currLift.lastChild.classList.add("open-lift-right");
  }, delay * 1000);

  let timerId2 = setTimeout(() => {
    currLift.firstChild.classList.remove("open-lift-left");
    currLift.lastChild.classList.remove("open-lift-right");
  }, delay * 1000 + 2500);

  let timerId3 = setTimeout(() => {
    haltedQueue[0].status = "idle";
    liftQueue.push(haltedQueue[0]);
    haltedQueue.shift();
    if (requestQueue.length > 0) {
      simulateLift();
    }
  }, delay * 1000 + 5000);
}

floors.addEventListener("input", () => {
  noOfFloors = parseInt(floors.value);
});

lifts.addEventListener("input", () => {
  noOfLifts = parseInt(lifts.value);
});

btnGenerateLifts.addEventListener("click", () => {
  if (validateInputs()) {
    errorDisplay.style.display = "none";
    generateFloors();
    fillLiftQueue();
  }
});

document.body.addEventListener("click", (e) => {
  console.log("running");
  if (e.target.parentNode.className === "lift-controller") {
    let floorNumber = parseInt(e.target.dataset.floor);
    requestQueue.push(floorNumber);
    if (liftQueue.length > 0) {
      simulateLift();
    }
  }
});
