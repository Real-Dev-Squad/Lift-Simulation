import { liftMachine } from './'

export default class Button  {
    constructor( buttonType, floorNum, floorId, noOfFloors ) {

        this.buttonType = buttonType; // 1 is up, -1 is down

        const floorNumber = noOfFloors - floorNum - 1;
        const buttonName= ( this.buttonType == 1 ) ? 'Up' : 'Down';

        this.buttonId = buttonName + '_' + floorNumber;
        this.buttonFloor = floorNum;




        this.displayButton(buttonName,this.buttonId,this.buttonFloor,floorId,this.buttonType)
    }
    
    displayButton ( btnText, buttonId, buttonFloor, floorId, buttonType ) {
        let btn = document.createElement( 'button' );
        btn.className = "button";
        btn.setAttribute("id",buttonId);
        btn.innerHTML = btnText;
        if ( btnText === "Up" ) {
            btn.style.backgroundColor="green"
        } else {
            btn.style.backgroundColor="yellow"
        }
        const floorListItem = document.getElementById( floorId );
        floorListItem.appendChild( btn );
        btn.onclick = function () {
            // const liftControllerInstanceObj = new LiftController(4,4);
            liftMachine.handleButtonPress(buttonType,buttonFloor)
        }; 
    }
}