import { SET_ROOMS, IRoomAction, SET_IS_WRITEABLE } from "../actions";
import { Room, newRoom } from "../models";

export interface IRoomState {
  rooms: Array<Room>;
  isWriteable: boolean;
}

const createEmpty = () => ({
  rooms: new Array<Room>(newRoom()),
  isWriteable: false
});

export const roomReducer = (state = createEmpty(), action: IRoomAction) => {
  switch (action.type) {    
    case SET_ROOMS: {
      return {
        ...state,
        rooms: action.rooms
      } as IRoomState;
    }

    case SET_IS_WRITEABLE: {
      return {
        ...state,
        isWriteable: action.isWriteable
      }
    }

    default:
      return state;
  }
};
