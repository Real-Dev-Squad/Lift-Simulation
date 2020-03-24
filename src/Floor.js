import Button from './Button'
 
export default class Floor {
    constructor( floorNum, noOfFloors ) {
        const floorNumber = noOfFloors - floorNum - 1;
        this.floorNum = floorNumber;
        this.floorId = 'floor_' + floorNumber;
        this.displayFloor();

        if ( floorNumber === 0 ) {
            this.upButton = new Button(1, this.floorNum, this.floorId, noOfFloors);
        }
        else if ( floorNumber  === noOfFloors-1 ) {
            this.downButton = new Button(-1, this.floorNum, this.floorId, noOfFloors);
        }
        else {          
            this.upButton = new Button(1, this.floorNum, this.floorId, noOfFloors);
            this.downButton = new Button(-1, this.floorNum, this.floorId, noOfFloors);
        }

    }

    displayFloor () {
        const floorsList = document.getElementById( "floors_list" );
        const horizontalLine = document.createElement( 'li' );
        horizontalLine.innerHTML = `Floor ${this.floorNum}`;
        horizontalLine.setAttribute("id", this.floorId);
        floorsList.appendChild(horizontalLine);
        // return floorsList;
        
    }

}
