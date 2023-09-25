
const body1 = document.querySelector("body")

const button1 = document.querySelector(".formButton");
const input1 = document.querySelector(".input1")
const input2 = document.querySelector(".input2")


button1.addEventListener('click',(event)=>{
 
        const numberOfFloors = parseInt(input1.value);
        const numberOfLifts = parseInt(input2.value);
        if(inputValidation(numberOfFloors,numberOfLifts)){
            loadpage(numberOfFloors,numberOfLifts)
            const bb = document.querySelector('body');
            const form = document.querySelector(".flexClass");
            form.style.display = "none"

        }

        event.preventDefault();
        

})


//**************************layout begins***********************


function loadpage(numberOfFloors, numberOfLifts){

    const section1 = document.createElement("SECTION");
    section1.setAttribute("id","layoutDiv");
    const body2 = document.querySelector("body");

    const bbdiv = document.createElement("div");
    body2.appendChild(bbdiv);

    const backButton = document.createElement("BUTTON");
    backButton.textContent = "Reset";
    backButton.setAttribute("class","backbut");
    bbdiv.appendChild(backButton)
    bbdiv.setAttribute("class","backbutton")

    body2.appendChild(section1);
    
    for(let i = numberOfFloors; i >=1;i-- ){
        const floor = document.createElement("div"); //creating floor
        section1.appendChild(floor);                //appending floor to section
        floor.setAttribute("class","floors");
        floor.setAttribute("data-floorNo",i);       //setting the class for the floors
        
        const upAndDown = document.createElement("div") //creating a upAndDown div for the floor
        upAndDown.setAttribute("class","upAndDown")     //setting the class for the upAnd Down div where the buttons will go
        floor.appendChild(upAndDown);                        //appending the upAndDown div for the floor 
        
        
        if(i == numberOfFloors)                                         //if floor is the top floor, which it will be because we start                  
        {                                                               //the loop from top floor and we need only one down button
            const buttonDown = document.createElement("BUTTON");
            buttonDown.textContent = "Down";
            buttonDown.setAttribute("class","Btn");
            buttonDown.setAttribute("data-assigned","false");
            floor.setAttribute("data-liftAssigned","false")
            buttonDown.setAttribute("data-buttonFloor",i);
            buttonDown.addEventListener("click",callingLift);
            upAndDown.appendChild(buttonDown);
        }
        else if(i == 1 )                                                // if floor is ground floor, we only need the up button 
        {
            const buttonUp = document.createElement("BUTTON");
            buttonUp.textContent = "Up";
            buttonUp.setAttribute("class","Btn");
            buttonUp.setAttribute("data-buttonFloor",i);
            buttonUp.setAttribute("data-assigned","true");
            buttonUp.addEventListener("click",callingLift);
            floor.setAttribute("data-liftAssigned","true");
            upAndDown.appendChild(buttonUp);
        }
        else
        {                                                                   // in all other cases we need 2 buttons
            const buttonUp = document.createElement("BUTTON");
            buttonUp.setAttribute("class","Btn");
            buttonUp.setAttribute("data-buttonFloor",i);
            buttonUp.addEventListener("click",callingLift);
            // buttonUp.setAttribute("data-assigned","false");
            const buttonDown = document.createElement("BUTTON");
            buttonDown.setAttribute("class","Btn");
            buttonDown.setAttribute("data-buttonFloor",i);
            buttonDown.setAttribute("data-assigned","false");
            buttonDown.addEventListener("click",callingLift);
            buttonUp.textContent = "Up";
            buttonDown.textContent = "Down";
            upAndDown.appendChild(buttonUp);
            upAndDown.appendChild(buttonDown);
        }
        
        const liftContainer = document.createElement("div");
        liftContainer.setAttribute("class","liftContainer")
        floor.appendChild(liftContainer);


        const fn = document.createElement("div");
        fn.setAttribute("class","floorName");
        fn.textContent = "Floor"
        floor.appendChild(fn);
        fno = document.createElement("div");
        fno.textContent = i;
        fn.appendChild(fno);


        if(i == 1)
        {
            for(let j = 1; j <= numberOfLifts;j++  )
            {
                const lift = document.createElement("div");
                lift.setAttribute("class","lift");
                lift.setAttribute("data-liftno",j);
                lift.setAttribute("data-liftfloor",i);
                lift.setAttribute("data-liftAvailability","Available");
                liftContainer.appendChild(lift);

                const door1 = document.createElement("div");
                const door2 = document.createElement("div");
                door1.setAttribute("class","door-left");
                door2.setAttribute("class","door-right");
                lift.appendChild(door1);
                lift.appendChild(door2);


            }
        }

    }


    //------Reset Button Click---------
    backButton.addEventListener('click',()=>{
    const bb = document.querySelector('body');
    bb.removeChild(section1);
    const form = document.querySelector(".flexClass");
    const input1 = document.querySelector(".input1")
    const input2 = document.querySelector(".input2")
    input1.value = ''; 
    input2.value = '';
    form.style.display = "block";
    backButton.style.display = "none";
    });
}


let liftRequest = [];    // this stores the floor numbers of the button where the lifts are called in a queue

let liftAvail = [];           // shows the availability of the lifts, the size of this changes according to the number of lifts available

let currentOccupiedFloors = [];  // shows on which floors are the lifts available currently

let currentClick = [];

function LiftStatus(Array){

  for(let i = 0; i < Array.length; i++)
  {
    let status = Array[i].getAttribute("data-liftAvailability");
    if(status == "Available"){
      return i;
    }
  }

}

function checkingAllBusy(Array){

  for(let i = 0; i < Array.length; i++)
  {
    let status = Array[i].getAttribute("data-liftAvailability");
    if(status == "Available"){
      return false;
    }
  }
  return true;
}

function closestLift(buttonFloor,Array){
  let cL;
  let minDistance = Infinity;
  for(let i = 0; i< Array.length; i++)
  {
    diffInFloors = 0;
    if(Array[i].getAttribute("data-liftAvailability") == "Available"){
      let floorOccupiedByLift = Array[i].getAttribute("data-liftfloor");
      let diffInFloors = Math.abs(buttonFloor-floorOccupiedByLift);
    if(minDistance > diffInFloors){
      cL = i;
      minDistance = diffInFloors;
    }
    }
  }
  return cL;
};


const callingLift = (event)=>{

  
  const buttonClicked = event.target;
  
  const buttonFloor = buttonClicked.getAttribute("data-buttonFloor");

  if(currentClick.includes(buttonFloor))
  {
    return;
  }

  currentClick.push(buttonFloor);
  console.log("clicked floors are",currentClick)


  console.log("According to new fn floor clicked is ",buttonFloor);

  const liftObject = document.querySelectorAll('.lift');
  let liftArray = Array.from(liftObject);
  // console.log(liftArray)
  // LiftStatus(liftArray)
  // let AvailableLift = LiftStatus(liftArray);
  let AvailableLift = closestLift(buttonFloor,liftArray);
  console.log("available closest lift = ",AvailableLift);
  // console.log("Available lift is", LiftStatus(liftArray));
  // console.log(typeof(AvailableLift))
  if(checkingAllBusy(liftArray))
  {
    console.log("all lifts are busy");
    if(!liftRequest.includes(parseInt(buttonFloor))){
      liftRequest.push(parseInt(buttonFloor));
    }
    
    console.log(liftRequest);
  }
  else{

    movingLift(buttonFloor,AvailableLift);
  }
  


}


const movingLift = (floorCalled, AvailableLift)=>{

  const liftObject = document.querySelectorAll('.lift');
  let liftArray = Array.from(liftObject);

  const currentfloor = liftArray[AvailableLift].getAttribute("data-liftfloor");

  const floorDiff = Math.abs(floorCalled - currentfloor);

  setTimeout(() => {
    liftArray[AvailableLift].setAttribute("data-liftAvailability", "busy");
    liftArray[AvailableLift].style.transition = `transform ${floorDiff * 2}s ease-in-out`;
    liftArray[AvailableLift].style.transform = `translateY(${-(floorCalled - 1) * 100}px)`;
    liftArray[AvailableLift].setAttribute("data-liftfloor", floorCalled);
  }, 0);

  setTimeout(() => {
    openDoors(liftArray, AvailableLift);
  }, floorDiff * 2000);

  setTimeout(() => {
    closeDoors(liftArray, AvailableLift);
    // liftArray[l].setAttribute("data-liftAvailability", "Available");
  }, floorDiff * 2000 + 2500);
  setTimeout(()=>{
    liftArray[AvailableLift].setAttribute("data-liftAvailability", "Available");
    if(liftRequest.length !== 0 ){
      const consequentRequest = liftRequest[0];
      movingLift(consequentRequest,AvailableLift);
      liftRequest.shift();
      console.log(liftRequest);
    }
    currentClick.shift();
  },(floorDiff*2000)+5000)


}

function openDoors(liftArray,l){
    liftArray[l].children[0].style.transform=`translateX(${-100}%)`;
    liftArray[l].children[1].style.transform=`translateX(${100}%)`;
    liftArray[l].children[0].style.transition=`transform 2.5s`;
    liftArray[l].children[1].style.transition=`transform 2.5s`;
}

function closeDoors(liftArray,l){
    const floorNumber = parseInt(liftArray[l].getAttribute("data-liftfloor"));
    liftArray[l].removeAttribute("data-assigned");
    liftArray[l].children[0].style.transform=`translateX(${0}%)`;
    liftArray[l].children[1].style.transform=`translateX(${0}%)`;
    liftArray[l].children[0].style.transition=`transform 2.5s`;
}





const inputValidation = (floorCount, liftCount) => {
    if (isNaN(floorCount) || isNaN(liftCount) || floorCount === "" || liftCount === "") {
        alert("Input cannot be empty");
        return false;
      } else if (floorCount % 1 !== 0 || liftCount % 1 !== 0) {
        alert("Numbers should be whole (non-decimal) values");
        return false;
      } else if (floorCount <= 0 || liftCount <= 0) {
        alert("Numbers should be positive and also greater than zero");}
       else if (window.innerWidth <= 1000 && liftCount > 3) {
        alert("On mobile, for flawless experience, number of lifts should be 3 or less");
        return false;
      }else if (window.innerWidth <= 1000 && floorCount > 5) {
        alert("On mobile, for flawless experience, number of floors should be 5 or less");
        return false;
      } else if (window.innerWidth > 1000 && liftCount > 10) {
        alert("On desktop,for flawless experience, number of lifts should be 10 or less");
        return false;
      } else {
        return true;
      }
};




function adjustPlaceholderText() {
  const input1 = document.querySelector('.input1');
  const input2 = document.querySelector('.input2');
  const isMobile = window.innerWidth <= 1000; // Adjust the breakpoint to 1000px

}

adjustPlaceholderText();

window.addEventListener('resize', adjustPlaceholderText);
