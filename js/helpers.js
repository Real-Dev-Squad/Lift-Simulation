export const LIFT_STATUS = {
  AVAILABLE: "available",
  BUSY: "busy",
  FULL: "full",
};
export const LIFT_DIRECTION = {
  UP: "UP",
  BOTTOM: "BOTTOM",
};

export const FLOOR_HEIGHT = 161; // px
export const HALT_PER_FLOOR = 2000; // ms
export const FLOOR_GAP = 2; //px
export const isFloorFallsInPath = (lift, requestedAt) => {
  /**
   *  Check lift's direction and curr pos,
   * 	if my floor > curr pos and direction is up return true.
   * 	if my floor < curr pos and direction is bottom return true.
   * 	else return false
   */
  if (
    requestedAt.floor_no > Number(lift.dataset.pos) &&
    lift.dataset.direction === LIFT_DIRECTION.UP
  )
    return true;

  if (
    requestedAt.floor_no < Number(lift.dataset.pos) &&
    lift.dataset.direction === LIFT_DIRECTION.BOTTOM
  )
    return true;
  return false;
};

export const sortFloors = (str) => {
  const queue = Array.from(str)
    .reduce((acc, curr) => {
      if (curr === ",") return acc;
      return [...acc, Number(curr)];
    }, [])
    .sort((a, b) => a - b);
  return queue;
};

export const isClosestReducer = (floor_no) => {
  return (closestLift, lift) => {
    // if lift is busy and going in direction opposite of my current position ignore it.
    if (
      lift.dataset.status === LIFT_STATUS.BUSY &&
      isOppositeDirection(lift, floor_no)
    )
      return closestLift;
    // distance btwin floor and currentLift
    const distance = Math.abs(floor_no - Number(lift.dataset.pos));
    if (distance < closestLift.distance)
      return { ...closestLift, ref: lift, distance };
    return closestLift;
  };
};
export const isClosestBusyLift = (floor_no) => {
  console.log("isClosestBusyLift");
  return (closest, lift) => {
    const floorsQueue = sortFloors(lift.dataset.floorsQueue);
    const destination = getDestination(floorsQueue, lift.dataset);
    const distance = Math.abs(floor_no - destination);
    debugger;
    if (distance < closest.distance) {
      return { ref: lift, distance };
    }
    return closest;
  };
};
const isOppositeDirection = (lift, floor_no) => {
  const needToGoUp = floor_no - Number(lift.dataset.pos) > 0;
  if (needToGoUp && lift.dataset.direction === LIFT_DIRECTION.UP) return false;
  if (!needToGoUp && lift.dataset.direction === LIFT_DIRECTION.BOTTOM)
    return false;
  return true;
};

export const getDestination = (queue, liftData) => {
  /**
   * Returns the extreme floor of the Lifts that's in the queue and in the lift's moving direction.
   */
  const destination =
    liftData.direction === LIFT_DIRECTION.UP &&
    Number(liftData.pos) !== Math.max(...queue)
      ? Math.max(...queue)
      : Math.min(...queue);
  return destination;
};

export const onlyBusyAndOppositeDirectionLifts = (requestedFloor) => (lift) =>
  isOppositeDirection(lift, requestedFloor);
