console.log("RUNNING TYPESCRIPT");

const rootEl = <HTMLBodyElement>document.getElementById("root");
const heading = document.createElement("h1");
heading.innerText = "Testing DOM Manipulation in JS with TS";
rootEl.appendChild(heading);

alert("TSstarted!");
