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

  directionImage.className = "direction-image";

  //experiment code to add lift on a certain floor
  directionImage.addEventListener("click", (event) => {
    // Check if the parent div already has a child with a class name 'lift-image'
    const existingLiftImage = floorImages.querySelector(".lift-image");

    //getting the current floor id
    const currFloorId = event.target.parentNode.id;
    // console.log("current floorId: ", currFloorId);

    // Get the div element by its ID (you can use any other method to select the div)
    var selectedFloorImagesDiv = document.getElementById(`${currFloorId}`).querySelector(".floor-images");
    // console.log("parent div", selectedFloorImagesDiv.children);

    var swapingColumnId=-1;
    for(let j=0; j<selectedFloorImagesDiv.children.length; j++) {
      // console.log("selected column = ",selectedFloorImagesDiv.children[j]);
      var currFloorImagesDiv = selectedFloorImagesDiv.children[j];
      var containsImage = currFloorImagesDiv.querySelector("img");
      if(containsImage==null) {
        swapingColumnId = selectedFloorImagesDiv.children[j].id;
        // console.log(swapingColumnId);
        break;
      }
    }
    if(swapingColumnId==-1) {
      alert("maxlifts"); return;
    }

    //use this because we are using numbering from bottom to top here.
    var floorLevel = parseInt(currFloorId.match(/\d+/)?.[0]);
    const convertedNumber = floors - floorLevel;

    // console.log("convertedNumber = ", convertedNumber, floor, currFloorId);

    // Loop through child elements to find closest lift that isnt on the current floor
    var foundLiftsOnOtherFloors = 0;
    var existingLiftImage2;
    const buildingDiv = document.getElementById("building");
    for (var i = 0; i < buildingDiv.children.length; i++) {
      // console.log(floorLevel);
      if(i == convertedNumber) {
        continue;
      }

      // console.log(buildingDiv.children[i].querySelector(".floor-images").children[swapingColumnId]);
      // console.log(buildingDiv.children[i].querySelector(".floor-images").children.length);
      const swapImage = buildingDiv.children[i].querySelector(".floor-images").children[swapingColumnId];
      const containsImage = swapImage.querySelector("img");
      if(containsImage){
        // console.log("swapableimage = ",swapImage.querySelector("img"));
        // console.log("selected floor= ", selectedFloorImagesDiv.children[swapingColumnId]);
        selectedFloorImagesDiv.children[swapingColumnId].appendChild(swapImage.querySelector("img"));
        swapImage.removeAttribute("img")
        break;
      }
    }
    // if(foundLiftsOnOtherFloors==1) {
    //   // Append the image to the current floor
    //   // console.log("removed = ", existingLiftImage2);
    //   floorImages.appendChild(existingLiftImage2);
    // }
    // else {
    //   alert("maximum lift capacity for this floor is reached");
    // }
  }
  );

  // Append the image to the floor
  floor.appendChild(directionImage);

  // Add an <img> element to the floor
  if(floorNumber==1) {
    for (let i = 0; i < elevators; i++) {
      const floorImageDiv = document.createElement("div");
      floorImageDiv.id = i;
      floorImageDiv.className = "floorimages-div";
        const floorImage = document.createElement("img");
        floorImage.src = imageSource; // Provide the URL to your PNG image
        floorImage.alt = `Floor ${floorNumber}`; // Accessibility text
        floorImage.id = `${i+1}`;
        // Append the image to the floor
        floorImage.className = "lift-image";
        floorImageDiv.appendChild(floorImage);
      floorImages.appendChild(floorImageDiv);
    }
  } 
  else {
    for (let i = 0; i < elevators; i++) {
      const floorImageDiv = document.createElement("div");
      floorImageDiv.className = "floorimages-div";
      floorImageDiv.id = i;
      floorImages.appendChild(floorImageDiv);
    }
  }
    
    
  // Append the image to the floor
  floor.appendChild(floorImages);

  //creating text container for floor name
  const floorname = document.createElement("div");

  // Add content to the floor, such as floor number
  const floornumber = document.createElement("div");
  floornumber.className = "floor-number"
  floornumber.textContent = `Floor ${floorNumber}`;
  // Append the floorname to the floor
  floor.appendChild(floorname);
  floor.appendChild(floornumber);

  //id
  floor.id = `Floor ${floorNumber}`;

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
