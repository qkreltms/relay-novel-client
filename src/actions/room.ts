import { Room, newRoom } from "../models";
import config from "../config";
import axios from "axios";

export const FETCH_ROOMS = "FETCH_ROOMS";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
}

const handleRoomCompleted = (rooms: Array<Room>, type: string) => {
  return {
    rooms,
    type
  } as IRoomAction;
};

export const fetchRooms = (skip: number, limit: number) => (dispatch: any) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/rooms?skip=${skip}&limit=${limit}`)
    .then(res => {
      console.log("room 데이터 받아옴");
      console.log(res.data);
      const rooms: Array<Room> = res.data.message as Array<Room>;

      return dispatch(handleRoomCompleted(rooms, FETCH_ROOMS));
    })
    .catch(err => {
      console.log(err.response);
      const rooms = new Array<Room>(newRoom());

      return dispatch(handleRoomCompleted(rooms, FETCH_ROOMS));
    });
};
