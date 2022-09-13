// let numberOfLifts = 0;
// let numberOfFloors = 0;
// let addLift = document.querySelector('#addLift');
// let subtractLift = document.querySelector('#subtractLift');
// let addFloor = document.querySelector('#addFloor');
// let subtractFloor = document.querySelector('#subtractFloor');

// addLift.addEventListener('click', function () {
//   console.log('add called');

//   let liftNumber = document.querySelector('#liftNumber');
//   let result = Number(liftNumber.innerText) + 1;
//   numberOfLifts = numberOfLifts+1;
//   liftNumber.innerText = result;
// });

// subtractLift.addEventListener('click', function () {
//   console.log('subtract called');
//   let liftNumber = document.querySelector('#liftNumber');
//   let result = Number(liftNumber.innerText) - 1;
//   numberOfLifts--;
//   if (result < 0) result = 0;
//   liftNumber.innerText = result;
// });

// addFloor.addEventListener('click', function () {
//   console.log('add called');

//   let floorNumber = document.querySelector('#floorNumber');
//   let result = Number(floorNumber.innerText) + 1;
//   floorNumber.innerText = result;
// });

// subtractFloor.addEventListener('click', function () {
//   console.log('subtract called');
//   let floorNumber = document.querySelector('#floorNumber');
//   let result = Number(floorNumber.innerText) - 1;

//   if (result < 0) result = 0;
//   floorNumber.innerText = result;
// });

// function addALift(numberOfLifts) {
//   for (let i = 0; i < numberOfLifts; i++) {}
// }

const numberOfFloors = document.getElementById('floors');
const numberOfLifts = document.getElementById('lifts');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', function () {
  result.innerHTML = createFloor(numberOfFloors.value);
});

function createFloor(numberOfFloors) {
  let createdFloors = ``;
  for (let i = numberOfFloors - 1; i >= 0; i--) {
    createdFloors += `<div class='floorcontainer' data-floorContainer="${i}"><div class="wrapper">
        
                <div class="lift-btns">
                    <button class="move btn-up" data-floor="${i}">DOWN</button>
                </div>

                <div class="lift-container">
                ${i === 0 ? createLift(numberOfLifts.value) : ''}
                </div>
            </div>

            <div class="floor">
                <div class="floor-line"></div>
                <div class="floor-num-text">
                    Floor:<span class="floor-num">${i}</span>
                </div>
            </div>
        </div>`;
  }
  return createdFloors;
}

function createLift(numberOfLifts) {
  let createdLifts = ``;
  for (let i = 0; i < numberOfLifts; i++) {
    createdLifts += `<div class="lift" data-liftposition="${i}">
        <div class="left-door"></div>
        <div class="right-door"></div>
      </div>`;
  }
  return createdLifts;
}

let currentFloor = 0

addEventListener('click', (e) => {
    if(e.target.classList.contains('move')){
        if(e.target.dataset.floor == currentFloor){
            return;
        } else {
            checkStatus(e.target.dataset.floor);
        }
        currentFloor = e.target.dataset.floor;
    }
})

function checkStatus(targetFloor){
    const lifts = Array.from(document.getElementsByClassName('lift'));
    for(const lift of lifts){
        if(!lift.classList.contains('busy')){
            startLift(targetFloor, lift);
            return;
        }
    }
}

function startLift(targetFloor, free) {
    const currentPosition = free.dataset.liftposition;
    const time = Math.abs(targetFloor - currentPosition);
    free.style.transition = `transform ${time * 2}s linear`;
    free.style.transform = `translateY(${-130 * targetFloor}px)`;
    free.classList.add("busy");
    free.dataset.liftposition = targetFloor;
    setTimeout(() => {
      free.children[0].classList.add("move-left");
      free.children[1].classList.add("move-right");
    }, time * 2000 + 1000);
    setTimeout(() => {
      free.children[0].classList.remove("move-left");
      free.children[1].classList.remove("move-right");
    }, time * 2000 + 4000);
  
    setTimeout(() => {
      free.classList.remove("busy");
    }, time * 2000 + 6000);
  }
