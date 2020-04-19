import Button from './Button';

export default class Floor {
	constructor(floorNum, noOfFloors) {
		// const floorNumber = noOfFloors - floorNum - 1;
		this.floorNum = floorNum;
		this.floorId = 'floor_' + floorNum;
		this.displayFloor();

		if (floorNum === 0) {
			this.upButton = new Button('UP', this.floorNum, this.floorId, noOfFloors);
		} else if (floorNum === noOfFloors) {
			this.downButton = new Button(
				'DOWN',
				this.floorNum,
				this.floorId,
				noOfFloors
			);
		} else {
			this.upButton = new Button('UP', this.floorNum, this.floorId, noOfFloors);
			this.downButton = new Button(
				'DOWN',
				this.floorNum,
				this.floorId,
				noOfFloors
			);
		}
	}

	displayFloor() {
		const floorsList = document.getElementById('floors_list');
		const horizontalLine = document.createElement('li');
		const newDiv = document.createElement('div');
		newDiv.style.textAlign = 'right';
		newDiv.innerHTML = `Floor ${this.floorNum}`;
		newDiv.style.fontSize = '18px';
		newDiv.style.fontWeight = 'bold';
		// horizontalLine.style.textAlign = 'right
		horizontalLine.setAttribute('id', this.floorId);
		horizontalLine.appendChild(newDiv);
		floorsList.appendChild(horizontalLine);
		// return floorsList;
	}
}
