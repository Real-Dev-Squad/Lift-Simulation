import { liftMachine } from './';

export default class Button {
	constructor(buttonType, floorNum, floorId) {
		// this.buttonType = buttonType; // UP is up, DOWN is down
		const buttonName = buttonType == 'UP' ? 'Up' : 'Down';
		this.buttonId = buttonName + '_' + floorNum;
		this.buttonFloor = floorNum;

		this.displayButton(
			buttonName,
			this.buttonId,
			this.buttonFloor,
			floorId,
			buttonType
		);
	}

	displayButton(btnText, buttonId, buttonFloor, floorId, buttonType) {
		let btn = document.createElement('button');
		btn.className = 'button';
		btn.setAttribute('id', buttonId);
		btn.innerHTML = btnText;
		if (btnText === 'Up') {
			btn.style.backgroundColor = 'green';
		} else {
			btn.style.backgroundColor = 'yellow';
		}
		const floorListItem = document.getElementById(floorId);
		floorListItem.appendChild(btn);
		btn.onclick = function () {
			// const liftControllerInstanceObj = new LiftController(4,4);
			liftMachine.handleButtonPress(buttonType, buttonFloor);
		};
	}
}
