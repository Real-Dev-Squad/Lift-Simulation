import Floor from './Floor';
import Elevator from './Elevator';
import './styles.css'

class LiftController {
    constructor( noOfFloors, noOfElevators ) {
        this.floors = []; // array of noOfFloors floors
        this.elevators = []; // array of noOfLifts elevators

        for (let i = 0; i < noOfFloors; i++) {
            this.floors.push (new Floor(i, noOfFloors));
        }
        for (let i = 0; i < noOfElevators; i++) {
            this.elevators.push (new Elevator(i, noOfFloors, noOfElevators));
        }
    }
     handleButtonPress (direction,buttonFloor) {
         let minIndex = -1, minDistance = Infinity;
         for ( let i = 0; i < this.elevators.length; i++ ) {
             let distanceIndex = this.elevators[i].isEligible( direction, buttonFloor );
             if (distanceIndex >= 0 && distanceIndex < minDistance) {
                minIndex = i; minDistance = distanceIndex;
            }
            
         }
         if (minIndex != -1) {
            this.elevators[minIndex].assignJob(direction, buttonFloor);
        } else {
            alert('no eligible elevators');
        }
    }
}







export const liftMachine = new LiftController( 7, 5 );
