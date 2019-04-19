import { Room, newRoom } from "../models";
import config from "../config";
import axios from "axios";
import axiosConfig from "../config/axios";

export const SET_ROOM_TOTAL = "SET_ROOM_TOTAL";
export const SET_ROOMS = "SET_ROOMS";
export const SET_IS_WRITEABLE = "SET_IS_WRITEABLE";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
  isWriteable: boolean;
  total: number;
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

export const fetchIsWriteable = (roomId: string) => (
  dispatch: any
) => {
  if (!roomId) return console.log("roomId가 undefined", roomId);

  axios
    .get(
      `${
        config.REACT_APP_SERVER_URL
      }/api/rooms/writeable?roomId=${roomId}`,
      axiosConfig
    )
    .then(res => {
      if (!res.data) return;
      const isWriteable: boolean = res.data.message[0].writeable
      if (!isWriteable) return;
      return dispatch(setIsWriteable(isWriteable));
    })
    .catch(err => {
      console.log(err);
      // TODO: 참가하지 않았을 때의 예외 처리
      return dispatch(setIsWriteable(false));
    });
};

export const setRoomTotal = (total: number) => {
  return {
    total,
    type: SET_ROOM_TOTAL
  } as IRoomAction;
};

export const fetchRoomTotal = () => (dispatch: any) => {
  axios
    .get(
      `${
        config.REACT_APP_SERVER_URL
      }/api/rooms/total`
    )
    .then(res => {
      if (!res.data) return;
      const total: number = res.data.message[0].total;

      return dispatch(setRoomTotal(total));
    })
    .catch(err => {
      console.log(err.response);

      return dispatch(setRoomTotal(0));
    });
}
