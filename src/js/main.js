const state = {
  noOfFloors: 0,
  noOfLifts: 0,
  heightOfEachFloor: 150,
  leftMarginEachLift: 150,
  requests: [],
  lifts: [],
};


const floorContainer = document.querySelector(".floor-container");
const liftContainer = document.querySelector(".lift-container");

const form = document.querySelector("form");
form.onsubmit = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  state.noOfFloors = parseInt(formData.get("floor_input"));
  state.noOfLifts = parseInt(formData.get("lift_input"));

  // Check if the device is desktop
  const isDesktopDevice = window.innerWidth > 768;
 const maxLifts = isDesktopDevice ? 8 : 6;

  if (state.noOfLifts <= maxLifts) {
    initializeSimulation();
  } else {
    alert(isDesktopDevice ? "Desktop devices should have 8 lifts." : "Mobile devices have a maximum of 6 lifts.");
  }
};
function initializeSimulation() {
  floorContainer.innerHTML = "";
  liftContainer.innerHTML = "";
  render();
}

function render() {
  for (let index = 0; index < state.noOfFloors; index++) {
    let floor = document.createElement("div");
    floor.classList.add("floor-divider");
    floor_heading = document.createElement("h4");
    floor_heading.innerText = `Floor ${index + 1}`;
    const liftLeftPosition = (index + 1) * 10; 
    
    // Call button for going up
    floor_button_up = document.createElement("button");
    floor_button_up.innerText = `Up`;
    floor_button_up.onclick = () => {
      callLift(index + 1);
    };
    
    // Call button for going down
    floor_button_down = document.createElement("button");
    floor_button_down.innerText = `Down`;
    floor_button_down.onclick = () => {
      callLift(index + 1);
    };
    
    floor.append(floor_heading, floor_button_up, floor_button_down);
    floor.style.height = `${state.heightOfEachFloor + 5}px`;
    floorContainer.append(floor);
  }

  for (let index = 0; index < state.noOfLifts; index++) {
    let lift = document.createElement("div");
     const liftLeftPosition = (index + 1) * 12;
    lift.classList.add("lift");
    let lift_state = { id: index, state: "free" };
    lift.classList.add(`lift-${lift_state.id}`);
    state.lifts.push(lift_state);

    lift.setAttribute("data-id", lift_state.id);
    lift.setAttribute("data-state", lift_state.state);

    lift.style.left = `${liftLeftPosition}%`;
    liftContainer.append(lift);
  }
}

function callLift(floor, isGoingDown = false) {
  const availableLift = state.lifts.find((lift) => lift.state === "free");

  if (availableLift) {
    availableLift.state = "occupied";
    const liftElement = document.querySelector(`.lift-${availableLift.id}`);
    liftElement.setAttribute("data-state", availableLift.state);

    // Determine direction and target floor
    const targetFloorPosition = (floor - 1) * state.heightOfEachFloor + 30;
    const transitionDuration = isGoingDown
      ? `${2 * Math.abs(floor - 1)}s`
      : `${2 * floor}s`;

    // Move the lift to the target floor
    liftElement.style.transitionDuration = transitionDuration;
    liftElement.style.bottom = `${targetFloorPosition}px`;

    // Wait for the lift to reach the target floor
    setTimeout(() => {
      liftElement.classList.add("door-open");

      // Show the door animation for 2.5 seconds
      setTimeout(() => {
        liftElement.classList.remove("door-open");
        // liftElement.classList.add("door-close");

        // Wait for the door animation to finish
        setTimeout(() => {
          liftElement.classList.remove("door-close");
          availableLift.state = "free";
          liftElement.setAttribute("data-state", availableLift.state);
        }, 2500);
      }, 2500);
    }, parseInt(transitionDuration) * 1000);
  } else {
    alert("All lifts are busy. Please wait.");
  }
}






initializeSimulation();