let removeLiftBtn = document.querySelector('.remove_lift');
let addLiftBtn = document.querySelector('.add_lift');
let removeFloorBtn = document.querySelector('.remove_floor');
let addFloorBtn = document.querySelector('.add_floor');
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

  newLift.innerHTML = `
      <div class="door"></div>
      <div class="door"></div>`;

  lastLift.after(newLift);
});

const main = document.querySelector('.main');

addFloorBtn.addEventListener('click', () => {
  let newFloor = document.createElement('div');
  main.before(newFloor);
  newFloor.classList.add('floor_container');
  newFloor.innerHTML = `<div class="arrow_container">
  <i class="fa-solid fa-circle-chevron-up fa-2xl"></i>
  <i class="fa-solid fa-circle-chevron-down fa-2xl"></i>
</div>`;
  numberOfFloors++;
});

removeFloorBtn.addEventListener('click', () => {
  if (numberOfFloors == 1) return;
  let floors = document.querySelectorAll('.floor_container');
  let lastFloor = floors[0];

  lastFloor.remove();
  numberOfFloors--;
});
