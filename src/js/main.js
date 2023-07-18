const inputForm = document.getElementById("inputForm");
const liftButtonsContainer = document.getElementById("liftButtons");
const floorButtonsContainer = document.getElementById("floorButtons");
const liftDialog = document.getElementById("liftDialog");
const cancelButton = document.getElementById("cancelButton");

let numFloors;
let numLifts;

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  numFloors = parseInt(document.getElementById("numFloors").value);
  numLifts = parseInt(document.getElementById("numLifts").value);
  generateLiftButtons();
  generateFloorButtons();
});

const liftData = [];

function generateLiftButtons() {
  liftButtonsContainer.innerHTML = "";
  liftData.length = 0;

  for (let i = 1; i <= numLifts; i++) {
    const liftContainer = document.createElement("div");
    liftContainer.className = "liftContainer";

    const liftButton = document.createElement("div");
    liftButton.className = "liftButton";
    liftButton.textContent = `Lift ${i}`;
    liftButton.addEventListener("click", function () {
      openFloorDialog(i);
    });

    const floorDisplay = document.createElement("div");
    floorDisplay.className = "floorDisplay";

    const lift = {
      liftButton,
      floorDisplay,
      currentFloor: 1,
    };
    liftData.push(lift);

    liftContainer.appendChild(liftButton);
    liftContainer.appendChild(floorDisplay);

    liftButtonsContainer.appendChild(liftContainer);
  }
}

function generateFloorButtons() {
  floorButtonsContainer.innerHTML = "";

  for (let i = 1; i <= numFloors; i++) {
    const floorButton = document.createElement("button");
    floorButton.textContent = `Floor ${i}`;
    floorButton.addEventListener("click", function () {
      // Handle floor button click if needed
    });

    floorButtonsContainer.appendChild(floorButton);
  }
}

function openFloorDialog(liftNumber) {
  cancelButton.addEventListener("click", closeDialog);
  liftDialog.showModal();
}

function sendLiftToFloor(liftNumber, floorNumber) {
  const lift = liftData[liftNumber - 1];
  const { floorDisplay } = lift;

  // Update floor display
  floorDisplay.textContent = `Floor: ${floorNumber}`;

  // Move the lift (Replace this with your actual lift movement logic)
  console.log(`Sending Lift ${liftNumber} to Floor ${floorNumber}`);

  closeDialog();
}

function closeDialog() {
  liftDialog.close();
}
