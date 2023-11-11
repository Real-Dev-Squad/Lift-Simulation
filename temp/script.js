const leftDoor = document.getElementById('leftDoor');
const rightDoor = document.getElementById('rightDoor');

function openDoors() {
    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';
}

function closeDoors() {
    leftDoor.style.transform = 'translateX(0)';
    rightDoor.style.transform = 'translateX(0)';
}

// Example: Open the doors after 2 seconds and close them after 5 seconds
setTimeout(openDoors, 2000);
setTimeout(closeDoors, 5000);
