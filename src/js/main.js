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
                <div id="liftSection"></div>
            </div>
                <div class="hrfloorName">
                    <hr>
                <span>Floor ${i}</span>
            </div>
            `

        document.querySelector(".secondPage").appendChild(floordiv)
    }

    let mainLift = document.createElement('div')
    mainLift.className = 'mainLift'

    for (let j = 1; j <= liftInput; j++) {
        mainLift.innerHTML += `
    <div class="lift" id="lift${j}" flag="free">
        <div class="gates" id="gates">
            <div class="gate1"></div>
            <div class="gate2"></div>
        </div>
    <div>
    `
    }



    let allFloors = document.querySelectorAll(".mainLift")
    document.querySelectorAll("#liftSection")[floorInput - 1].appendChild(mainLift)
    document.querySelector("#down1").style.display = "none"
    document.querySelector(`#up${floorInput}`).style.display = "none"

    const upButtons = document.querySelectorAll(".up")
    const downButtons = document.querySelectorAll(".down")
    const allLifts = document.querySelectorAll(".lift")

    let currentFloor = new Array(allLifts.length).fill(1)

    console.log(allFloors)

    upButtons.forEach((upbtn, i) => {
        let floorValue = upButtons.length - i;
        upbtn.addEventListener("click", (event) => {
            event.preventDefault()
            // console.log(allFloors[floorInput - currentFloor[0]])
            for (let j = 0; j < allLifts.length; j++) {
                if (allLifts[j].getAttribute('flag') == "free") {
                    moveLift(allLifts[j], allFloors[floorInput - currentFloor[j]], allFloors[floorInput - floorValue],)
                    break
                }
            }
        })
    })

}


function moveLift(lift, currentFloor, destinationFloor) {
    // currentFloor.removeChild(lift);
console.log(lift, currentFloor, destinationFloor)
}