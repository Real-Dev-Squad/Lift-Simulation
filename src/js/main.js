const floors = document.getElementById("input-floors");
const lifts = document.getElementById("input-lifts");
const inputContainer = document.getElementById("input-container");
const btnGenerateLifts = document.getElementById("btn-generate");

let noOfLifts;
let noOfFloors;

let liftQueue = [];
let haltedQueue = [];

let liftStatus = {
  currentFloor: 0,
};

function fillLiftQueue() {
  liftQueue = [];
  for (let i = 1; i <= noOfLifts; i++) {
    let lift = {};
    lift.number = i;
    lift.status = "idle";
    lift.currentFloor = 0;
    liftQueue.push(lift);
  }
  console.log("lift-queue initital ----------->", liftQueue);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

floors.addEventListener("input", () => {
  noOfFloors = parseInt(floors.value);
});

lifts.addEventListener("input", () => {
  noOfLifts = parseInt(lifts.value);
});

btnGenerateLifts.addEventListener("click", () => {
  generateFloors();
  fillLiftQueue();
});

function generateFloors() {
  const ele = document?.querySelector(".floors");
  ele?.remove();
  const floors = document.createElement("section");
  floors.classList.add("floors");
  insertAfter(inputContainer, floors);
  for (let i = 0; i < noOfFloors; i++) {
    const floor = document.createElement("div");
    floor.setAttribute("class", "floor");
    // insertAfter(inputContainer, floor);
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
  if (index !== 0) {
    liftController.append(btnUp);
  }
  if (index !== noOfFloors - 1) {
    liftController.append(btnDown);
  }
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

document.body.addEventListener("click", (e) => {
  console.log("running");
  if (e.target.parentNode.className === "lift-controller") {
    const allLifts = document.querySelectorAll(".lift");
    //get floor number
    const floorNumber = parseInt(e.target.dataset.floor);
    let heightFromGroundFloor = getFloorsHeightForUp(floorNumber);

    //lift number and current floor of first lift in the queue
    const currentLiftNumber = liftQueue[0]?.number;
    const { currentFloor = 0 } = liftQueue[0];
    console.log(`current floor -> ${currentFloor} `);

    //Getting lift node of targeted lift
    const lift = allLifts[currentLiftNumber - 1];

    console.log(lift);
    const transitionTime = (floorNumber - currentFloor) * 2;
    console.log(transitionTime, "seconds");
    if (e.target.matches(".btn-up")) {
      console.log(lift.dataset.liftnum);
      lift.style.transform = `translateY(${-parseInt(
        heightFromGroundFloor
      )}px)`;
      lift.style.transitionDuration = `${transitionTime}s`;
      setLiftToMoving(transitionTime, floorNumber);
    }
    if (e.target.matches(".btn-down")) {
      lift.style.transform = `translateY(${-parseInt(
        heightFromGroundFloor
      )}px)`;
      // const transitionTime = (floorNumber - currentFloor) * 2;
      lift.style.transitionDuration = `${transitionTime}s`;
      setLiftToMoving(transitionTime, floorNumber);
    }
  }
});

function setLiftToMoving(delay, floorNumber) {
  liftQueue = liftQueue.map((lift, index) =>
    index === 0
      ? { ...lift, status: "moving", currentFloor: floorNumber }
      : lift
  );

  console.log("lift-queue later ----------->", liftQueue);
  console.log(haltedQueue);
  const firstLiftInQueue = liftQueue.shift();

  haltedQueue.push(firstLiftInQueue);
  setTimeout(() => {
    haltedQueue[0].status = "idle";
    liftQueue.push(haltedQueue[0]);
    haltedQueue.shift();
  }, delay * 1000);
}

function getFloorsHeightForUp(floorNumber) {
  const floors = document.querySelectorAll(".floor");
  console.log(floorNumber, floors.length);
  let height = 0;

  for (let i = floors.length - 1; i > floors.length - floorNumber - 1; i--) {
    height += floors[i].offsetHeight;
  }
  console.log(height);

  return height;
}

// function getFloorsHeightForDown(floorNumber) {
//   const floors = document.querySelectorAll(".floor");
//   let height = 0;
//   for (let i = 0; i < floors.length - 1; i++) {
//     height += floors[i].offsetHeight;
//     console.log(floors[i].offsetHeight);
//   }
// }