
const liftPositions = [];
const TIME_PER_FLOOR = 2000;
const TIME_DOOR = 2500;

function loadLiftsPage(event) {
    console.log(location);
    const form = event.target;
    const floors = form.elements['floorNum'].value;
    const lifts = form.elements['liftNum'].value;
    event.preventDefault();
    window.location.assign("./lift-simulation.html?floors="+floors+"&lifts="+lifts);
}

function constructPage(url){
    var urlParams = new URLSearchParams(url.substring(url.indexOf("?")));
    var floors = urlParams.get("floors");
    var lifts = urlParams.get("lifts");
    var topFloorDom = document.querySelector("#top-floor");

    var groundFloorDom = document.querySelector("#ground-floor");

    var topFloorWrapper = topFloorDom.getElementsByClassName("floor-wrapper")[0];
    var groundFloorWrapper = groundFloorDom.getElementsByClassName("floor-wrapper")[0];
    var topFloorUnit = topFloorWrapper.getElementsByClassName("floor")[0];
    var groundFloorUnit = groundFloorWrapper.getElementsByClassName("floor")[0];
    var upButton = groundFloorDom.getElementsByClassName("up-button")[0];
    var downButton = topFloorDom.getElementsByClassName("down-button")[0];
    const buildingContainer = document.getElementsByClassName('building')[0];

liftPositions.push({position : 0, availableFrom : Date.now(), id : "lift-0" });
    for(var i =1; i < lifts ; i++){
        topFloorWrapper.appendChild(topFloorUnit.cloneNode(true));
        var groundClone = groundFloorUnit.cloneNode(true);
        const liftId = "lift-"+i;
        groundClone.querySelector("#lift-0").setAttribute("id",liftId);
        liftPositions.push({position : 0, availableFrom : Date.now() ,id :liftId});
        groundFloorWrapper.appendChild(groundClone);
    }
    

    // downButton.removeAttribute("onclick");
    downButton.setAttribute("onclick", "getLift("+(floors-1)+")");
    for(var i = floors - 2; i >0 ; i--){
        var topClone = topFloorDom.cloneNode(true);
        const liftMethod = "getLift("+i+")";
        var upButtonClone =  upButton.cloneNode(true)
        upButtonClone.setAttribute("onclick", liftMethod);
        topClone.getElementsByClassName("down-button")[0].setAttribute("onclick",liftMethod);
        topClone.getElementsByClassName("floor-buttons")[0].appendChild(upButtonClone);
        buildingContainer.insertBefore(topClone,groundFloorDom);
    }

}

document.addEventListener("DOMContentLoaded", function(event){
    console.log(event);
  if(event.target.baseURI.includes("lift-simulation.html")){
        constructPage(event.target.baseURI);
        console.log(liftPositions);
    }
});

function findNearestLift(floor){
    let nearestLift = null;
    let nearestLiftDistance = undefined;
    let minAvailableTime = Number.MAX_VALUE;
    for(let i = 0; i < liftPositions.length; i++){
        let distance = Math.abs(liftPositions[i].position - floor);
        if(liftPositions[i].availableFrom < Date.now()){
            if(nearestLiftDistance == undefined || distance < nearestLiftDistance){
                nearestLiftDistance = distance;
                nearestLift = liftPositions[i];
            }
        }
        minAvailableTime = Math.min(minAvailableTime,liftPositions[i].availableFrom);
    }

    if(nearestLift == null) {
        setTimeout(() => {console.log("Waited for lift");
            getLift(floor)}, minAvailableTime - Date.now());
    }

    else nearestLift.availableFrom = Date.now() + (TIME_PER_FLOOR * nearestLiftDistance) + (TIME_DOOR * 2);
    console.log(nearestLift);
    console.log(liftPositions);

    return nearestLift;
}



function getLift(floor){
    console.log(floor);
    let lift = findNearestLift(floor);

    if(lift != null)
    {
        moveLift(lift.id,Math.abs(lift.position - floor), (lift.position - floor) < 0);
        lift.position = floor;
    }
    
}

    const floorBeam = document.getElementsByClassName("floor-beam")[0];
    const floor = document.getElementsByClassName("floor")[0];

function moveLift(id,floors,isUp){
    const objImage = document.getElementById(id);

    var travelPerFloor = (floor.clientHeight + floorBeam.clientHeight) * floors;
    objImage.style.transitionDuration = ((floors * TIME_PER_FLOOR ) /1000)+ "s";
    setTimeout(() => {doorsAnimation(objImage)}, (floors * TIME_PER_FLOOR ));
    console.log(objImage);
    if(objImage.style.top ==="") objImage.style.top = "0px";
        
    if(isUp){
        objImage.style.top = ((parseInt(objImage.style.top)) - travelPerFloor) + "px";
    }else{
        objImage.style.top = ((parseInt(objImage.style.top)) + travelPerFloor) + "px";
    }
}

function doorsAnimation(objImage){
        const liftDoor1 = objImage.getElementsByClassName("lift-door")[0];
        const liftDoor2 = objImage.getElementsByClassName("lift-door")[1];
        var width = liftDoor1.clientWidth;
        liftDoor1.style.width = "0px";
        liftDoor2.style.width = "0px";
        setTimeout(() => { liftDoor1.style.width = width+"px";
        liftDoor2.style.width = width+"px";  }, TIME_DOOR);

}
