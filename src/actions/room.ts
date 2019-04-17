import { Room, newRoom } from "../models";
import config from "../config";
import axios from "axios";

export const SET_ROOMS = "SET_ROOMS";
export const SET_IS_WRITEABLE = "SET_IS_WRITEABLE";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
  isWriteable: boolean;
}
export const setRooms = (rooms: Array<Room>) => {
  return {
    rooms,
    type: SET_ROOMS
  } as IRoomAction;
};

export const setIsWriteable = (isWriteable: boolean) => {
  return {
    isWriteable,
    type: SET_IS_WRITEABLE
  } as IRoomAction;
};

export const fetchRooms = (skip: number = 0, limit: number = 30) => (
  dispatch: any
) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms?skip=${skip}&limit=${limit}`)
    .then(res => {
      if (!res.data) return;
      console.log("room 데이터", res.data);
      const rooms: Array<Room> = res.data.message as Array<Room>;

      return dispatch(setRooms(rooms));
    })
    .catch(err => {
      console.log(err.response);
      const rooms: Array<Room> = new Array<Room>(newRoom());

      return dispatch(setRooms(rooms));
    });
};

export const fetchIsWriteable = (userId: number, roomId: string) => (
  dispatch: any
) => {
  // 유저id값이 초기값이 들어오면 바로 리턴
  if (userId === 0) return;

  axios
    .get(
      `${
        config.REACT_APP_SERVER_URL
      }/api/rooms/writeable?roomId=${roomId}&userId=${userId}`
    )
    .then(res => {
      if (!res.data) return;
      const isWriteable: boolean = res.data.message[0].writeable;
      if (!isWriteable) return;
      return dispatch(setIsWriteable(isWriteable));
    })
    .catch(err => {
      console.log(err);
      // TODO: 중복처리
      return dispatch(setIsWriteable(false));
    });
};
