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

  // Append the image to the floor
  floorImages.appendChild(directionImage);

  // Add an <img> element to the floor
  const floorImage = document.createElement("img");
  floorImage.src = imageSource; // Provide the URL to your PNG image
  floorImage.alt = `Floor ${floorNumber}`; // Accessibility text
  // Append the image to the floor
  floorImages.appendChild(floorImage);

  // Append the image to the floor
  floor.appendChild(floorImages);

  //creating text container for floor name
  const floorname = document.createElement("div");

  // Add content to the floor, such as floor number
  floorname.textContent = `Floor ${floorNumber}`;

  // Append the floorname to the floor
  floor.appendChild(floorname);

  // Append the floor to the building container
  buildingContainer.appendChild(floor);
}

// Generate a specific number of floors (e.g., 5 floors) with images
const numberOfFloors = 5;
for (let i = 1; i <= numberOfFloors; i++) {
  const imageSource = `/images/lift-image.jpg`; // Replace with the actual image URL
  generateFloor(i, imageSource);
}
