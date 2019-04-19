import { SET_ROOMS, IRoomAction, SET_IS_WRITEABLE, SET_ROOM_TOTAL } from "../actions";
import { Room, newRoom } from "../models";

export interface IRoomState {
  rooms: Array<Room>;
  isWriteable: boolean;
  total: number;
}

const createEmpty = () => ({
  rooms: new Array<Room>(newRoom()),
  isWriteable: false,
  total: 0
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
      } as IRoomState;
    }

    case SET_ROOM_TOTAL: {
      return {
        ...state,
        total: action.total
      } as IRoomState;
    }

    default:
      return state;
  }
};
