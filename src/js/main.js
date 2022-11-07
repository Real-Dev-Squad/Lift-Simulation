let totalfloors;
let totallifts;
let liftArray = [];
let floorArray = [];
let map = new Map();
let floorMap = new Map();
let obj = {};
document.addEventListener("DOMContentLoaded", () => {
  const floorValue = document.querySelector("#floor-input");
  const liftValue = document.querySelector("#lift-input");
  const inputBox = document.querySelectorAll("input");
  // console.log(inputBox);
  // const inputBox = document.querySelector("input");
  // console.log(inputBox);
  // inputBox.addEventListener("keyup", () => {});

  for (let i = 0; i < inputBox.length; i++) {
    inputBox[i].addEventListener("keyup", () => {
      //   console.log(typeof floorValue, floorValue);
      //   console.log(typeof liftValue, liftValue);
      if (floorValue.value && liftValue.value) {
        let totalFloorvalue = Number(floorValue.value);
        let totalliftvalue = Number(liftValue.value);
        var x = window.matchMedia("(max-width: 750px)");
        if (x.matches) {
          console.log("width <750");
          if (totalFloorvalue < 50 && totalliftvalue < 6) {
            document.querySelector(".confirm-btn").removeAttribute("disabled");
          }
          if (totalFloorvalue < 0 && totalliftvalue < 0) {
            alert("negative number is not allowed");
          }
        } else {
          // console.log("width>750");
          if (totalFloorvalue < 50 && totalliftvalue < 11) {
            document.querySelector(".confirm-btn").removeAttribute("disabled");
          }
          if (totalFloorvalue < 0 && totalliftvalue < 0) {
            alert("negative number is not allowed");
          }
        }
      }
    });
  }

  const confirmbtn = document.querySelector(".confirm-btn");
  confirmbtn.addEventListener("click", (e) => {
    // console.log("inserted btn");
    generateBtn();
  });
});
// const section = document.querySelector(".container");
//check the input

function generateBtn() {
  // e.preventDefault();
  const floorValue = document.querySelector("#floor-input");
  const liftValue = document.querySelector("#lift-input");
  const inputBox = document.querySelector("input");
  // console.log(inputBox);
  inputBox.addEventListener("keyup", () => {});
  if (floorValue.value && liftValue.value) {
    totalfloors = Number(floorValue.value);
    totallifts = Number(liftValue.value);
  }

  // if (totalfloors > 16 && totallifts > 8) {
  //   document.querySelector(".confirm-btn").removeAttribute("disabled");
  // }
  // if (totalfloors < 0 && totallifts < 0) {
  //   alert("negative number is not allowed");
  // }
  // console.log(typeof totalfloors, totalfloors);
  // console.log(typeof totallifts, totallifts);

  // else {
  //   alert("please enter floors & lifts");
  // }

  floorMaking();
  liftMaking();
  liftMovement();
  let inputCheck = document.querySelector(".input-values");
  if (floorValue.value && liftValue.value) {
    inputCheck.classList.add("hidden");
  }
}

function floorMaking() {
  const floorContainer = document.querySelector(".floors-container");
  // console.log(totalfloors);
  for (let i = 0; i < totalfloors; i++) {
    var rowfloor = document.createElement("section");
    rowfloor.setAttribute("class", "floor");
    // console.log(rowfloor);
    floorContainer.append(rowfloor);
    const floors = ` <div class="floor-no-${i} floor-common">
    <div class="btn-floor ">
    <h1>Floor-${i}</h1>
    <button class="call-btn" id="${i}">Call</button>
    </div>
</div>
    `;
    floorMap.set(`floor-${i}`);
    rowfloor.innerHTML = floors;
    floorContainer.append(rowfloor);
  }
  //   console.log(floorMap);
}

function liftMaking() {
  let liftContainer = document.querySelector(".floor");
  for (let i = 0; i < totallifts; i++) {
    var liftSection = document.createElement("div");
    liftSection.setAttribute("class", "lift");
    liftContainer.append(liftSection);
    const lifts = `<div class="left-door"></div>
    <div class="right-door "></div>
    `;
    liftSection.id = `lift-${i}`;

    liftArray.push(`lift-${i}`);
    map.set(`lift-${i}`, true);

    liftSection.innerHTML = lifts;
    const groundFloor = document.querySelector(".floor-no-0");
    groundFloor.append(liftSection);
  }
  //   console.log(liftArray);
  //   console.log(map);
}

function liftMovement() {
  const liftBtn = document.querySelectorAll(".call-btn");
  liftBtn.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const floorId = parseInt(e.target.id);
      //   console.log(floorId);

      // console.log("lift btn pressed");
      e.target.setAttribute("disabled", "disabled");
      setTimeout(() => {
        e.target.removeAttribute("disabled");
      }, 2500 + 1000 * 5);
      if (floorMap.get(`floor-${floorId}`)) {
        doorMovement(floorMap.get(`floor-${floorId}`));
      } else {
        getFreeLift(floorId);
      }

      once: true;
      // console.log(liftId);
      // map.set(liftId, false);
    });
  });
}

function movingLift(liftId, floorId) {
  const mainArea = document.querySelector(".floors-container");
  let height = mainArea.offsetHeight;
  // console.log(height);

  const floorHeight = height / totalfloors;
  const randomFloor = document.querySelector(".floor");
  const spacing = parseInt(
    getComputedStyle(randomFloor).marginTop.slice(0, -2)
  );

  const liftMove = document.querySelector(`#${liftId}`);

  liftMove.style.transform = `translateY(-${floorHeight * floorId}px)`;
//   console.log(floorId);
//   console.log(floorHeight);
//   console.log(floorHeight * floorId);
  liftMove.style.transition = `all  ${
    Math.abs(floorHeight / 158.5) * 5.5
  }s linear`;
  liftMove.addEventListener("transitionend", () => doorMovement(liftId), {
    once: true,
  });
}

function doorMovement(liftId) {
  const liftMove = document.querySelector(`#${liftId}`);
  let liftLeftmove = liftMove.querySelector(".left-door");
  let liftRightmove = liftMove.querySelector(".right-door");

  liftLeftmove.classList.add("left-move-open");
  liftRightmove.classList.add("right-move-open");
  setTimeout(() => {
    liftLeftmove.classList.add("left-move-close");
    liftRightmove.classList.add("right-move-close");
    liftLeftmove.classList.remove("left-move-open");
    liftRightmove.classList.remove("right-move-open");
  }, 2500 + 1000);
  setTimeout(() => {
    liftLeftmove.classList.remove("left-move-close");
    liftRightmove.classList.remove("right-move-close");
    map.set(liftId, true);
    if (floorArray.length > 0) {
      for (const [key, value] of floorMap.entries()) {
        if (value === liftId) {
          floorMap.set(key, undefined);
        }
      }
      floorMap.set(`floor-${floorArray[0]}`, liftId);
      movingLift(liftId, floorArray[0]);
      floorArray.shift();
    }
  }, 2500 * 4);
}

function getFreeLift(floorId) {
  let notFound = true;
  for (const liftId of liftArray) {
    if (map.get(liftId)) {
      //   console.log(liftId);
      notFound = false;
      map.set(liftId, false);
      for (const [key, value] of floorMap.entries()) {
        if (value === liftId) {
          floorMap.set(key, undefined);
        }
      }
      floorMap.set(`floor-${floorId}`, liftId);
      movingLift(liftId, floorId);
      return;
    }
  }
  floorArray.push(floorId);
  //   console.log(floorArray);
}
// map vlaues of true and false
// timing of lifts
