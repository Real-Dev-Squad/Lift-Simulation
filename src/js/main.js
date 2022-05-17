const floorCount = document.getElementById("floor_count");
const liftCount = document.getElementById("lift_count");
const section = document.getElementById("intro");
floorCount.addEventListener("change", () => {
  console.log(floorCount.value);
});
liftCount.addEventListener("change", () => {
  console.log(liftCount.value);
  section.style.display = "none";
});
