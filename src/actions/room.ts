import { Room, newRoom, User } from "../models";
import config from "../config";
import axios from "axios";

export const SET_ROOM_IS_LIKE = "SET_ROOM_IS_LIKE";
export const SET_ROOM_TOTAL = "SET_ROOM_TOTAL";
export const SET_ROOMS = "SET_ROOMS";
export const SET_ROOM_WRITER_LIMIT = "SET_ROOM_WRITER_LIMIT";
export const SET_ROOM_INFO = "SET_ROOM_INFO";
export const SET_IS_WRITEABLE = "SET_IS_WRITEABLE";
export const SET_NOVEL_TOTAL = "SET_NOVEL_TOTAL";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
  roomTotal: number;
  writerLimit: number;
  roomInfo: any;
  isLike: boolean;
  isWriteable: boolean;
  availableSlot: number;
  novelTotal: number;
  tags: string;
  title: string;
  genre: string;
  desc: string;
  coverImage: string;
  user: User;
}

export const setIsWriteable = (isWriteable: boolean) =>
  ({
    isWriteable,
    type: SET_IS_WRITEABLE
  } as IRoomAction);

  export const setRoom = (isWriteable: boolean) =>
  ({
    isWriteable,
    type: SET_IS_WRITEABLE
  } as IRoomAction);

export const setRoomTotal = (roomTotal: number) =>
  ({
    roomTotal,
    type: SET_ROOM_TOTAL
  } as IRoomAction);

  export const setNovelTotal = (novelTotal: number) =>
  ({
    novelTotal,
    type: SET_NOVEL_TOTAL
  } as IRoomAction);

export const setRooms = (rooms: Array<Room>) =>
  ({
    rooms,
    type: SET_ROOMS
  } as IRoomAction);

export const setRoomInfo = (roomInfo: Room) =>
  ({
    roomInfo,
    type: SET_ROOM_INFO
  } as IRoomAction);

export const setRoomSpaceLimitaion = (writerLimit: number) =>
  ({
    writerLimit,
    type: SET_ROOM_WRITER_LIMIT
  } as IRoomAction);

export const setRoomIsLike = (isLike: boolean) =>
  ({
    isLike,
    type: SET_ROOM_IS_LIKE
  } as IRoomAction);

export const fetchRoomInfo = (
  roomId: string,
  userId: number,
  isLoggedIn: boolean = false
) => (dispatch: any) => {
  const url = `${
        config.REACT_APP_SERVER_URL
      }/api/rooms/info?roomId=${roomId}&userId=${userId}&isLoggedIn=${isLoggedIn}`;

  axios
    .get(url)
    .then(res => {
      const message = res.data.message;
      const room = {
        joinedUserTotal: message.joinedUserTotal,
        isWriteable: message.isWriteable,
        isLike: message.isLike,
        novelTotal: message.novelTotal,
        user: message.user,
        coverImage: message.coverImage,
        desc: message.desc,
        genre: message.genre,
        title: message.title,
        tags: message.tags,
        writerLimit: message.writerLimit,
        like: message.like,
        createdAt: message.createdAt
      } as Room;
    
      return dispatch(setRoomInfo(room));
    })
    .catch(err => {
      if (!err.response) return;
      console.log(err.response);
      return dispatch(setRoomInfo({} as Room));
    });
};

export const fetchRooms = (skip: number = 0, limit: number = 30) => (
  dispatch: any
) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms?skip=${skip}&limit=${limit}`)
    .then(res => {
      const rooms: Array<Room> = res.data.message as Array<Room>;
      return dispatch(setRooms(rooms));
    })
    .catch(err => {
      if (!err.response) return;
      console.log(err.response);
      const rooms: Array<Room> = new Array<Room>(newRoom());

      return dispatch(setRooms(rooms));
    });
};

export const postRoomIsLike = (
  roomId: string,
  userId: number,
  isLike: boolean
) => (dispatch: any) => {
  const body = {
    roomId,
    userId,
    isLike
  };
  axios
    .post(`${config.REACT_APP_SERVER_URL}/api/rooms/like`, body)
    .then(res => {
      return dispatch(setRoomIsLike(isLike));
    })
    .catch(err => {
      if (!err.response) return;
      console.log(err.response);
      return dispatch(setRoomIsLike(false));
    });
};
