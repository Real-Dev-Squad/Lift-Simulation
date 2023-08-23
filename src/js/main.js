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
  initializeSimulation();
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
      callLift(index + 1, true);
    };
    
    floor.append(floor_heading, floor_button_up, floor_button_down);
    floor.style.height = `${state.heightOfEachFloor + 5}px`;
    floorContainer.append(floor);
  }

  for (let index = 0; index < state.noOfLifts; index++) {
    let lift = document.createElement("div");
    lift.classList.add("lift");
    let lift_state = { id: index, state: "free" };
    lift.classList.add(`lift-${lift_state.id}`);
    state.lifts.push(lift_state);

    lift.setAttribute("data-id", lift_state.id);
    lift.setAttribute("data-state", lift_state.state);

    lift.style.left = `${(index + 1) * state.leftMarginEachLift}px`;
    liftContainer.append(lift);
  }
}

function callLift(floor, isGoingDown = false) {
  const availableLift = state.lifts.find(lift => lift.state === "free");
  
  if (availableLift) {
    availableLift.state = "occupied";
    const liftElement = document.querySelector(`.lift-${availableLift.id}`);
    liftElement.setAttribute("data-state", availableLift.state);
    liftElement.classList.add("door-open");
    setTimeout(() => {
      liftElement.classList.remove("door-open");
      liftElement.classList.add("door-close");
      setTimeout(() => {
        liftElement.classList.remove("door-close");
        //  direction and target floor
        const targetFloorPosition = (floor - 1) * state.heightOfEachFloor + 30;
        if (isGoingDown) {
          const transitionDuration = isGoingDown
            ? `${2 * Math.abs(state.noOfFloors - floor)}s`
            : `${2 * floor}s`;
          liftElement.style.transitionDuration = transitionDuration;
          liftElement.style.bottom = `${targetFloorPosition}px`;
        } else {
          const transitionDuration = `${2 * floor}s`;
          liftElement.style.transitionDuration = transitionDuration;
          liftElement.style.bottom = `${targetFloorPosition}px`;
        }
        
        setTimeout(() => {
          availableLift.state = "free";
          liftElement.setAttribute("data-state", availableLift.state);
        }, Math.max(2 * floor, 2 * Math.abs(state.noOfFloors - floor)) * 1000);
      }, 2500); 
    }, 2500); 
  } else {
    alert("All lifts are busy. Please wait.");
  }
}




initializeSimulation();