export const SET_SOCKET = "SET_SOCKET";

export interface ISocketAction {
  socket: any;
  type: string;
}

export const setSocket = (socket: any) => {
  return {
    socket,
    type: SET_SOCKET
  } as ISocketAction;
};
