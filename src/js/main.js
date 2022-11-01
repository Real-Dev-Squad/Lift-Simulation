let floors = [];
let lifts = [];
let floorsCalled = [];
let liftsAvailable = [];

const handleRunSimulation = () => {
  let container = document.getElementById('container');
  let inputSection = document.getElementById('input-section');
  let floorCount = +document.getElementById('floor').value;
  let liftCount = +document.getElementById('lift').value;

  container.innerHTML = '';
  floors = [];
  lifts = [];
  floorsCalled = [];
  liftsAvailable = [];

  for (let i = 0; i < floorCount; i++) {
    let floor = document.createElement('div');
    floor.id = `floor-${i}`;
    floor.className = 'floor';
    floor.style.width = 300 * liftCount + 'px';

    if (i != 0) {
      let upButton = document.createElement('button');
      upButton.className = 'btn';
      upButton.id = `floor-btn-${i}`;
      upButton.addEventListener('click', () => callLift(`${i}`));
      floor.appendChild(upButton);
      upButton.innerHTML = 'Up';
    }

    if (i != floorCount - 1) {
      let downButton = document.createElement('button');
      downButton.className = 'btn';
      downButton.id = `floor-btn-${i}`;
      downButton.addEventListener('click', () => callLift(`${i}`));
      downButton.innerHTML = 'Down';
      floor.appendChild(downButton);
    }

    container.appendChild(floor);
    floors.push(floor);
  }

  let offset = floors[floors.length - 1].offsetTop;
  let leftOffset = 130;
  for (let i = 0; i < liftCount; i++) {
    let lift = document.createElement('div');
    lift.className = 'lift';
    container.appendChild(lift);
    lift.style.top = offset + 'px';
    lift.style.left = leftOffset + 'px';
    leftOffset += 150;
    let door = document.createElement('div');
    door.className = 'door';
    lift.appendChild(door);
    lifts.unshift(lift);
  }

  for (let lift of lifts) {
    liftsAvailable.push(lift);
  }
};

const callLift = (floor) => {
  floorsCalled.push(floor);
  moveLift();
};

const delay = (miliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

const moveLift = () => {
  if (liftsAvailable.length === 0 || floorsCalled.length === 0) {
    return;
  }
  let doorAnimation = null;
  let lift = liftsAvailable.pop();
  let floor = floorsCalled.shift();
  let door = lift.childNodes[0];

  let liftPos = lift.offsetTop;
  let floorPos = floors[floor].offsetTop;
  let direction = liftPos > floorPos ? -1 : 1;

  const updateLiftPosition = () => {
    if (liftPos === floorPos) {
      clearInterval(animation);
      doorAnimation = setInterval(openDoor, 60);
    } else {
      liftPos += direction;
      lift.style.top = liftPos + 'px';
    }
  };

  const openDoor = () => {
    let doorPos = door.offsetLeft;
    let doorWidth = door.offsetWidth;
    if (doorPos == 0) {
      clearInterval(doorAnimation);
      doorAnimation = setInterval(closeDoor, 60);
    } else {
      doorPos -= 1;
      doorWidth += 2;
      door.style.left = doorPos + 'px';
      door.style.width = doorWidth + 'px';
    }
  };

  const closeDoor = () => {
    let doorPos = door.offsetLeft;
    let doorWidth = door.offsetWidth;
    if (doorPos == 49) {
      clearInterval(doorAnimation);
      liftsAvailable.push(lift);
    } else {
      doorPos += 1;
      doorWidth -= 2;
      door.style.left = doorPos + 'px';
      door.style.width = doorWidth + 'px';
    }
  };
  let animation = setInterval(updateLiftPosition, 20);
};
