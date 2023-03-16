const rootEl = <HTMLBodyElement>document.getElementById("root");
const inputForm = <HTMLFormElement>document.getElementById("lift-inputs");

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const floorInput = <HTMLInputElement>this.elements[0],
    liftInput = <HTMLInputElement>this.elements[1];

  const params = new URLSearchParams();
  params.append("floors", floorInput.value);
  params.append("lifts", liftInput.value);
  const navigateTo = `/simulator/index.html?` + params.toString();

  window.location.href = navigateTo;
});
