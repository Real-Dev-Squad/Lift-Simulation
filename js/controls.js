const moveLiftTo = (floor_no, direction) => {
  console.log(floor_no, direction);
  // get all lifts
  // check which lift is nearest
  // move its position to "floor_no"

  const lifts = document.getElementsByClassName("lift");
  const closestLift = [...lifts].reduceRight(
    (acc, curr) => {
      console.log(acc);
      const relLiftDist = Math.abs(curr.dataset.pos - floor_no);
      const isLesserDistance =
        Math.min(relLiftDist, acc.distance) === relLiftDist;
      if (isLesserDistance)
        return {
          distance: relLiftDist,
          lift_no: curr.dataset.lift_no, // !TODO: can be removed later - not using anywhere
          ref: curr,
        };
      return acc;
    },
    { distance: Number.MAX_SAFE_INTEGER, lift_no: null, ref: null }
  );

  if (closestLift.distance === 0)
    return alert("Lift is already on the current floor");

  // move closestLift to current floor
  closestLift.ref.style.bottom = `${FLOOR_HEIGHT * (floor_no - 1)}px`;
  closestLift.ref.dataset.pos = floor_no;
};
