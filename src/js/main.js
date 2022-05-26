const floorCount = document.getElementById("floor_count");
const liftCount = document.getElementById("lift_count");
const section = document.getElementById("intro");
const lift_section = document.getElementById("lift_section");
let flag = false;

floorCount.addEventListener("change", () => {
  if (!isNaN(floorCount.value)) {
    console.log(floorCount.value);
  } else {
    console.log("NAN");
  }
});

liftCount.addEventListener("change", () => {
  if (!isNaN(liftCount.value)) {
    console.log(liftCount.value);
  } else {
    console.log("NAN");
  }
  if (!isNaN(floorCount.value) && !isNaN(liftCount.value)) {
    flag = true;
    section.style.display = "none";
  }
});

// 1. create floors based on input, create 1 lift on lowest floor, CSS.
// 2. create buttons on each floor accordingly number them internally, on click the lift should vertically go there, CSS.
// 3. Play around with up and down buttons.
// 4. create a number display like in CG mumbai, to select which floor to go.
// 5. Make lift open and close.
// 6. Replicate lifts to input count.
// 7. Now implement lift movement based on nearest lift to floor check.
// 8. Test
// 9. Background Animation.
// 10. Overall CSS.
