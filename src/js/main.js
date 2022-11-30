const submitButton=document.querySelector("#submit")
const div=document.createElement("div")
const button=document.createElement("button")
const liftSimulationHandler=(e)=>{
    e.preventDefault()
    const floorInput= +document.querySelector("#floors").value;
    const liftInput= +document.querySelector("#lifts").value;
    const floorSection=document.querySelector(".floor-section")
    let liftsAvailble=[];
    let floorInputOutline=document.querySelector("#floors")
    const liftInputOutline= document.querySelector("#lifts")
    if (floorInput===0 &&liftInput===0 || floorInput<0 &&liftInput<0) {
        alert("Enter valid floor and lift inputs and value should be greater than 0")
        floorInputOutline.setAttribute("class","error-input-field")
        liftInputOutline.setAttribute("class","error-input-field")
    }else{
        floorInputOutline.setAttribute("class","corrected-field")
        liftInputOutline.setAttribute("class","corrected-field")
    }
   for (let i=floorInput; i>0; i--) {
    const floors= document.createElement("div");
    floors.setAttribute("class","floor-container")
    floors.setAttribute("data-floor-number",`${i}`)
    floors.innerHTML=`<div class="row">
        <div class="center floor-left-side">
        <span>Floor-${i}</span>
        </div>
        <div class="row lift-section row-gap floor-right-side"></div>
    </div>`
    floors.style.width=`${130+liftInput*120}px`
    floorSection.appendChild(floors)
    let leftSide=floors.querySelector(".floor-left-side")
    let upButton=document.createElement("button");
    upButton.innerText="↑"
    let downButton=document.createElement("button")
        downButton.innerText="↓";
    if(i===0 || i!==floorInput){
        upButton.setAttribute("data-up-button",`${i}`)
        upButton.addEventListener("click",()=>{
            let liftCall=upButton.dataset.upButton;
            callLift(Number(liftCall))
        })
        leftSide.appendChild(upButton)
    }
    
    if( i===floorInput || i!==1){
        downButton.setAttribute("data-down-button",`${i}`)
        downButton.addEventListener("click",()=>{
            let liftCall=downButton.dataset.downButton;
            callLift(Number(liftCall))
        })
      leftSide.appendChild(downButton)
    }
   }
   let liftSection= floorSection.lastChild.querySelector(".lift-section")
   for (let j = 1; j < liftInput+1; j++) {
    let lifts=document.createElement("div")
    lifts.innerHTML=`
    <div class="row border-sm">
      <div class="lift-left-door"></div>
      <div class="lift-right-door"></div>
    </div>
    `
    lifts.setAttribute("class","lift border-sm")
    lifts.setAttribute("data-lift-number",`${j}`);
    lifts.setAttribute("data-lift-status","free")
    lifts.setAttribute("data-lift-current",1)
    liftSection.appendChild(lifts)
   }
   function callLift(position) {
    let lift=[...liftSection.childNodes].find((lift)=>lift.dataset.liftStatus==="free")
    if (lift) {
        moveLift(lift,position)
    } else {
        busyLift(position)
    }
   }
   function moveLift(lift,position) {
    if (Number(lift.dataset.liftCurrent)===position ) {
        openLiftDoor(lift,position)
    } else {
        moveLiftTo(lift,position)
    }

   }
   function busyLift(position) {
        liftsAvailble.push(position)
   }

   function openLiftDoor(lift,position) {
    lift.setAttribute("data-lift-status","busy")
    let distance=Math.abs(Number(lift.dataset.liftCurrent)-position)
    console.log(distance);
    let leftDoor=lift.childNodes[1].childNodes[1];
    let rightDoor=lift.childNodes[1].childNodes[3]
    setTimeout(() => {
         rightDoor.style.transition="transform 2.5s"
          leftDoor.style.transition="transform 2.5s"
          rightDoor.style.transform=`translateX(${30}px)`
          leftDoor.style.transform=`translateX(${-30}px)`
    }, distance*2000+1000);
    setTimeout(() => {
    rightDoor.style.transition="transform 2.5s"
    leftDoor.style.transition="transform 2.5s"
    rightDoor.style.transform=`translateX(${0}px)`
    leftDoor.style.transform=`translateX(${0}px)`;
    lift.setAttribute("data-lift-status","free")
    lift.setAttribute("data-lift-current",position)
    }, distance*2000+4500)

   }
   function moveLiftTo(lift,position) {
    lift.setAttribute("data-lift-status","busy")
    let distance=Math.abs(Number(lift.dataset.liftCurrent)-position)
        lift.style.transition=`transform ${distance*2}s`
        lift.style.transform=`translateY(${-72*(position-1)}px)`
    openLiftDoor(lift,position)
    console.log(lift);
    setTimeout(() => {
        if (liftsAvailble.length>0) {
            moveLiftTo(lift,liftsAvailble[0])
            liftsAvailble.shift()
            console.log(liftsAvailble);
        }
    }, distance*2000+6500);
    // 6000
   }
}
console.log(document.querySelector(".floor-section"))
submitButton.addEventListener("click",liftSimulationHandler)