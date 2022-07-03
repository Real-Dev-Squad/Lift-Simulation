const floors = document.getElementById("input-floors");
const lifts = document.getElementById("input-lifts");
const btnGenerateLifts = document.getElementById("btn-generate");

console.log(floors);
console.log(lifts);

let noOfLifts;
let noOfFloors;

floors.addEventListener("input", () => {
  noOfFloors = parseInt(floors.value);
});

lifts.addEventListener("input", () => {
  noOfLifts = parseInt(lifts.value);
});

btnGenerateLifts.addEventListener("click", () => {
  console.log(noOfFloors, noOfLifts);
});

function generateFloors() {
  floors.forEach((floor) => {
    const div = document.createElement("div");
    div.classList("");
  });
}
