import Floor from './Floor';
import Elevator from './Elevator';
import './styles.css';

class LiftController {
	constructor(noOfFloors, noOfElevators) {
		this.floors = []; // array of noOfFloors floors
		this.elevators = []; // array of noOfLifts elevators

		for (let i = noOfFloors; i >= 0; i--) {
			this.floors.push(new Floor(i, noOfFloors));
		}
		for (let i = 1; i <= noOfElevators; i++) {
			this.elevators.push(new Elevator(i, noOfFloors, noOfElevators));
		}
	}

	handleButtonPress(buttonType, buttonFloor) {
		const doesLiftExistAtThisFloor = this.elevators.find(
			(ele) => ele.currentFloor === buttonFloor
		);
		if (doesLiftExistAtThisFloor !== undefined) {
			alert(`Lift already exists at Floor ${buttonFloor}`);
		} else {
			// this.queue.push({ buttonType, buttonFloor });
			this.analyseLift({ buttonType, buttonFloor });
		}
	}

	analyseLift({ buttonType, buttonFloor }) {
		const btnFloor = buttonFloor;
		const btnType = buttonType;

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

	showAnimation(btnFloor, buttonType, elevator, minDistance) {
		if (elevator.state === 0) {
			return;
		} else {
			const floorsListItems = document
				.getElementById('floors_list')
				.getElementsByTagName('li');
			const findFloorOffsetTop =
				floorsListItems[floorsListItems.length - 1 - btnFloor].offsetTop;
			const getMyElevatorFromDOM = document.getElementById(elevator.elevatorId);
			getMyElevatorFromDOM.style.top = findFloorOffsetTop - 70 + 'px';
			getMyElevatorFromDOM.style.top = getMyElevatorFromDOM.style.transition = `top ${
				minDistance + 1
			}s`;
			// disabled button in the floor until lift is reached there
			const getBtnsOfFloor = document.getElementsByClassName(
				`button ${btnFloor}`
			);
			for (let i = 0; i < getBtnsOfFloor.length; i++) {
				getBtnsOfFloor[i].disabled = true;
			}

			getMyElevatorFromDOM.addEventListener('transitionend', () => {
				console.log('Transition ended!!');
				elevator.currentFloor = btnFloor;
				elevator.direction = buttonType;
				elevator.state = 0;
				//enable button when the lift has reached there
				for (let i = 0; i < getBtnsOfFloor.length; i++) {
					getBtnsOfFloor[i].disabled = false;
				}
			});
		}
	}

	moveLift(btnFloor, buttonType, lift, minDistance) {
		console.log(this.elevators, 'The elevators');
		const liftToMoveIndex = this.elevators.findIndex(
			(ele) => ele.elevatorId === lift.elevatorId
		);
		let myElevator = this.elevators[liftToMoveIndex];
		// if the lift is already moving then do nothing
		if (myElevator.state !== 0) return;

		myElevator.state = buttonType === 'UP' ? 1 : -1;
		console.log(myElevator, `Moving lift ${liftToMoveIndex + 1}....`);
		this.showAnimation(btnFloor, buttonType, myElevator, minDistance);
	}
	findMyLift(pressedFloor, targetLifts) {
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
		const absoluteValue = Math.abs(minDistance);
		return { myLift, minDistance: absoluteValue };
	}
}

export const liftMachine = new LiftController(8, 4);
