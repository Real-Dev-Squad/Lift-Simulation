const removeLiftBtn = document.querySelector('.remove_lift');
const addLiftBtn = document.querySelector('.add_lift');
const removeFloorBtn = document.querySelector('.remove_floor');
const addFloorBtn = document.querySelector('.add_floor');
const downArrow = document.querySelector('.down');
const generatedFloors = document.querySelector('.main').childNodes;

let numberOfLifts = 1;
let numberOfFloors = 1;

removeLiftBtn.addEventListener('click', () => {
  if (numberOfLifts == 1) return;
  let lifts = document.querySelectorAll('.lift');

  let lastLift = lifts[lifts.length - 1];

  lastLift.remove();
  numberOfLifts--;
});

addLiftBtn.addEventListener('click', () => {
  let width = window.innerWidth;
  if (width < 769 && numberOfLifts >= (width - 80) / 70) return;
  if (width >= 769 && numberOfLifts >= (width - 80) / 70) return;
  numberOfLifts++;
  let lifts = document.querySelectorAll('.lift');
  let lastLift = lifts[lifts.length - 1];

  let newLift = document.createElement('div');
  newLift.classList.add('lift');
  newLift.setAttribute('data-pos', 0);
  newLift.setAttribute('data-state', 'free');
  newLift.innerHTML = `
  <div class="door"></div>
  <div class="door"></div>`;

  lastLift.after(newLift);
});

const main = document.querySelector('.main');
function doorsAnimation(liftDoorsArr, floorNum, movingLift) {
  setTimeout(() => {
    // movingLift.childNodes
    liftDoorsArr[0].style.width = `0`;
    liftDoorsArr[0].style.transition = `all ease-in-out 2.5s`;
    liftDoorsArr[1].style.width = `0`;
    liftDoorsArr[1].style.transition = `all ease-in-out 2.5s`;

    // console.log('movingLift.childNodes', )
  }, 1000 * floorNum * 2);

  setTimeout(() => {
    liftDoorsArr[0].style.width = `25px`;
    liftDoorsArr[0].style.transition = `all ease-in-out 2.5s`;
    liftDoorsArr[1].style.width = `25px`;
    liftDoorsArr[1].style.transition = `all ease-in-out 2.5s`;
    // console.log('doors started closing in ', 2500 * floorNum * 2, 'ms');
  }, 1000 * floorNum * 2 + 2500);

  setTimeout(() => {
    movingLift.setAttribute('data-state', 'free');
    // console.log('free lift in ', 6000 * floorNum * 2, 'ms');
  }, 1000 * floorNum * 2 + 5000);
}

function checkForExistingLift(liftsArr, floorNum) {
  let existingLift = liftsArr.find(
    (lift) => Number(lift.dataset.pos) == floorNum
  );
  return existingLift;
}

const moveLiftTo = (floorNum) => {
  const lifts = document.querySelector('.lift_container').childNodes;
  const liftsArr = Array.from(lifts);
  liftsArr.pop();
  liftsArr.shift();
  const existingLift = checkForExistingLift(liftsArr, floorNum);
  if (existingLift) {
    let existingLiftDoorsArr = existingLift.querySelectorAll('.door');
    doorsAnimation(existingLiftDoorsArr, floorNum, existingLift);
  } else {
    const freeLiftsArr = liftsArr.filter(
      (lift) => lift.dataset.state === 'free'
    );
    /* Logic for sorting the freed lifts will go here */
    // const sortedFreeLifts = getSortedFreeLifts(freeLiftsArr, floorNum);
    // const movingLift = sortedFreeLifts[0];

    const movingLift = freeLiftsArr[0];
    movingLift.setAttribute('data-state', 'busy');
    let distance = floorNum * 110;
    movingLift.style.transform = `translateY(-${distance + floorNum * 2}px)`;
    movingLift.style.transition = `transform 2s ease-in`;
    movingLift.setAttribute('data-pos', floorNum);
    let liftDoorsArr = movingLift.querySelectorAll('.door');
    doorsAnimation(liftDoorsArr, floorNum, movingLift);
  }
};

addFloorBtn.addEventListener('click', () => {
  let newFloor = document.createElement('div');
  main.prepend(newFloor);
  newFloor.classList.add('floor_container');
  newFloor.setAttribute('data-floorNum', numberOfFloors);
  newFloor.innerHTML = `<div class="arrow_container">
  <i class="fa-solid fa-circle-chevron-up fa-2xl up"></i>
  <i class="fa-solid fa-circle-chevron-down fa-2xl down"></i>
</div>`;
  let floorReqNum = newFloor.getAttribute('data-floorNum');
  const singleUpArrowBtn = document.querySelector('.up');
  const singleDownArrowBtn = document.querySelector('.down');
  singleUpArrowBtn.addEventListener('click', () => moveLiftTo(floorReqNum));
  singleDownArrowBtn.addEventListener('click', () => moveLiftTo(floorReqNum));
  numberOfFloors++;
});

removeFloorBtn.addEventListener('click', () => {
  if (numberOfFloors == 1) return;
  let floors = document.querySelectorAll('.floor_container');
  const lifts = document.querySelector('.lift_container').childNodes;
  const liftsArr = Array.from(lifts);
  liftsArr.pop();
  liftsArr.shift();
  let lastFloor = floors[0];
  lastFloor.remove();
  numberOfFloors--;
});

// const lifts2 = lifts.querySelectorAll('.lift');
// const liftsArr = Array.from(lifts2);
// console.log('liftsArr,lifts2', liftsArr,lifts2);
