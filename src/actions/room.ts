import { Room, newRoom } from "../models";
import config from "../config";
import axios from "axios";
import axiosConfig from "../config/axios";

export const SET_ROOM_TOTAL = "SET_ROOM_TOTAL";
export const SET_ROOMS = "SET_ROOMS";
export const SET_IS_WRITEABLE = "SET_IS_WRITEABLE";
export const SET_ROOM_AVAILABLE_SLOT = "SET_ROOM_AVAILABLE_SLOT";
export const SET_ROOM_SPACE_LIMITATION = "SET_ROOM_SPACE_LIMITATION";
export const SET_ROOM_IS_LIKE ="SET_ROOM_IS_LIKE";

export interface IRoomAction {
  type: string;
  rooms: Array<Room>;
  isWriteable: boolean;
  total: number;
  slot: number;
  limit: number;
  isLike: boolean;
}

export const setRoomIsLike = (isLike: boolean) => {
  return {
    isLike,
    type: SET_ROOM_IS_LIKE
  } as IRoomAction;
};

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

export const setRoomSpaceLimitaion = (limit: number) => {
  return {
    limit,
    type: SET_ROOM_SPACE_LIMITATION
  } as IRoomAction
}

export const fetchRoomIsLike = (roomId: string, userId: number) => (dispatch: any) => {
  axios.get(`${config.REACT_APP_SERVER_URL}/api/rooms/isLike?roomId=${roomId}&userId=${userId}`)
  .then(res => {
    const isLike = res.data.message.isLike;
    return dispatch(setRoomIsLike(isLike));
  })
  .catch(err => {
    console.log(err.response);
    return dispatch(setRoomIsLike(false));
  })
}

export const postRoomIsLike = (roomId: string, userId: number, isLike: boolean) => (dispatch: any) => {
  const body = {
    roomId,
    userId,
    isLike
  }
  axios.post(`${config.REACT_APP_SERVER_URL}/api/rooms/like`, body)
  .then(res => {
    return dispatch(setRoomIsLike(isLike));
  })
  .catch(err => {
    console.log(err.response);
    return dispatch(setRoomIsLike(false));
  })
}

export const fetchRoomSpaceLimitaion = (roomId: string) => (dispatch: any) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms/limit?roomId=${roomId}`)
    .then(res => {
      if (!res.data) return;
      const limit = res.data.message
      return dispatch(setRoomSpaceLimitaion(limit));
    })
    .catch(err => {
      console.log(err.response);
      return dispatch(setRoomSpaceLimitaion(0));
    });
};

export const fetchRooms = (skip: number = 0, limit: number = 30) => (
  dispatch: any
) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms?skip=${skip}&limit=${limit}`)
    .then(res => {
      if (!res.data) return;
      const rooms: Array<Room> = res.data.message as Array<Room>;

      return dispatch(setRooms(rooms));
    })
    .catch(err => {
      console.log(err.response);
      const rooms: Array<Room> = new Array<Room>(newRoom());

      return dispatch(setRooms(rooms));
    });
};

export const fetchIsWriteable = (roomId: string, userId: number) => (dispatch: any) => {
  if (!roomId) return console.log("roomId가 undefined", roomId);

  axios
    .get(
      `${config.REACT_APP_SERVER_URL}/api/rooms/writeable?roomId=${roomId}&userId=${userId}`,
      axiosConfig
    )
    .then(res => {
      if (!res.data) return;
      const isWriteable: boolean = res.data.message;
      return dispatch(setIsWriteable(isWriteable));
    })
    .catch(err => {
      return dispatch(setIsWriteable(false));
    });
};

export const setRoomTotal = (total: number) => {
  return {
    total,
    type: SET_ROOM_TOTAL
  } as IRoomAction;
};

export const setRoomAvailableSlot = (slot: number) => {
  return {
    slot,
    type: SET_ROOM_AVAILABLE_SLOT
  } as IRoomAction;
};

export const fetchRoomAvailableSlot = (roomId: string) => (dispatch: any) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms/slot?roomId=${roomId}`)
    .then(res => {
      if (!res.data) return;
      const slot: number = res.data.message.slot;
      return dispatch(setRoomAvailableSlot(slot));
    })
    .catch(err => {
      console.log(err.response);

      return dispatch(setRoomAvailableSlot(0));
    });
};

export const fetchRoomTotal = () => (dispatch: any) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/api/rooms/total`)
    .then(res => {
      if (!res.data) return;
      const total: number = res.data.message[0].total;

      return dispatch(setRoomTotal(total));
    })
    .catch(err => {
      console.log(err.response);

      return dispatch(setRoomTotal(0));
    });
};
