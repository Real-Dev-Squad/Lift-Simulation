
let simulate = document.querySelector('.createLiftFloorButton');


let restart = document.querySelector('.goToFirstPage');

restart.addEventListener('click', hideSecondPage);

simulate.addEventListener('click', () => {

   
    let floorInputValue = document.querySelector('#floorNumber').value;
    let liftInputValue = document.querySelector('#liftNumber').value;
    
    
    if (floorInputValue == "" || liftInputValue == "") {
        alert('please enter the value')
    }

    else if (floorInputValue >= 8) {
        alert('please enter max 7 floor')

    }

    else if (floorInputValue <= 0 && liftInputValue<=0)
    {
        alert("please select valid number of floors and lifts")
    }

    else if (floorInputValue <= 0 ) {
        alert("please select valid number of floors")
    }

    else if (liftInputValue <= 0) {
        alert("please select valid number of lifts")
    }
   
    else if (window.innerWidth <= 500 && +liftInputValue > 4) {
        alert("This screen size can't have more than 4 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 768 && +liftInputValue > 5) {
        alert("This screen size can't have more than 5 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1024 && +liftInputValue > 7) {
        alert("This screen size can't have more than 7 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1440 && +liftInputValue > 11) {
        alert("This screen size can't have more than 11 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 2560 && +liftInputValue > 20) {
        alert("This screen size can't have more than 20 lifts");
    }

    //when simulate button clicked hide .firstPage class div and display .secondPage class div
    else {
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        // console.log('second')
        makingFloors();
    }
});

//when  button back clicked hide .secondPage class div and display .firstPage class div
function hideSecondPage() {
    document.querySelector('.secondPage').style.display = 'none';
    document.querySelector('.firstPage').style.display = 'flex';

    deletingFloors();

}


function makingFloors() {

    // collect the input no. of floor and lift value
    let floorInput = document.querySelector('#floorNumber').value;
    let liftInput = document.querySelector('#liftNumber').value;


    for (let i = floorInput; i > 0; i--) {
       
        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        
        let buttonLift = document.createElement('div');
        buttonLift.className = 'buttonLift';

        
        let buttondiv1 = document.createElement('div');
        buttondiv1.className = 'button';

        
        let button1 = document.createElement("button");
        let text1 = document.createTextNode("Up");
        button1.className = "up";
        button1.setAttribute('id', `up${i}`);
        button1.appendChild(text1);

        
        let button2 = document.createElement("button");
        let text2 = document.createTextNode("Down");
        button2.className = "down";
        button2.setAttribute('id', `down${i}`);
        button2.appendChild(text2);

        //button1 and button2 append in this div <div class="button"></div>
        buttondiv1.appendChild(button1);
        buttondiv1.appendChild(button2);

        // buttondiv1 append in <div class="buttonLift"></div>
        buttonLift.appendChild(buttondiv1);

        //buttonLift append in this div <div class="box"></div>
        floordiv.appendChild(buttonLift);


        //Creating HrFloor
        //<div class="hrfloorName"></div>
        let hrdiv = document.createElement('div');
        hrdiv.className = 'hrfloorName';

        //<hr>
        let hr = document.createElement('hr');

        //<span>Floor 1</span>
        let spanFloorNo = document.createElement('span');
        spanFloorNo.innerText = `Floor ${i}`;

        //<hr> append in this div <div class="hrfloorName"></div>
        hrdiv.appendChild(hr);

        //<span>Floor 1</span> append in this div <div class="hrfloorName"></div>
        hrdiv.appendChild(spanFloorNo);

        //<div class="hrfloorName"></div> is append in this div <div class="box"></div>
        floordiv.appendChild(hrdiv);

        //<div class="box"></div>  is append in this div <div class="secondPage"></div>
        document.querySelector('.secondPage').appendChild(floordiv);
    }


    
    let mainLift = document.createElement('div');
    mainLift.className = 'mainLift';

    for (let j = 1; j <= liftInput; j++) {

        // <div class="lift" id="lift1" flag="free"></div>
        let liftdiv = document.createElement('div');
        liftdiv.className = 'lift';
        liftdiv.setAttribute('id', `lift${j}`);

        //adding flag="free" attribute in <div class="lift" id="lift1" flag="free"></div>
        liftdiv.setAttribute('flag', `free`);

        // <div class="gates" id="gates"></div>
        let gates = document.createElement('div');
        gates.className = 'gates';
        gates.setAttribute('id', `gates`);

        // <div class="gate1"></div>
        let gate1 = document.createElement('div');
        gate1.className = 'gate1';
        // <div class="gate1"></div> append in this div <div class="gates" id="gates"></div>
        gates.appendChild(gate1);

        // <div class="gate2"></div>
        let gate2 = document.createElement('div');
        gate2.className = 'gate2';
        // <div class="gate2"></div> append in this div <div class="gates" id="gates"></div>
        gates.appendChild(gate2);

        // <div class="gates" id="gates"></div> append in this div <div class="lift" id="lift1" flag="free"></div>
        liftdiv.appendChild(gates);

        // <div class="lift" id="lift1" flag="free"></div> append in this div <div class="mainLift"></div>
        mainLift.appendChild(liftdiv);
    }

    

    //selecting all the div class .buttonLift we created using querySelectorAll 
    const mainbuttonlift = document.querySelectorAll('.buttonLift');
    // console.log(mainbuttonlift); 

    //selecting last div class .buttonLift 
    const lastbox = mainbuttonlift[mainbuttonlift.length - 1];
    // console.log(lastbox)

    // <div class="mainLift"></div> append in this div <div class="buttonLift"></div>
    lastbox.appendChild(mainLift);



    //  select all lift we created above using querySelectorAll
    let selectAllLift = document.querySelectorAll('.lift');
    // console.log('s',selectAllLift)

    // select all up button <button class="up" id="up1">Up</button> using querySelectorAll
    let up = document.querySelectorAll('.up');

    // select all down button <button class="down" id="down1">Down</button> using querySelectorAll
    let down = document.querySelectorAll('.down');

    //store no. of lifts in nUp
    let nUp = up.length;
    let prev = 0;

    //create oldFloorValueArray for calculation purpose
    let oldFloorValueArray = [];

    for (let i = 0; i < selectAllLift.length; i++) {
        oldFloorValueArray.push(1)
    }
    // console.log(oldFloorValueArray)//oldFloorValueArray=[1,1,1,1];

    //Now we loop through all up button and add eventListener in all up button
    up.forEach((e, i) => {
        e.addEventListener('click', () => {

            //create floorValue for calculation purpose
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                // console.log(selectAllLift)

                //check <div class="lift" id="lift1" flag="free"> lift attribute flag has value free
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    // set attribute flag value busy i.e. <div class="lift" id="lift1" flag="busy">
                    selectAllLift[i].setAttribute('flag', 'busy');

                   
                    moveLift(selectAllLift[i], floorValue, oldFloorValueArray[i]);
                    oldFloorValueArray[i] = floorValue;
                    // console.log(oldFloorValueArray);
                    // console.log(selectAllLift[i]);
                    break;
                }
            }
        })
    })


    
    down.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                // console.log(selectAllLift)
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');
                    moveLift(selectAllLift[i], floorValue, oldFloorValueArray[i]);
                    oldFloorValueArray[i] = floorValue;
                    
                    break;
                }
            }
        })
    })
}


function moveLift(liftno, floorNo, oldFloorValue) {

    
    liftno.style.transform = `translateY(${-95 * (floorNo - 1)}px)`;

    
    let prev = `${2 * Math.abs(floorNo - oldFloorValue)}s`
    liftno.style.transitionDuration = prev;
  



    
    setTimeout(() => {

        gateopenclose(liftno);
        setTimeout(() => {
            liftno.setAttribute('flag', 'free')
        }, 5500);
        console.log(liftno.getAttribute('flag'))
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000)

}

function gateopenclose(liftno) {
    let gates = liftno.firstChild;
    let gate1 = document.querySelector('.gate1');
    let gate2 = document.querySelector('.gate2');

    
    setTimeout(() => {
      
        gates.children[0].style.width = '3px';
        gates.children[1].style.width = '3px';
    }, 1000);

    
    setTimeout(() => {
        gates.children[0].style.width = '25px';
        gates.children[1].style.width = '25px';
    }, 3500)
}



function deletingFloors() {
    let floorInput = document.querySelector('#floorNumber').value;

    for (let i = floorInput; i > 0; i--) {
        let floordiv = document.querySelector('.box');
        floordiv.remove();
    }
}
