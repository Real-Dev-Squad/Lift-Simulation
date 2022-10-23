const handleRunSimulation = () => {
  let floorCount = document.getElementById('floor').value;
  let liftCount = document.getElementById('lift').value;
  let floorContainer = document.getElementById('floor-section');

  let liftPosition = 0;

  const createFloors = () => {
    for (let i = floorCount; i > 0; i--) {
      let downBtn = document.createElement('button');
      downBtn.innerText = 'Down';
      let upBtn = document.createElement('button');
      upBtn.innerText = 'Up';
      upBtn.className = 'up-down-btn';
      upBtn.addEventListener('click', () => callLift(`${i}`));
      downBtn.addEventListener('click', () => callLift(`${i}`));
      downBtn.className = 'up-down-btn';
      let floor = document.createElement('div');
      floor.innerText = 'Floor' + ' ' + i;
      floor.className = 'floor-item';
      let liftContainer = document.createElement('div');

      document.getElementById('floor-section').appendChild(floor);
      liftContainer.id = 'lift-container';
      liftContainer.className = 'lift-container';
      floor.appendChild(liftContainer);
      if (i === floorCount) {
        floor.appendChild(downBtn);
      } else if (i === 1) {
        floor.appendChild(upBtn);
      } else {
        floor.appendChild(upBtn);
        floor.appendChild(downBtn);
      }
    }
  };

  const createLifts = () => {
    for (let i = 0; i < liftCount; i++) {
      let displayLift = document.createElement('div');
      displayLift.className = 'lift';
      liftPosition = floorCount - 1;
      floorContainer.childNodes[liftPosition].childNodes[1].appendChild(
        displayLift
      );
    }
  };

  createFloors();

  createLifts();

  const callLift = (floor) => {
    liftPosition = floor;
  };
};
