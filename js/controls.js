import {
  FLOOR_HEIGHT,
  FLOOR_GAP,
  sortFloors,
  LIFT_DIRECTION,
  LIFT_STATUS,
  HALT_PER_FLOOR,
  isClosestReducer,
} from "./helpers.js";

export const onLiftRequest = (floor_no, direction) => {
  const lifts = document.getElementsByClassName("lift");

  const closestLift = [...lifts].reduceRight(isClosestReducer(floor_no), {
    distance: Number.MAX_SAFE_INTEGER,
    lift_no: null,
    ref: null,
  });
  debugger;
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
      console.log("closed at ", liftData.pos);
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

  const getDestination = (queue) => {
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

  const to = (floor_no) => {
    liftRef.style.bottom = `${(FLOOR_HEIGHT + FLOOR_GAP) * (floor_no - 1)}px`;
    liftData.pos = floor_no;
    liftData.status = LIFT_STATUS.BUSY;

    const queue = sortFloors(liftData.floorsQueue);
    const destination = getDestination(queue);

    liftData.direction =
      destination - floor_no > 0 ? LIFT_DIRECTION.UP : LIFT_DIRECTION.BOTTOM;

    setTimeout(() => {
      (async () => {
        const resp = await removeStop(queue);
        console.log("doors CLOSED", resp);
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
    console.log(floor_no, enable, floor, floorsWaitingForLift);

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
