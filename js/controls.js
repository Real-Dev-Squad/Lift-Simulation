import {
  FLOOR_HEIGHT,
  sortFloors,
  LIFT_DIRECTION,
  LIFT_STATUS,
  HALT_PER_FLOOR,
  isFloorFallsInPath,
} from "./helpers.js";

export const onLiftRequest = (floor_no, direction) => {
  // console.log(floor_no, direction);
  // get all lifts
  // check which lift is nearest
  // move its position to "floor_no"

  const lifts = document.getElementsByClassName("lift");
  lifts[0];
  const closestLift = [...lifts].reduceRight(
    (acc, curr) => {
      if (curr.dataset.status === LIFT_STATUS.BUSY)
        if (!isFloorFallsInPath(curr, { floor_no })) return acc; // ignore this lift as it's moving and route doesn't include my floor
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
  closestLift.ref.dataset.direction =
    floor_no - Number(closestLift.ref.dataset.pos) > 0
      ? LIFT_DIRECTION.UP
      : LIFT_DIRECTION.BOTTOM;
  // create a queue of all the floors needed to go. and
  move(closestLift.ref).addStop(floor_no);
};

const move = (liftRef) => {
  const liftData = liftRef.dataset;
  return {
    getDestination: (queue) => {
      /**
       * Returns the extreme floor of the Lifts that's in the queue and in the lift's moving direction.
       */

      const destination =
        liftData.direction === LIFT_DIRECTION.UP &&
        Number(liftData.pos) !== Math.max(...queue)
          ? Math.max(...queue)
          : Math.min(...queue);

      return destination;
    },
    to(floor_no) {
      liftRef.style.bottom = `${FLOOR_HEIGHT * (floor_no - 1)}px`;
      liftData.pos = floor_no;
      liftData.status = LIFT_STATUS.BUSY;

      const queue = sortFloors(liftData.floorsQueue);
      const destination = this.getDestination(queue);
      this.removeStop(queue);

      liftData.direction =
        destination - floor_no > 0 ? LIFT_DIRECTION.UP : LIFT_DIRECTION.BOTTOM;

      if (destination === floor_no) {
        liftData.status = LIFT_STATUS.AVAILABLE;
        return;
      }

      setTimeout(() => {
        // move one floor towards the destination floor if curr floor is not destination.
        if (liftData.direction === LIFT_DIRECTION.UP)
          return this.to(Number(liftData.pos) + 1);
        else return this.to(Number(liftData.pos) - 1);
      }, HALT_PER_FLOOR);
    },
    addStop(floor_no) {
      const queue = sortFloors(liftData.floorsQueue);
      queue.push(floor_no);
      liftData.floorsQueue = queue;
      if (liftData.status !== LIFT_STATUS.BUSY)
        if (liftData.direction === LIFT_DIRECTION.UP)
          return this.to(Number(liftData.pos) + 1);
        else return this.to(Number(liftData.pos) - 1);
    },
    removeStop(queue) {
      if (queue.includes(Number(liftData.pos)))
        liftData.floorsQueue = queue.filter(
          (floor) => floor !== Number(liftData.pos)
        );
    },
  };
};
