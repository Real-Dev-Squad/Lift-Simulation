import Floor from './Floor';
import Elevator from './Elevator';
import './styles.css';

class LiftController {
	constructor(noOfFloors, noOfElevators) {
		this.floors = []; // array of noOfFloors floors
		this.elevators = []; // array of noOfLifts elevators
		this.queue = [];

		for (let i = noOfFloors; i >= 0; i--) {
			this.floors.push(new Floor(i, noOfFloors));
		}
		for (let i = 1; i <= noOfElevators; i++) {
			this.elevators.push(new Elevator(i, noOfFloors, noOfElevators));
		}
	}
	handleButtonPress(buttonType, buttonFloor) {
		// console.log(buttonType, buttonFloor, this.elevators, 'buttonXXX');
		const doesLiftExistAtThisFloor = this.elevators.find(
			(ele) => ele.currentFloor === buttonFloor
		);
		if (doesLiftExistAtThisFloor !== undefined) {
			alert(`Lift already exists at Floor ${buttonFloor}`);
		} else {
			this.queue.push({ buttonType, buttonFloor });
			this.analyseLift();
			// if (tempQueue !== this.queue.length) {
			// 	newPromise.then((res) => console.log(res, 'RES'));
			// }
		}
	}

	analyseLift() {
		const firstItemInQueue = this.queue[0];
		if (!firstItemInQueue) return;
		const btnFloor = firstItemInQueue.buttonFloor;
		const btnType = firstItemInQueue.buttonType;

		// top floor
		if (btnFloor === this.floors.length - 1) {
			console.log('top floor');
			let liftsInDirection = this.elevators.filter(
				(ele) => ele.direction === 'UP'
			);
			if (!liftsInDirection.length) {
				liftsInDirection = this.elevators.filter(
					(ele) => ele.direction === 'DOWN'
				);
			}
			const { myLift, minDistance } = this.findMyLift(
				btnFloor,
				liftsInDirection
			);
			this.moveLift(btnFloor, btnType, myLift, minDistance);
		}
		// ground floor
		else if (btnFloor === 0) {
			console.log('ground floor');
			let liftsInDirection = this.elevators.filter(
				(ele) => ele.direction === 'DOWN'
			);
			if (!liftsInDirection.length) {
				liftsInDirection = this.elevators.filter(
					(ele) => ele.direction === 'UP'
				);
			}
			const { myLift, minDistance } = this.findMyLift(
				btnFloor,
				liftsInDirection
			);
			this.moveLift(btnFloor, btnType, myLift, minDistance);
		}
		// any mid floor
		else {
			console.log('Any mid floor');

			if (btnType === 'UP') {
				let findLiftsBelowThisFloor = this.elevators.filter(
					(ele) => ele.direction === 'UP' && ele.currentFloor < btnFloor
				);
				if (!findLiftsBelowThisFloor.length) {
					findLiftsBelowThisFloor = this.elevators.filter(
						(ele) => ele.direction === 'DOWN' && ele.currentFloor > btnFloor
					);
				}
				const { myLift, minDistance } = this.findMyLift(
					btnFloor,
					findLiftsBelowThisFloor
				);
				this.moveLift(btnFloor, btnType, myLift, minDistance);
			} else {
				let findLiftsAboveThisFloor = this.elevators.filter(
					(ele) => ele.direction === 'DOWN' && ele.currentFloor > btnFloor
				);
				if (!findLiftsAboveThisFloor.length) {
					findLiftsAboveThisFloor = this.elevators.filter(
						(ele) => ele.direction === 'UP' && ele.currentFloor < btnFloor
					);
				}
				const { myLift, minDistance } = this.findMyLift(
					btnFloor,
					findLiftsAboveThisFloor
				);

				this.moveLift(btnFloor, btnType, myLift, minDistance);
			}
		}
	}

	moveLift(btnFloor, buttonType, lift, minDistance) {
		// console.log(btnFloor, buttonType, lift, minDistance, 'moveLift');
		const liftToMoveIndex = this.elevators.findIndex(
			(ele) => ele.elevatorId === lift.elevatorId
		);
		const myElevator = this.elevators[liftToMoveIndex];
		console.log(myElevator, 'Moving lift....');
		const floorsListItems = document
			.getElementById('floors_list')
			.getElementsByTagName('li');
		const findFloorOffsetTop =
			floorsListItems[floorsListItems.length - 1 - btnFloor].offsetTop;
		const getMyElevatorFromDOM = document.getElementById(myElevator.elevatorId);
		getMyElevatorFromDOM.style.top = findFloorOffsetTop - 70 + 'px';
		getMyElevatorFromDOM.style.top = getMyElevatorFromDOM.style.transition = `top ${
			minDistance + 1
		}s`;

		setTimeout(() => {
			myElevator.currentFloor = btnFloor;
			myElevator.direction = buttonType;
			myElevator.state = 0;
			this.queue.shift();
		}, (minDistance + 1) * 1000);
	}
	findMyLift(pressedFloor, targetLifts) {
		console.log(pressedFloor, targetLifts, 'findMYLIFT');
		let myLift = '';
		let minDistance = Number.POSITIVE_INFINITY;
		for (let liftProperty of targetLifts) {
			if (
				liftProperty.state === 0 &&
				Math.abs(Number(pressedFloor) - Number(liftProperty.currentFloor)) <
					minDistance
			) {
				minDistance = pressedFloor - liftProperty.currentFloor;
				myLift = liftProperty;
			}
		}
		// console.log(myLift, minDistance, 'findmylift');
		const absoluteValue = Math.abs(minDistance);
		return { myLift, minDistance: absoluteValue };
	}
}

export const liftMachine = new LiftController(5, 4);
