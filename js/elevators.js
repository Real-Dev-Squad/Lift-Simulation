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

  //experiment code to add lift on a certain floor
  directionImage.addEventListener("click", (event) => {
    // Check if the parent div already has a child with a class name 'lift-image'
    const existingLiftImage = floorImages.querySelector(".lift-image");

    const currId = event.target.parentNode.parentNode.id;
    // console.log('Parent ID: ' , event.target.parentNode.parentNode.id);

    if (currId != 1 && existingLiftImage) {
      // If a 'lift-image' child already exists, remove it from the current floor
      alert("no more then one lift on this floor");
    } else {
      if (lastLiftFloor !== null) {
        // console.log(lastLiftFloor);
        const convertedNumber = floors - lastLiftFloor + 1;
        const lastLiftFloorImages = document.querySelector(
          `.floor:nth-child(${convertedNumber}) .floor-images`
        );
        // console.log(lastLiftFloorImages);
        const existingLiftImage =
          lastLiftFloorImages.querySelector(".lift-image");
        if (existingLiftImage) {
          lastLiftFloorImages.removeChild(existingLiftImage);
        }
      }
      // Update the lastLiftFloor to the current floor
      lastLiftFloor = floorNumber;

      // If no 'lift-image' child exists, create and append the image to the current floor
      const floorImage = document.createElement("img");
      floorImage.src = imageSource; // Provide the URL to your PNG image
      floorImage.alt = `Floor ${floorNumber}`; // Accessibility text
      floorImage.className = "lift-image";
      // Append the image to the current floor
      floorImages.appendChild(floorImage);
    }
  });

  // Append the image to the floor
  floorImages.appendChild(directionImage);

  // Add an <img> element to the floor
  if (floorNumber == 1) {
    for (let i = 0; i < elevators; i++) {
      const floorImage = document.createElement("img");
      floorImage.src = imageSource; // Provide the URL to your PNG image
      floorImage.alt = `Floor ${floorNumber}`; // Accessibility text
      // Append the image to the floor
      floorImage.className = "lift-image";
      floorImages.appendChild(floorImage);
    }
  }
  // Append the image to the floor
  floor.appendChild(floorImages);

  //creating text container for floor name
  const floorname = document.createElement("div");

  // Add content to the floor, such as floor number
  floorname.textContent = `Floor ${floorNumber}`;

  // Append the floorname to the floor
  floor.appendChild(floorname);

  //id
  floor.id = `${floorNumber}`;

  // Append the floor to the building container
  buildingContainer.appendChild(floor);
  lastLiftFloor = floorNumber;
}

// Generate a specific number of floors (e.g., 5 floors) with images


const numberOfFloors = floors;
for (let i = numberOfFloors; i >= 1; i--) {
  const imageSource = `/images/lift-image.jpg`; // Replace with the actual image URL
  generateFloor(i, imageSource);
}
