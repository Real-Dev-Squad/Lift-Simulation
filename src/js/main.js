const liftCar = document.querySelector('.lift-car')
const upButton  = document.querySelector('.up-btn');

const floorSectionContainer = document.querySelector('.main')
const floorSection = document.querySelector('.floor-section')
const sectionCount = 3;


const renderFloorSection = () => {
    floorSectionContainer.innerHTML = '';
    for (let i = 0; i < sectionCount; i++) {
        const floorSectionCloned = floorSection.cloneNode(true)
        const floorCount = floorSectionCloned.querySelector('.floor-number')

        floorCount.textContent = `Floor ${i}`
        floorSectionContainer.insertBefore(floorSectionCloned, floorSectionContainer.firstChild)
        floorSection.classList.remove('.floor-section')
    }
}



const handleUpBtnClick = () => {
    console.log('up btn clicked ')
    liftCar.classList.add('move')
}

// renderFloorSection()



upButton.addEventListener('click', handleUpBtnClick)
