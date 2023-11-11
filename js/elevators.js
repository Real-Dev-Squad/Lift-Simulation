// Function to get query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    floors: params.get("floors"),
    elevators: params.get("elevators"),
  };
}

// Get query parameters
const { floors, elevators } = getQueryParams();

// Initialize a variable to keep track of the last floor with a lift image
let lastLiftFloor = null;

// Display the values
document.getElementById(
  "floorsDisplay"
).textContent = `Number of Floors: ${floors}`;
document.getElementById(
  "elevatorsDisplay"
).textContent = `Number of Elevators Needed: ${elevators}`;

// Select the container where you want to generate the floors
const buildingContainer = document.getElementById("building");

var liftStates = {};
for(let i=1; i<=elevators; i++) {
  liftStates[`lift_${i}`] = 1;
}

const dataStore = {
  username:"creator",
  no_of_floor: floors,
  no_of_elevators: elevators,
  state_of_lifts: liftStates,
};

var liftNumber = 1;

var divFloor = 0;

// Function to generate a floor with an image
function generateFloor(floorNumber, imageSource) {
  // Create a <div> element for the floor
  const floor = document.createElement("div");
  floor.className = "floor"; // You can add CSS classes for styling

  // Create a <div> element for the floor
  const floorImages = document.createElement("div");

  floorImages.className = "floor-images"; // You can add CSS classes for styling

  // Add an <img> element to the floor
  const directionImage = document.createElement("img");
  directionImage.src = "/images/up-down.png"; // Provide the URL to your PNG image

  directionImage.className = "direction-image";

  //experiment code to add lift on a certain floor
  directionImage.addEventListener("click", (event) => {
    //getting the current floor id
    const currFloorId = event.target.parentNode.id;
    // console.log("current floorId: ", currFloorId);

    // Get the div element by its ID (you can use any other method to select the div)
    var selectedFloorImagesDiv = document
      .getElementById(`${currFloorId}`)
      .querySelector(".floor-images");
    // console.log("parent div", selectedFloorImagesDiv.children);
    var LiftImage = document.getElementById(`liftImage${liftNumber}`);
    // console.log(LiftImage.querySelector('#leftDoor'))
    const liftColumn = selectedFloorImagesDiv.children[liftNumber - 1];
    const lastFloor = LiftImage.getAttribute("floordetail");
    // console.log("last Floor = ", lastFloor);

    var animationTime = Math.abs(floorNumber - lastFloor) * 2;
    // console.log(animationTime);

    LiftImage.setAttribute("floorDetail", `${floorNumber}`); // Adding a custom attribute
    const liftcurrfloornumber = LiftImage.getAttribute('floordetail');
    const liftcurridnumber = LiftImage.getAttribute('liftid');
    // console.log(LiftImage.getAttribute('floordetail'));
    // console.log(LiftImage.getAttribute('liftid'))
    //updating datastore for updated lift information
    dataStore.state_of_lifts[`lift_${liftcurridnumber}`] = liftcurrfloornumber;
    // console.log("updated datastore = ", dataStore);
    // LiftImage.classList.add("transition-animation");
    LiftImage.style.transition = `ease-in ${animationTime}s`;
    // setTimeout(()=>{}, animationTime*1000)
    // console.log(liftColumn);
    liftNumber += 1;
    if (liftNumber > elevators) {
      liftNumber = 1;
    }
    // console.log("liftImage = " ,  firstLiftImage);
    // console.log("liftNumber = ", liftNumber)

    // var howTop = 0;

    // const left = liftColumn.offsetLeft;
    const top = liftColumn.offsetTop;

    const leftDoor = LiftImage.querySelector('#leftDoor');
    const rightDoor = LiftImage.querySelector('#rightDoor');

    function openDoors() {
      leftDoor.style.transform = 'translateX(-100%)';
      rightDoor.style.transform = 'translateX(100%)';
      setTimeout(closeDoors, 2500);
    }

    function closeDoors() {
      leftDoor.style.transform = 'translateX(0)';
      rightDoor.style.transform = 'translateX(0)';
    }

    // Example: Open the doors after 2 seconds and close them after 5 seconds
    setTimeout(openDoors, animationTime*1000);

    // console.log(left, top);
    // LiftImage.style.left =  (howLeft*liftNumber) + "px";
    LiftImage.style.top = top + "px";
  });

  // Append the image to the floor
  floor.appendChild(directionImage);

  // Add an <img> element to the floor
  for (let i = 0; i < elevators; i++) {
    const floorImageDiv = document.createElement("div");
    floorImageDiv.className = "floorimages-div";
    floorImageDiv.id = i;
    floorImages.appendChild(floorImageDiv);
  }

  // Append the image to the floor
  floor.appendChild(floorImages);

  //creating text container for floor name
  const floorname = document.createElement("div");

  // Add content to the floor, such as floor number
  const floornumber = document.createElement("div");
  floornumber.className = "floor-number";
  floornumber.textContent = `Floor ${floorNumber}`;
  // Append the floorname to the floor
  floor.appendChild(floorname);
  floor.appendChild(floornumber);

  //id
  floor.id = `Floor ${floorNumber}`;

  floor.setAttribute("floorNumber", `${floorNumber}`); // Adding a custom attribute
  // Append the floor to the building container
  buildingContainer.appendChild(floor);
}
function generateLifts(elevators) {
  const firstFloor = document.getElementById("Floor 1"); // Corrected ID
  const floorImages = firstFloor.querySelector(".floor-images");

  for (let i = 0; i < elevators; i++) {
    // Target div for the lift image
    const targetDiv = floorImages.querySelector(`:nth-child(${i + 1})`);
    const left = targetDiv.offsetLeft;
    const top = targetDiv.offsetTop;

    // Create a new image element for the elevator
    // const liftImage = document.createElement("img");
    // liftImage.src = "/images/lift-image.jpg";
    // liftImage.className = "lift-image";
    // liftImage.setAttribute("floorDetail", `${1}`); // Adding a custom attribute
    // liftImage.setAttribute("liftid", `${i+1}`); // Adding a custom attribute
    // liftImage.id = `liftImage${i + 1}`;
    // liftImage.style.position = "absolute";
    // liftImage.style.left = left + 65 + "px";
    // liftImage.style.top = top + 5 + "px";

    // Create a new image element for the elevator
    const liftImage = document.createElement("div");
    liftImage.classList.add("elevator");
    // liftImage.src = "/images/lift-image.jpg";
    liftImage.style.backgroundColor = "silver"
    liftImage.style.overflow = "hidden";
    const leftDoor = document.createElement("div");
    leftDoor.id = "leftDoor";
    leftDoor.classList.add("door");
    leftDoor.style="background-color: blueviolet;"
    const rightDoor = document.createElement("div");
    rightDoor.id = "rightDoor";
    rightDoor.classList.add("door");
    rightDoor.style="background-color: pink;"
    liftImage.appendChild(leftDoor);
    liftImage.appendChild(rightDoor);
    liftImage.style.border = "5px solid blue";
    liftImage.className = "lift-image";
    liftImage.setAttribute("floorDetail", `${1}`); // Adding a custom attribute
    liftImage.setAttribute("liftid", `${i+1}`); // Adding a custom attribute
    liftImage.id = `liftImage${i + 1}`;
    liftImage.style.position = "absolute";
    liftImage.style.left = left + 65 + "px";
    liftImage.style.top = top + 5 + "px";

    // Append the elevator image to the floorImages container
    building.appendChild(liftImage);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Generate a specific number of floors (e.g., 5 floors) with images
  const numberOfFloors = floors;
  for (let i = numberOfFloors; i >= 1; i--) {
    const imageSource = `/images/lift-image.jpg`; // Replace with the actual image URL
    divFloor = elevators - i - 1;
    generateFloor(i, imageSource);
  }
  generateLifts(elevators);
  // console.log("data store = ", dataStore);
  // console.log("simulator");
});