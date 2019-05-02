import {
  SET_ROOMS,
  IRoomAction,
  SET_ROOM_TOTAL,
  SET_ROOM_INFO,
  SET_IS_WRITEABLE,
  SET_ROOM_IS_LIKE,
  SET_ROOM_WRITER_LIMIT,
  SET_NOVEL_TOTAL
} from "../actions";
import { Room, newRoom, newUser, User } from "../models";

export interface IRoomState {
  rooms: Array<Room>;
  novelTotal: number;
  roomTotal: number;
  isLike: boolean;
  joinedUserTotal: number;
  isWriteable: boolean;
  coverImage: string;
  desc: string;
  genre: string;
  title: string;
  tags: string;
  writerLimit: number;
  user: User;
}

const createEmpty = () => ({
  rooms: new Array<Room>(newRoom()),
  roomTotal: 0,
  novelTotal: 0,
  writerLimit: 0,
  isLike: false,
  joinedUserTotal: 0,
  isWriteable: false,
  tags: "",
  title: "",
  genre: "",
  desc: "",
  coverImage: "",
  user: newUser()
} as IRoomState);

export const roomReducer = (state = createEmpty(), action: IRoomAction) => {
  switch (action.type) {
    case SET_ROOM_IS_LIKE: {
      return {
        ...state,
        isLike: action.isLike
      }
    }
    
    case SET_IS_WRITEABLE:
      return {
        ...state,
        isWriteable: action.isWriteable
      } as IRoomState;

    case SET_ROOM_INFO:
      return {
        ...state,
        joinedUserTotal: action.roomInfo.joinedUserTotal,
        isLike: action.roomInfo.isLike,
        isWriteable: action.roomInfo.isWriteable,
        writerLimit: action.roomInfo.writerLimit,
        novelTotal: action.roomInfo.novelTotal,
        user: action.roomInfo.user,
        coverImage: action.roomInfo.coverImage,
        desc: action.roomInfo.desc,
        genre: action.roomInfo.genre,
        title: action.roomInfo.title,
        tags: action.roomInfo.tags
      } as IRoomState;

    case SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms
      } as IRoomState;

    case SET_NOVEL_TOTAL:
      return {
        ...state,
        novelTotal: action.novelTotal
      } as IRoomState;

      case SET_ROOM_TOTAL:
      return {
        ...state,
        roomTotal: action.roomTotal
      } as IRoomState;

    case SET_ROOM_WRITER_LIMIT:
      return {
        ...state,
        writerLimit: action.writerLimit
      } as IRoomState;

    default:
      return state;
  }
};
