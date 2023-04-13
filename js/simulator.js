import { onLiftRequest } from "./controls.js";
import { LIFT_DIRECTION, LIFT_STATUS, FLOOR_HEIGHT } from "./helpers.js";

const searchParams = new URLSearchParams(window.location.search);

const floors = Number(searchParams.get("floors"));
const lifts = Number(searchParams.get("lifts"));

if (!floors || !lifts) location.href = "/";

const header = document.getElementById("header");
header.innerText = `Floors: ${floors} Lifts: ${lifts}`;

const app = document.getElementById("simulator");
app.style.gridTemplateRows = `repeat(${floors},${FLOOR_HEIGHT}px)`;

// ---------------------------- ON INITIAL LOAD -----------------------------------------
// GENERATE FLOORS
for (let i = floors; i > 0; i--) {
  const floor = document.createElement("section");
  floor.classList.add("floor");
  floor.dataset.floorNo = String(i); // data-* the value of data attributes must be string.

  // adding Controls to Floor View (Up,down Btn)
  const btnGoUp = document.createElement("button");
  btnGoUp.onclick = () => onLiftRequest(i, LIFT_DIRECTION.UP);
  btnGoUp.type = "button";
  btnGoUp.innerText = LIFT_DIRECTION.UP;

  const btnGoDown = document.createElement("button");
  btnGoDown.onclick = () => onLiftRequest(i, LIFT_DIRECTION.BOTTOM);
  btnGoDown.type = "button";
  btnGoDown.innerText = LIFT_DIRECTION.BOTTOM;

  const floorControlWrap = document.createElement("div");
  floorControlWrap.classList.add("controls");

  const displayFloorNo = document.createElement("h3");
  displayFloorNo.classList.add("floor_no");
  displayFloorNo.innerText = `${i}.`;

  // don't show up and down btn's on top and ground floor.
  switch (i) {
    case floors: {
      floorControlWrap.append(displayFloorNo, btnGoDown);
      break;
    }
    case 1: {
      floorControlWrap.append(btnGoUp, displayFloorNo);
      break;
    }
    default:
      floorControlWrap.append(btnGoUp, displayFloorNo, btnGoDown);
  }

  floor.append(floorControlWrap);

  // initially place all lifts at bottom floor
  if (i === 1) {
    // 1st floor
    for (let j = 1; j <= lifts; j++) {
      const lift = document.createElement("area");
      lift.classList.add("lift");
      lift.dataset.lift_no = `${j}`;
      lift.dataset.pos = `${i}`;
      lift.dataset.status = LIFT_STATUS.AVAILABLE;
      lift.dataset.floorsQueue = "";
      lift.dataset.direction = "";

      lift.innerHTML = `<div class="door left"></div><div class="door right"></div>
      `;
      floor.appendChild(lift);
    }
  }
  app.appendChild(floor);
}
