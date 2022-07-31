const floors = document.querySelector('.floors');
const addFloorbtn = document.querySelector('.navbar__add-floor');

const createFloor = () => {
  const floorContainer = document.createElement('div');
  const floorActionsContainer = document.createElement('div');
  const floorLiftsContainer = document.createElement('div');
  const callLiftUpBtn = document.createElement('button');
  const callLiftDownBtn = document.createElement('button');
  floorContainer.classList.add('floor');
  floorActionsContainer.classList.add('floor__actions');
  floorLiftsContainer.classList.add('floor__lifts');
  callLiftDownBtn.classList.add('floor__call-lift-down');
  callLiftUpBtn.classList.add('floor__call-lift-up');
  callLiftDownBtn.textContent = 'Down';
  callLiftUpBtn.textContent = 'Up';
  floorContainer.appendChild(floorActionsContainer);
  floorContainer.appendChild(floorLiftsContainer);
  floorActionsContainer.appendChild(callLiftUpBtn);
  floorActionsContainer.appendChild(callLiftDownBtn);

  return floorContainer;
};

const addNewFloor = () => {
  const createdFloor = createFloor();
  floors.insertAdjacentElement('afterbegin', createdFloor);
};

addFloorbtn.addEventListener('click', addNewFloor);
