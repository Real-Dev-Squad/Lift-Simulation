const form = document.querySelector(".form");
const floorsGroup = document.getElementById("floors-group");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const floorsCount = Number(e.target.elements[0].value);
    const liftsCount = Number(e.target.elements[1].value);

    const screenWidth = screen.availWidth;

    if (screenWidth < 600 && liftsCount > 2) {
        alert("This screen size cant have more than 2 lifts");
    }else if(liftsCount > floorsCount) {
        alert("Please enter lifts count <= floors count");
    }
    else {
        floorsGroup.innerHTML = "";
        generateFloorsAndLifts(floorsCount, liftsCount);
    }
});

function generateFloorsAndLifts(floors, lifts) {
    const floorsArray = [];

    const liftsGroup = document.createElement("div");
    liftsGroup.setAttribute("class", "lifts");

    // generate Lifts
    for (let i = 0; i < lifts; i++) {
        const lift = document.createElement("div");
        lift.setAttribute("class", "lift");
        lift.setAttribute("data-floor", `1`);
        lift.setAttribute("data-lift", `${i + 1}`);
        liftsGroup.append(lift);
    }

    // generate floors
    for (let i = 0; i < floors; i++) {
        const floor = document.createElement("div");
        floor.setAttribute("class", "floor");
        floor.setAttribute("data-floor", `${i + 1}`);
        const liftButtons = document.createElement("div");
        liftButtons.setAttribute("class", "lift-buttons");
        const callBtn = document.createElement("button");
        callBtn.setAttribute("class", `floor-call-btn`);
        callBtn.setAttribute("data-floor", `${i + 1}`);
        callBtn.textContent = "Call";
        const floorTitle = document.createElement("h4");
        floorTitle.textContent = `F - ${i + 1}`;
        liftButtons.append(callBtn, floorTitle);
        const floorContainer = document.createElement("div");
        floorContainer.setAttribute("class", "floor-container");
        floorContainer.append(liftButtons);
        if (i === 0) floorContainer.append(liftsGroup);

        floor.append(floorContainer);
        floorsArray.unshift(floor);
    }

    floorsGroup.append(...floorsArray);
}

let previouslyCalledOne;

document.addEventListener("click", (e) => {
    const floorCall = Number(e.target.dataset.floor);

    if (floorCall && previouslyCalledOne !== floorCall) {
        previouslyCalledOne = floorCall;
        //Move the lift
        processMovementRequest(floorCall);
    }
});

function processMovementRequest(floorNo) {
    const lifts = Array.from(document.querySelectorAll(".lift"));

    // getting all the non-busy lifts
    const nonBusyLifts = lifts.filter((lift) => !lift.classList.contains("busy"));

    if (nonBusyLifts.length) {
        // get the closes lift to the current Floor
        const {
            lift,
            distance
        } = getClosestLift(floorNo, nonBusyLifts);
        moveLiftToFloor(floorNo, lift, distance);
    } else {
        setTimeout(() => {
            processRequest(floorCall);
        }, 1000);
    }
}

function getClosestLift(floorCall, lifts) {
    let distance = null;
    let lift = "";

    for (const _lift of lifts) {
        // getting distance between the currentFloorCall and the lift
        const floorDistance = Math.abs(floorCall - Number(_lift.dataset.floor));

        // finding closest lift to the floorCall based on floor Distance
        if (distance > floorDistance || distance === null) {
            distance = floorDistance;
            lift = _lift;
        }
    }
    return {
        lift,
        distance
    };
}

function moveLiftToFloor(floorCall, lift, distance) {
    const currentFloor = Number(lift.dataset.floor);

    const {
        height
    } = document
        .querySelector(`[data-floor='${floorCall}']`)
        .getBoundingClientRect();

    if (currentFloor !== floorCall) {
        lift.style.transform = `translateY(-${height * (floorCall - 1)}px)`;
        lift.style.transition = `all ${distance * 2}s ease-in`;
        lift.dataset.floor = floorCall;
        lift.classList.add("busy");

        // open doors when lift has reached the floor
        setTimeout(() => {
            lift.classList.add("door-operation");
        }, distance * 2000 + 500);

        // free the lift
        lift.addEventListener("transitionend", (e) => {
            setTimeout(() => {
                lift.classList.remove("door-operation");
                lift.classList.remove("busy");
            }, 5500);
        });
    } else {
        // If lift at same floor open doors
        lift.classList.add("door-operation");
        lift.classList.add("busy");
        setTimeout(() => {
            lift.classList.remove("door-operation");
            lift.classList.remove("busy");
        }, 5500);
    }
}