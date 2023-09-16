const state = {
  noOfFloors: 0,
  noOfLifts: 0,
  heightOfEachFloor: 155,
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
  const floorInput = formData.get("floor_input");
  const liftInput = formData.get("lift_input");

  if (!floorInput || !liftInput) {
    alert("Both inputs must be filled.");
    return;
  }

  const numFloors = parseInt(floorInput);
  const numLifts = parseInt(liftInput);

  if (isNaN(numFloors) || isNaN(numLifts)) {
    alert("Inputs must be valid numbers.");
    return;
  }

  if (numFloors <= 0) {
    alert("Value of floor cannot be negative or 0.");
    return;
  }
  if (numLifts <= 0) {
    alert("Value of lift cannot be negative or 0.");
    return;
  }

  const isDesktopDevice = window.innerWidth > 768;
  const maxLifts = isDesktopDevice ? 8 : 6;

  if (numLifts <= maxLifts) {
    state.noOfFloors = numFloors;
    state.noOfLifts = numLifts;
    initializeSimulation();
    form.style.display = "none";
  } else {
    alert(
      isDesktopDevice
        ? "Desktop devices should have 8 lifts."
        : "Mobile devices have a maximum of 6 lifts."
    );
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
    let floor_heading = document.createElement("h4");
    floor_heading.innerText = `Floor ${index + 1}`;

    
    // Call button for going up
    let floor_button_up = document.createElement("button");
    floor_button_up.innerText = `Up`;
    floor_button_up.onclick = () => {
      callLift(index + 1);
    };

    // Call button for going down
    let floor_button_down = document.createElement("button");
    floor_button_down.innerText = `Down`;
    floor_button_down.onclick = () => {
      callLift(index + 1);
    };

    floor.append(floor_heading, floor_button_up, floor_button_down);
    floor.style.height = `${state.heightOfEachFloor}px`;
    floorContainer.append(floor);
  }

 for (let index = 0; index < state.noOfLifts; index++) {
  let lift = document.createElement("div");
  const liftLeftPosition = (index + 1) * 12;
  lift.classList.add("lift");
  let lift_state = { id: index, state: "free", currentFloor: 1 };
  lift.classList.add(`lift-${lift_state.id}`);
  state.lifts.push(lift_state);

  lift.setAttribute("data-id", lift_state.id);
  lift.setAttribute("data-state", lift_state.state);

  lift.style.left = `${liftLeftPosition}%`;
  
  // Create the first span element
  let span1 = document.createElement("span");
  span1.classList.add("left-door");
  // span1.innerText = "Span 1 Text"; // You can set the text as needed
  lift.appendChild(span1);

  // Create the second span element
  let span2 = document.createElement("span");
  span2.classList.add("right-door");

  // span2.innerText = "Span 2 Text"; // You can set the text as needed
  lift.appendChild(span2);

  liftContainer.append(lift);
}
}

function callLift(floor, isGoingDown = false) {
  const availableLift = state.lifts.find((lift) => lift.state === "free");

  if (availableLift) {
    // Mark the lift as occupied
    availableLift.state = "occupied";
    const previousFloor = availableLift.currentFloor
    availableLift.currentFloor = floor; // Set the current floor

    const liftElement = document.querySelector(`.lift-${availableLift.id}`);
    const innerElement1 = liftElement.querySelector('.left-door');
    const innerElement2 = liftElement.querySelector('.right-door');

    // Determine direction and target floor
    const floorDifference = Math.abs(floor - previousFloor)
    const targetFloorPosition = (floor - 1) * state.heightOfEachFloor+30;
    const transitionDuration = isGoingDown
      ? `${2 * floorDifference + 1}s`
      : `${2 * floorDifference + 1}s`;

    // Move the lift to the target floor
    liftElement.style.transitionDuration = transitionDuration;
    liftElement.style.bottom = `${targetFloorPosition}px`;
    console.log(transitionDuration, floor - 1, floor)
    // Wait for the lift to reach the target floor

    const doorOpenTimeout = parseInt(transitionDuration) * 1000

    setTimeout(() => {
      liftElement.classList.add("door-open");
      innerElement1.classList.add("left-door-open")
      innerElement2.classList.add("right-door-open")
    }, doorOpenTimeout);
    setTimeout(() => {
      console.log(1, "dusra")
      // liftElement.classList.remove("door-open");
      // innerElement1.classList.remove("left-door-open")
      // innerElement2.classList.remove("right-door-open")

      innerElement1.classList.add("left-door-close")
      innerElement2.classList.add("right-door-close")
  
},
doorOpenTimeout + 2500);
    setTimeout(() => {
      availableLift.state = "free";

      // Check if there are pending requests
      if (state.requests.length > 0) {
        // Get the next requested floor from the queue
        const nextRequest = state.requests.shift();
        // Call the lift to the next requested floor
        callLift(nextRequest.floor, nextRequest.isGoingDown);
      }
    }, doorOpenTimeout + 3500);
      innerElement1.classList.remove("left-door-open")
      innerElement2.classList.remove("right-door-open")
  } else {
    // If all lifts are busy, add the request to the queue
    state.requests.push({ floor, isGoingDown });
  }
  console.log(state)
}

initializeSimulation();
