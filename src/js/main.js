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
        <p>${j}</p>
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
            // console.log(allFloors[floorInput - currentFloor[0]])
            for (let j = 0; j < allLifts.length; j++) {
                if (allLifts[j].getAttribute('flag') == "free"  & distanceCalculator(currentFloor, floorValue) == j) {
                    allLifts[j].setAttribute('flag', "busy")
                    moveLift(allLifts[j], allFloors[floorInput - currentFloor[j]], allFloors[floorInput - floorValue],)
                    currentFloor[j] = floorValue
                    console.log(currentFloor)
                    break
                }
            }
        })
    })

    downButtons.forEach((downbtn, i) => {
        let floorValue = downButtons.length - i;
        downbtn.addEventListener("click", (event) => {
            event.preventDefault()
            // console.log(allFloors[floorInput - currentFloor[0]])
            for (let j = 0; j < allLifts.length; j++ & distanceCalculator(currentFloor, floorValue) == j) {
                if (allLifts[j].getAttribute('flag') == "free") {
                    allLifts[j].setAttribute('flag', "busy")
                    moveLift(allLifts[j], allFloors[floorInput - currentFloor[j]], allFloors[floorInput - floorValue],)
                    currentFloor[j] = floorValue
                    break
                }

            }
        })
    })

}
function distanceCalculator(liftsPositionArray, destinationFloor) {
    let liftDisatnce = [...liftsPositionArray].map((position) => {
        return Math.abs(position - destinationFloor)
    })
    return liftDisatnce.indexOf(Math.min(...liftDisatnce))
}

function moveLift(lift, currentFloor, destinationFloor) {
    setTimeout(() => {
        currentFloor.removeChild(lift);
        setTimeout(() => {
            destinationFloor.appendChild(lift)
            lift.setAttribute('flag', "free")

        }, 2000)

    }, 2000);
    console.log(lift, currentFloor, destinationFloor)
}