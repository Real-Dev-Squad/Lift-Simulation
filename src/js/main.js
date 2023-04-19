

 function loadLiftsPage(event) {
    console.log("aaa");

    event.preventDefault(); // Prevents the form from submitting and reloading the page
    window.location.href = "./lift-simulation.html"; // Loads the new page in the same folder
    const buildingContainer = document.getElementsByClassName('building-container')[0];
    console.log(localStorage.length);
    


}

function moveUp(){
    var objImage = document.getElementById("lift-0");
    console.log(objImage);
            if(objImage.style.top ==="") objImage.style.top = "0px";
            //objImage.style.top = parseInt(objImage.style.top) + 100 + "px"; //objImage.style.top = objImage.style.top + 100 + "px";
            objImage.style.top = ((parseInt(objImage.style.top)) - document.getElementsByClassName("floor")[0].clientHeight) + "px";
            console.log();



}

// async function loadLiftsPage(event) {
//   try {
//     const response = await fetch('../pages/floors.html');
//     const html = await response.text();
//     const parser = new DOMParser();
//     const floorDoc = parser.parseFromString(html, 'text/html');
//     const floorElement = floorDoc.getElementById('floor-container');
//     const liftContainer = document.getElementById('start');
//     console.log("asldjkf")
//     liftContainer.appendChild(floorElement);
//   } catch (error) {
//     console.error('Error loading floor element:', error);
//   }
//       console.log("aaaa")

// }




// function moveUp(){
//     document.getElementById("lift-0").animate(
//   [
//     // keyframes
//     { transform: "translateY(0px)" },
//     { transform: "translateY(-300px)" },
//   ],
//   {
//     // timing options
//     duration: 1000,
//     iterations: 1,
//   }
// );
