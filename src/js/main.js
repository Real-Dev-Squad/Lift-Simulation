const liftCar = document.querySelector('.lift-car');
const upButton = document.querySelector('.up-btn');
const floorSectionContainer = document.querySelector('.main');
const floorSection = document.querySelector('.floor-section');
const formDialog = document.querySelector('.formDialog');
const inputForm = document.querySelector('.inputForm');
const dialogBtn = document.querySelector('.dialogBtn');
const showDialog = document.querySelector('.showDialog');
const numberOfFloors = document.querySelector('#floors').value;
const numberOfLifts = document.querySelector('#lifts').value;

formDialog.showModal();

showDialog.addEventListener('click', () => {
  floorSectionContainer.style.display = 'none';
  formDialog.showModal();
});

dialogBtn.addEventListener('click', () => {
  floorSectionContainer.style.display = 'block';
  renderFloorSection();
});

function renderFloorSection() {
  floorSectionContainer.innerHTML = '';
  for (let i = 0; i < numberOfFloors; i++) {
    const floorSectionCloned = floorSection.cloneNode(true);
    const floorCount = floorSectionCloned.querySelector('.floor-number');
    const elevatorCar = floorSectionCloned.querySelector('.lift-car ');

    if (i === 0) {
      elevatorCar.style.visibility = 'visible';
    }
    floorCount.textContent = `Floor ${i}`;
    floorSectionContainer.insertBefore(
      floorSectionCloned,
      floorSectionContainer.firstChild
    );
    floorSection.classList.remove('.floor-section');
  }
}

const handleUpBtnClick = () => {
  console.log('up btn clicked ');
  liftCar.classList.add('move');
};

// renderFloorSection()

upButton.addEventListener('click', handleUpBtnClick);
