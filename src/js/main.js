let simulate = document.querySelector('.createLiftFloorButton');



simulate.addEventListener('click', e => {
    e.preventDefault();
    const floorInputValue = document.getElementById('floorNumber').value;
    const liftInputValue = document.getElementById('liftNumber').value;
    console.log(floorInputValue, liftInputValue)

    if (floorInputValue == "" || liftInputValue == "") {
        alert('please enter the value')
    }

    if (floorInputValue == "0" || liftInputValue == "0") {
        alert('please enter the value')
    }
    else {
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        makingFloor()
    }
}
)


function makingFloor() {

    let floorInput = document.querySelector('#floorNumber').value
    let liftInput = document.querySelector('#liftNumber').value

    for (let i = floorInput; i > 0; i--) {

        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        floordiv.innerHTML = `
            <div class="buttonLift">
                <div class="button">
                    <button class="up" id="up${i}">Up</button>
                    <button class="down" id="down${i}">Down</button>
                </div>
                <div class ="mainLift"></div>
            </div>
                <div class="hrfloorName">
                    <hr>
                <span>Floor ${i}</span>
            </div>
            `

        document.querySelector(".secondPage").appendChild(floordiv)
    }

    let mainLift = document.querySelectorAll('.mainLift')

    for (let j = 1; j <= liftInput; j++) {
        mainLift[floorInput - 1].innerHTML += `
    <div class="lift" id="lift${j}" flag="free">
        <div class="gates" id="gates">
            <div class="gate1"></div>
            <div class="gate2"></div>
        </div>
    <div>
    `
    }



    let allFloors = document.querySelectorAll(".mainLift")
    document.querySelector("#down1").style.display = "none"
    document.querySelector(`#up${floorInput}`).style.display = "none"

    const upButtons = document.querySelectorAll(".up")
    const downButtons = document.querySelectorAll(".down")
    const allLifts = document.querySelectorAll(".lift")

    let currentFloor = new Array(allLifts.length).fill(1)



    upButtons.forEach((upbtn, i) => {
        let floorValue = upButtons.length - i;
        upbtn.addEventListener("click", (event) => {
            event.preventDefault()
            distanceCalculator(currentFloor, floorValue).every((liftNo, i) => {
                if (allLifts[liftNo].getAttribute('flag') == "free") {
                    allLifts[liftNo].setAttribute('flag', "busy")
                    // moveLift(allLifts[liftNo], allFloors[floorInput - currentFloor[liftNo]], allFloors[floorInput - floorValue],)
                    moveLift(allLifts[liftNo], floorValue, currentFloor[liftNo])
                    currentFloor[liftNo] = floorValue
                    return false
                } else return true
            })
        })
    })

    downButtons.forEach((downbtn, i) => {
        let floorValue = downButtons.length - i;
        downbtn.addEventListener("click", (event) => {
            distanceCalculator(currentFloor, floorValue).every((liftNo, i) => {
                if (allLifts[liftNo].getAttribute('flag') == "free") {
                    allLifts[liftNo].setAttribute('flag', "busy")
                    // moveLift(allLifts[liftNo], allFloors[floorInput - currentFloor[liftNo]], allFloors[floorInput - floorValue],)
                    moveLift(allLifts[liftNo], floorValue, currentFloor[liftNo])
                    currentFloor[liftNo] = floorValue
                    return false
                } else return true
            })
        })
    })

}
function distanceCalculator(liftsPositionArray, destinationFloor) {
    let liftDisatnce = [...liftsPositionArray].map((position, i) => {
        return { distance: Math.abs(position - destinationFloor), index: i }
    })
    return liftDisatnce.sort((a, b) => a.distance - b.distance).map((e) => e.index)
}

function moveLift(lift, destinationFloor, currentFloor) {
    lift.style.transform = `translateY(${-95 * (destinationFloor - 1)}px)`;
    let prev = `${2 * Math.abs(destinationFloor - currentFloor)}s`
    lift.style.transitionDuration = prev;

    setTimeout(() => {
        openCloseGates(lift);
        setTimeout(() => {
            lift.setAttribute('flag', 'free')
        }, 5500);
        console.log(lift.getAttribute('flag'))
    }, 2 * Math.abs(destinationFloor - currentFloor) * 1000)
}

function openCloseGates(lift) {
    let gates = lift.children[0].children
    console.log(gates[0])
    setTimeout(() => {
        gates[0].style.width = '3px';
        gates[1].style.width = '3px';
    }, 1000)

    setTimeout(() => {
        gates[0].style.width = '25px';
        gates[1].style.width = '25px';
    }, 3500)

}