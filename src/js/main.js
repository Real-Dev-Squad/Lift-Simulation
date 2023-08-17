let simulate = document.querySelector('.createLiftFloorButton');



simulate.addEventListener('click', function (e) {
    e.preventDefault();
    const floorInputValue = document.getElementById('floorNumber').value;
    const liftInputValue = document.getElementById('liftNumber').value;
    console.log(floorInputValue, liftInputValue)

    if (floorInputValue == "" || liftInputValue == "") {
        alert('please enter the value')
    }

    if (floorInputValue == "0" || liftInputValue == "0") {
        alert('please enter the value')
    }
    else {
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        makingFloor()
    }
}
)


function makingFloor () {

    let floorInput = document.querySelector('#floorNumber').value
    let liftInput = document.querySelector('#liftNumber').value

    let mainLift = document.createElement('div')
    mainLift.className = 'mainLift'

    for (let j = 1; j <= liftInput; j++) {
        mainLift.innerHTML += `
    <div class="lift" id="lift${j}" flag="free">
        <div class="gates" id="gates">
            <div class="gate1"></div>
            <div class="gate2"></div>
        </div>
    <div>
    `
    }






    for (let i = floorInput; i > 0; i--) {

        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        if (i == 1) {
            floordiv.appendChild(mainLift);
        }
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

        buttondiv1.appendChild(button1);
        buttondiv1.appendChild(button2);

        buttonLift.appendChild(buttondiv1);

        floordiv.appendChild(buttonLift);

        let hrdiv = document.createElement('div');
        hrdiv.className = 'hrfloorName';


        let hr = document.createElement('hr');

        let spanFloorNo = document.createElement('span');
        spanFloorNo.innerText = `Floor ${i}`;

        hrdiv.appendChild(hr);


        hrdiv.appendChild(spanFloorNo);

        floordiv.appendChild(hrdiv);

        document.querySelector('.secondPage').appendChild(floordiv);
        if (i == floorInput) {
            button1.style.display = 'none';
        }
        if (i == 1) {
            button2.style.display = 'none'
        }
    }



}

