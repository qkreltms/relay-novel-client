import { ISocketAction, SET_SOCKET } from "../actions";

export interface ISocketState {
  socket: any;
}

const createEmpty = () => ({
  socket: null
});

export const socketReducer = (state = createEmpty(), action: ISocketAction) => {
  switch (action.type) {
    case SET_SOCKET: {
      return {
        socket: action.socket
      } as ISocketState;
    }

    default:
      return state;
  }
};
