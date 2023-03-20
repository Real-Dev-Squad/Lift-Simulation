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

      lift.innerHTML = ` <svg width="100%" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 19V5c0-1.1-.9-2-2-2h-5.25v16h-1.5V3H6c-1.1 0-2 .9-2 2v14H3v2h18v-2h-1zm-10-6H8v-2h2v2zm6 0h-2v-2h2v2z"></path></svg> <h4 class="lift_no">${j}</h4>`;
      floor.appendChild(lift);
    }
  }
  app.appendChild(floor);
}
