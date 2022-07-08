//get floor number
const floorNumber = parseInt(e.target.dataset.floor);
let heightFromGroundFloor = getFloorsHeightForUp(floorNumber);

const nearestLift = getNearestLift(floorNumber);
console.log(nearestLift);
//lift number and current floor of first lift in the queue
const currentLiftNumber = nearestLift;
const { currentFloor } = nearestLift;
console.log(nearestLift);
console.log(`current floor -> ${currentFloor} `);

//Getting lift node of targeted lift
const lift = allLifts[currentLiftNumber - 1];

console.log(lift);
const transitionTime = (floorNumber - currentFloor) * 2;
console.log(transitionTime, "seconds");
if (e.target.matches(".btn-up")) {
  // console.log(lift.dataset.liftnum);
  lift.style.transform = `translateY(${-parseInt(heightFromGroundFloor)}px)`;
  lift.style.transitionDuration = `${transitionTime}s`;
  setLiftToMoving(transitionTime, floorNumber);
}
if (e.target.matches(".btn-down")) {
  lift.style.transform = `translateY(${-parseInt(heightFromGroundFloor)}px)`;
  // const transitionTime = (floorNumber - currentFloor) * 2;
  lift.style.transitionDuration = `${transitionTime}s`;
  setLiftToMoving(transitionTime, floorNumber);
}
