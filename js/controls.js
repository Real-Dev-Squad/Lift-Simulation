import {
  FLOOR_HEIGHT,
  FLOOR_GAP,
  sortFloors,
  LIFT_DIRECTION,
  LIFT_STATUS,
  HALT_PER_FLOOR,
  isClosestReducer,
  getDestination,
  onlyBusyAndOppositeDirectionLifts,
} from "./helpers.js";

export const onLiftRequest = (floor_no, direction) => {
  const lifts = document.getElementsByClassName("lift");

  const closestLift =
    [...lifts].reduce(isClosestReducer(floor_no), {
      distance: Number.MAX_SAFE_INTEGER,
      ref: null,
    }) ??
    [...lifts]
      .filter(onlyBusyAndOppositeDirectionLifts(floor_no))
      .reduce(isClosestBusyLift(floor_no), {
        distance: Number.MAX_SAFE_INTEGER,
        ref: null,
      });
  console.log(closestLift);
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
  const floorsWaitingForLift = new Set([]);

  const removeStop = async (queue) => {
    if (queue.includes(Number(liftData.pos))) {
      // open nd close doors for 2.5s each,
      await openDoors();
      await closeDoors();
      liftData.floorsQueue = queue.filter(
        (floor) => floor !== Number(liftData.pos)
      );
      // console.log("closed at ", liftData.pos);
      toggleControls(Number(liftData.pos), false);
      floorsWaitingForLift.delete(Number(liftData.pos));

      return true;
    }
    return false;
  };

  const openDoors = () => {
    return new Promise((res) => {
      liftRef.classList.add("open");
      setTimeout(() => {
        liftRef.classList.remove("open");
        return res();
      }, 2500);
    });
  };
  const closeDoors = () => {
    return new Promise((res) => {
      liftRef.classList.add("closing");
      setTimeout(() => {
        liftRef.classList.remove("closing");
        return res();
      }, 2500);
    });
  };

  const to = (floor_no) => {
    liftRef.style.bottom = `${(FLOOR_HEIGHT + FLOOR_GAP) * (floor_no - 1)}px`;
    liftData.pos = floor_no;
    liftData.status = LIFT_STATUS.BUSY;

    const queue = sortFloors(liftData.floorsQueue);
    const destination = getDestination(queue, liftData);

    // liftData.direction =
    //   destination - floor_no > 0 ? LIFT_DIRECTION.UP : LIFT_DIRECTION.BOTTOM;

    setTimeout(() => {
      (async () => {
        await removeStop(queue);

        liftData.direction =
          destination - floor_no > 0
            ? LIFT_DIRECTION.UP
            : LIFT_DIRECTION.BOTTOM;

        if (destination === floor_no) {
          liftData.status = LIFT_STATUS.AVAILABLE;
          liftData.floorsQueue;
          return;
        }
        // move one floor towards the destination floor if curr floor is not destination.
        if (liftData.direction === LIFT_DIRECTION.UP)
          return to(Number(liftData.pos) + 1);
        else return to(Number(liftData.pos) - 1);
      })();
    }, HALT_PER_FLOOR);
  };
  //  disable current floor controls
  const toggleControls = (floor_no, enable = true) => {
    const floors = document.getElementsByClassName("controls");
    const floor = [...floors].find(
      (floor) => floor_no === Number(floor.parentElement.dataset.floorNo)
    );
    // console.log(floor_no, enable, floor, floorsWaitingForLift);

    floor.childNodes.forEach((element) => {
      if (element.tagName === "BUTTON" && floorsWaitingForLift.has(floor_no)) {
        element.disabled = enable;
      }
    });
  };

  return {
    addStop(floor_no) {
      const queue = sortFloors(liftData.floorsQueue);
      queue.push(floor_no);
      floorsWaitingForLift.add(Number(floor_no));
      toggleControls(floor_no, true);
      liftData.floorsQueue = queue;
      if (liftData.status !== LIFT_STATUS.BUSY)
        if (liftData.direction === LIFT_DIRECTION.UP)
          return to(Number(liftData.pos) + 1);
        else return to(Number(liftData.pos) - 1);
    },
  };
};
