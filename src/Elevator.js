
export default class Elevator {
    constructor( elevatorNum,noOfFloors,noOfElevators ) {
        this.elevatorNum = elevatorNum;
        this.direction = 0; // 0 is idle, 1 is up, -1 is down
        this.currentFloor = 0;
        this.noOfFloors = noOfFloors;
        this.noOfElevators = noOfElevators;
    
        this.elevatorId = 'elevator_' + elevatorNum;
        this.displayElevator();
    }

    displayElevator () {
        const elevatorsList = document.getElementById( "elevators_list" );
        const floorsListItems = document.getElementById( "floors_list" ).getElementsByTagName("li");
        const floorNumber = this.noOfFloors - this.currentFloor - 1;
        const findFloorOffsetTop = floorsListItems[floorNumber].offsetTop;
        const elevatorItem = document.createElement( 'li' );
        elevatorItem.innerHTML = `Lift ${this.elevatorNum}`;
        elevatorItem.style.top = (findFloorOffsetTop-70) + "px";
        elevatorItem.style.left = (this.elevatorNum===0?200:(this.elevatorNum+1) *200) + "px";
        elevatorItem.setAttribute("id",this.elevatorId);
        elevatorsList.appendChild(elevatorItem);
    }
    isEligible ( direction, buttonFloor ) {
        if (this.direction == 0) {
            // eligible, and return distance
            return Math.abs(buttonFloor - this.currentFloor);
        } else {
            return -1;
        }
    }
    moveElevator (buttonFloor) {
        
        if (this.direction == 0) {
            console.log("lift already in that floor")   
        } else {
            const floorsListItems = document.getElementById( "floors_list" ).getElementsByTagName("li");
            const findFloorOffsetTop = floorsListItems[floorsListItems.length - 1 - buttonFloor].offsetTop;
            console.log( findFloorOffsetTop, "findFloorOffsetTop" );
            console.log( this, "this elevator" );
            const elevatorId = this.elevatorId;
            const elevatorItem = document.getElementById( elevatorId );
            if ( this.direction === 1 ) {
                elevatorItem.style.top = (findFloorOffsetTop-70) + "px";
            } else {
                elevatorItem.style.top = (findFloorOffsetTop-70) + "px";
            }
        }
    }
    assignJob ( direction, buttonFloor ) {
        console.log( direction, buttonFloor, "assign job" );
        console.log(buttonFloor,this.currentFloor,"FLOORS")
        if (buttonFloor == this.currentFloor) {
            this.moveElevator(buttonFloor);
        } else {
            this.direction = ( ( buttonFloor - this.currentFloor ) > 0 ? 1 : -1 );
            this.moveElevator(buttonFloor);
            setTimeout( function() { 
                this.currentFloor = buttonFloor;
                this.direction = 0; 
                this.moveElevator(buttonFloor);
            }.bind(this), 100 * Math.abs(buttonFloor - this.currentFloor) );
        }
    }
}