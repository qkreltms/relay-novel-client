import { Room, newRoom } from "../models";
import config from "../config";
import axios from "axios";

export const FETCH_ROOMS = "FETCH_ROOMS";
export const SET_ROOMS = "SET_ROOMS";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
}

const handleRoomFetchCompleted = (rooms: Array<Room>, type: string) => {
  return {
    rooms,
    type
  } as IRoomAction;
};

export const setRooms = (rooms: Array<Room>) => {
  return {
    rooms,
    type: SET_ROOMS
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

      return dispatch(handleRoomFetchCompleted(rooms, FETCH_ROOMS));
    })
    .catch(err => {
      console.log(err.response);
      const rooms: Array<Room> = new Array<Room>(newRoom());

      return dispatch(handleRoomFetchCompleted(rooms, FETCH_ROOMS));
    });
};
