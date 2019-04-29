import { SET_ROOMS, IRoomAction, SET_ROOM_AVAILABLE_SLOT, SET_IS_WRITEABLE, SET_ROOM_TOTAL, SET_ROOM_SPACE_LIMITATION, SET_ROOM_IS_LIKE } from "../actions";
import { Room, newRoom } from "../models";

export interface IRoomState {
  rooms: Array<Room>;
  isWriteable: boolean;
  total: number;
  slot: number;
  limit: number;
  isLike: boolean;
}

const createEmpty = () => ({
  rooms: new Array<Room>(newRoom()),
  isWriteable: false,
  total: 0,
  slot: 0,
  limit: 0,
  isLike: false,
});

export const roomReducer = (state = createEmpty(), action: IRoomAction) => {
  switch (action.type) {    
    case SET_ROOM_IS_LIKE: {
      return {
        ...state,
        isLike: action.isLike
      }
    }

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

    case SET_ROOM_AVAILABLE_SLOT: {
      return {
        ...state,
        slot: action.slot
      } as IRoomState;
    }

    case SET_ROOM_SPACE_LIMITATION: {
      return {
        ...state,
        limit: action.limit
      } as IRoomState;
    }
    default:
      return state;
  }
};
