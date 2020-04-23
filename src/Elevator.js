import { DISTANCE_BETWEEN_LIFTS, LIFT_HEIGHT } from './constants';
import Floor from './Floor';

export default class Elevator {
	constructor(elevatorNum, noOfFloors, noOfElevators) {
		this.elevatorNum = elevatorNum;
		this.direction = 'UP';
		this.state = 0; // 0 is idle, 1 is moving up, -1 is moving down
		this.currentFloor = 0;
		this.elevatorId = 'elevator_' + elevatorNum;
		this.noOfFloors = noOfFloors;
		// this.noOfElevators = noOfElevators;
		this.displayElevator();
	}

	displayElevator() {
		const elevatorsList = document.getElementById('elevators_list');
		const floorsList = document.getElementById('floors_list');
		const floorsListItems = floorsList.getElementsByTagName('li');
		const floorNumber = this.noOfFloors - this.currentFloor;
		const findFloorOffsetTop = floorsListItems[floorNumber].offsetTop;

		const elevatorItem = document.createElement('li');
		elevatorItem.innerHTML = `Lift ${this.elevatorNum}`;
		elevatorItem.style.top = findFloorOffsetTop - LIFT_HEIGHT + 'px';
		elevatorItem.style.left =
			(this.elevatorNum === 0
				? DISTANCE_BETWEEN_LIFTS
				: this.elevatorNum * DISTANCE_BETWEEN_LIFTS) + 'px';
		elevatorItem.setAttribute('id', this.elevatorId);
		elevatorsList.appendChild(elevatorItem);
	}
	
}
