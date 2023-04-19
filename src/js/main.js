

 function loadLiftsPage(event) {
    console.log(event);
    var floors = 10;
    var lifts = 5;
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    window.location.href = "./lift-simulation.html"; // Loads the new page in the same folder
        console.log(event);

    var topFloorDom = document.getElementById("top-floor");
    var groundFloorDom = document.getElementById("ground-floor");
    var topFloorUnit = topFloorDom.getElementsByClassName("floor")[0];
    var groundFloorUnit = groundFloorDom.getElementsByClassName("floor")[0];
    var topFloorWrapper = topFloorDom.getElementsByClassName("floor-wrapper")[0];
    var groundFloorWrapper = groundFloorDom.getElementsByClassName("floor-wrapper")[0];
    var upButton = groundFloorDom.getElementsByClassName("up-button")[0];


    for(int i =0; i < lifts - 1; i++){
        topFloorWrapper.appendChild(topFloorUnit.cloneNode(true));
        groundFloorWrapper.appendChild(groundFloorUnit.cloneNode(true));
    }

    for(int i = 0; i < floor - 8; i++){
        topFloorDom.cloneNode(true).
    }
    const buildingContainer = document.getElementsByClassName('building-container')[0];
    


}

function moveUp(){
    var floors = 2;
    var objImage = document.getElementById("lift-0");
    var floorBeam = document.getElementsByClassName("floor-beam")[0];
    var floor = document.getElementsByClassName("floor")[0];
    var travelPerFloor = (floor.clientHeight + floorBeam.clientHeight) * floors;
    objImage.style.transitionDuration = (floors * 2 )+ "s";

    console.log(objImage);
        if(objImage.style.top ==="") objImage.style.top = "0px";
            //objImage.style.top = parseInt(objImage.style.top) + 100 + "px"; //objImage.style.top = objImage.style.top + 100 + "px";
            objImage.style.top = ((parseInt(objImage.style.top)) - travelPerFloor) + "px";
            console.log(travelPerFloor);



}

function moveDown(){
        var objImage = document.getElementById("lift-0");
        var liftDoor1 = objImage.getElementsByClassName("lift-door")[0];
        var liftDoor2 = objImage.getElementsByClassName("lift-door")[1];
        var width = liftDoor1.clientWidth;
        liftDoor1.style.width = "0px";
        liftDoor2.style.width = "0px";
        setTimeout(() => { liftDoor1.style.width = width+"px";
        liftDoor2.style.width = width+"px";  }, 2000);

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
