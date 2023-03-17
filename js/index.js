const rootEl = document.getElementById("root");
const inputForm = document.getElementById("lift-inputs");

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const floorInput = this.elements[0],
    liftInput = this.elements[1];

  const params = new URLSearchParams();
  params.append("floors", floorInput.value);
  params.append("lifts", liftInput.value);
  const navigateTo = `/simulator.html?` + params.toString();

  window.location.href = navigateTo;
});
