//Constants
const liftWidth = 50;
const liftHeight = 75;
const floorHeight = 100;
const liftLeftOffset = 75;
const interLiftDistance = 120;
const buttonLeftOffset = 10;
const upButtonHeightOffset = 75;
const downButtonHeightOffset = 40;
const perFloorCrossTime = 2000;//ms
const liftDoorHoldTime = 500; //ms
const liftOpenTime = 1000; //ms
const timeStep = 50; //ms 
const numStepsForLiftClimb = perFloorCrossTime / timeStep
const pixelsPerTimeStepForLiftClimb = floorHeight / numStepsForLiftClimb
const numStepsForLiftOpen = liftOpenTime / timeStep
const pixelsPerTimeStepForLiftOpen = liftWidth / numStepsForLiftOpen
const numStepsForLiftHold = liftDoorHoldTime / timeStep

console.log('start')
const simulate = document.querySelector('.createLiftFloorButton');

simulate.addEventListener('click', e => {
    e.preventDefault();
    const floorInputValue = document.getElementById('floorNumber').value;
    const liftInputValue = document.getElementById('liftNumber').value;

    if (floorInputValue == "" || liftInputValue == "") {
        alert('please enter the value')
    }

    if (floorInputValue == "0" || liftInputValue == "0") {
        alert('please enter the value')
    }
    else {
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        let data = makingFloor()
        let lifts = data[0]
        let upButtonArray = data[1]
        let downButtonArray = data[2]
        let buttonStateArray = data[3]
        engine(lifts, buttonStateArray)
        // tempEngine(lifts)
    }
}
)


function makingFloor() {
    const floorInputValue = Number(document.getElementById('floorNumber').value);
    const liftInputValue = Number(document.getElementById('liftNumber').value);
    let parent = document.querySelector(".secondPage")

    //add the floors
    for (let i = floorInputValue; i > 0; i -= 1) {
        console.log(i)
        let newFloor = document.createElement("div")
        newFloor.className = "floor"
        newFloor.innerHTML = `<span class="floor-text">FLOOR${i}</span>`
        parent.appendChild(newFloor)
        let breakage = document.createElement("div")
        breakage.className = "break"
        parent.appendChild(breakage)
    }
    //add the baseBox
    let baseBox = document.createElement("div")
    baseBox.className = "baseBox"
    parent.appendChild(baseBox)

    //add the lifts
    let lifts = []
    for (let i = 0; i < liftInputValue; i += 1) {
        let newLift = document.createElement("div")
        newLift.className = "lift"
        newLift.id = `lift${i + 1}`
        baseBox.appendChild(newLift)
        newLift.style.top = `-${liftHeight}px`
        newLift.style.left = `${liftLeftOffset + (i * interLiftDistance)}px`
        lifts.push(newLift)
    }

    buttonStateArray = Array(liftInputValue).fill(0).map(x => Array(floorInputValue).fill(0))
    let upButtonArray = Array(liftInputValue).fill(0).map(x => Array(floorInputValue).fill(0))
    let downButtonArray = Array(liftInputValue).fill(0).map(x => Array(floorInputValue).fill(0))
    //add the buttons
    for (let i = 0; i < liftInputValue; i += 1) {
        for (let j = 0; j < floorInputValue; j += 1) {
            if (j != floorInputValue - 1) {
                let x = document.createElement("BUTTON")
                x.innerText = "UP"
                x.className = "up"
                x.addEventListener("click", () => {
                    buttonStateArray[i][j] = 1;
                })
                upButtonArray[i][j] = x
                baseBox.appendChild(x)
                x.style.top = `-${upButtonHeightOffset + (floorHeight * j)}px`
                x.style.left = `${buttonLeftOffset + (interLiftDistance * i)}px`
            }
            if (j != 0) {
                let y = document.createElement("BUTTON")
                y.innerText = "DOWN"
                y.className = "down"
                // Need to change buttonStateArray[i][j] = 1; to = -1 but i will not do it without specific reason
                y.addEventListener("click", () => {
                    buttonStateArray[i][j] = 1;
                })
                downButtonArray[i][j] = y
                baseBox.appendChild(y)
                y.style.top = `-${downButtonHeightOffset + (floorHeight * j)}px`
                y.style.left = `${buttonLeftOffset + (interLiftDistance * i)}px`
            }
        }
    }
    return [lifts, upButtonArray, downButtonArray, buttonStateArray];
}



function tempEngine(lifts) {
    for (let i = 0; i < lifts.length; i += 1) {
        setInterval(moveUp, timeStep, lifts[i])
    }
}


function engine(lifts, buttonStateArray) {
    let liftStateArray = new Array(lifts.length)
    for (let i = 0; i < lifts.length; i += 1) {
        liftStateArray[i] = {
            state: 0,
            movement: {
                movementState: 0,
                currTop: -1 * liftHeight,
                floor: 0,
                step: 0,
                // goalFloor: -1,
                // goalHeight: -1,
                // lastTime: -1,
            },
            ohc: {
                ohcState: 0,
                width: liftWidth,
                currLeft: liftLeftOffset + (i * interLiftDistance),
                step: 0,
                // lastTime: -1,
            },
            liftNumber: i,
            lift: lifts[i],
        }
    }

    for (let i = 0; i < lifts.length; i += 1) {
        setInterval(liftEngine, timeStep, liftStateArray[i], buttonStateArray)
    }
}

function liftEngine(liftState, buttonStateArray, /*upButtonArray, downButtonArray*/) {
    // let start=new Date().getTime()
    let currLiftState = liftState.state
    if (currLiftState == 0) {
        if (liftState.movement.movementState == 0) {
            let closestFloor = findClosestFloorWithButtonPressed(liftState.movement.floor, buttonStateArray[liftState.liftNumber])
            if (closestFloor == -1) {

                //pass
            } else if (closestFloor == liftState.movement.floor) {
                //Open the Gates
                liftState.state = 2
                liftState.ohc.ohcState = 1
            } else if (closestFloor > liftState.movement.floor) {
                // the closest floor is above the current floor
                liftState.state = 1
                liftState.movement.movementState = 1
            } else {
                // the closest floor is below the current floor
                liftState.state = 1
                liftState.movement.movementState = -1
            }
        } else if (liftState.movement.movementState == 1) {
            // this scenario happens when ->when we just stopped at a floor, we need to check if we need to open for the current floor or we can continue.
            // the liftState.movement.movementState being 1 represents that it was moving upward before.
            let closestFloor = findClosestButtonUp(liftState.movement.floor, buttonStateArray[liftState.liftNumber])
            if (closestFloor == -1) {
                liftState.movement.movementState = 0
            } else if (closestFloor == liftState.movement.floor) {
                liftState.state = 2
                liftState.ohc.ohcState = 1
            } else {
                liftState.state = 1
            }
        } else {
            // in this scenario the state is 0 and lift.movement.movementState is -1. this means that it stopped here while moving down or this was the destination.
            let closestFloor = findClosestButtonDown(liftState.movement.floor, buttonStateArray[liftState.liftNumber])
            if (closestFloor == -1) {
                liftState.movement.movementState = 0
            } else if (closestFloor == liftState.movement.floor) {
                liftState.state = 2
                liftState.ohc.ohcState = 1
            } else {
                liftState.state = 1
            }
        }
    } else if (currLiftState == 1) {
        // if this case comes true, this implies that the lift must be moved, where to can be know from liftState.movement.step
        if (liftState.movement.movementState == 1) {
            if (liftState.movement.step < numStepsForLiftClimb) {
                //push the lift up.
                liftState.movement.step += 1
                liftState.movement.currTop -= pixelsPerTimeStepForLiftClimb
                liftState.lift.style.top = `${Math.round(liftState.movement.currTop)}px`
            } else {
                liftState.movement.step = 0
                liftState.state = 0
                liftState.movement.floor += 1
            }
        } else {
            if (liftState.movement.step < numStepsForLiftClimb) {
                //push the lift down.
                liftState.movement.step += 1
                liftState.movement.currTop += pixelsPerTimeStepForLiftClimb
                liftState.lift.style.top = `${Math.round(liftState.movement.currTop)}px`
            } else {
                liftState.movement.step = 0
                liftState.state = 0
                liftState.movement.floor -= 1
            }
        }
    } else {
        let doorStatus = liftState.ohc.ohcState
        if (doorStatus == 0) {
            //The liftDoor is closed. This state can only be arrived when we have already closed the lift from going via doorStatus==3(in the else block)
            // Update the buttonArray
            // Change the state
            // change the color
            buttonStateArray[liftState.liftNumber][liftState.movement.floor] = 0
            liftState.state = 0


        } else if (doorStatus == 1) {
            if (liftState.ohc.step < numStepsForLiftOpen) {
                liftState.ohc.step += 1
                liftState.ohc.width -= pixelsPerTimeStepForLiftOpen
                liftState.lift.style.width = `${Math.round(liftState.ohc.width)}px`
            } else {
                liftState.ohc.step = 0
                liftState.ohc.ohcState = 2
            }
        } else if (doorStatus == 2) {
            // hold
            if (liftState.ohc.step < numStepsForLiftHold) {
                liftState.ohc.step += 1
            } else {
                liftState.ohc.ohcState = 3
                liftState.ohc.step = 0
            }
        } else {
            if (liftState.ohc.step < numStepsForLiftOpen) {
                liftState.ohc.step += 1
                liftState.ohc.width += pixelsPerTimeStepForLiftOpen
                liftState.lift.style.width = `${Math.round(liftState.ohc.width)}px`
            } else {
                liftState.ohc.ohcState = 0
                liftState.ohc.step = 0
            }
        }
    }
    // console.log(new Date().getTime()-start,"ms have been used to process this iteration time of the lift")
}

function moveUp(lift) {
    const upMovementAmount = 1;
    let topY = lift.style.top;
    topY = Number(topY.slice(1, topY.length - 2));
    lift.style.top = `-${topY + upMovementAmount}px`;
}


function findClosestFloorWithButtonPressed(floor, list) {
    let left = -1;
    let right = -1;
    for (let i = 0; i <= floor; i += 1) {
        if (list[i] == 1) {
            left = i
        }
    }
    for (let i = list.length - 1; i > floor; i -= 1) {
        if (list[i] == 1) {
            right = i
        }
    }
    if (left == -1 && right == -1) {
        return -1
    }
    if (left == -1) {
        return right
    }
    if (right == -1) {
        return left
    }
    if (floor - left < right - floor) {
        return left
    }
    return right
}

function findClosestButtonUp(floor, list) {
    while (floor < list.length) {
        if (list[floor] == 1) {
            return floor
        }
        floor += 1;
    }
    return -1
}

function findClosestButtonDown(floor, list) {
    for (let i = floor; i > -1; i -= 1) {
        if (list[i] == 1) {
            return i
        }
    }
    return -1
}