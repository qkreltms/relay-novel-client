import {
  SET_DESC,
  SET_TITLE,
  SET_WRITER_LIMIT,
  ICreateRoomAction
} from "../actions";

export interface ICreateRoomState {
  writerLimit: string;
  title: string;
  desc: string;
}

const createEmpty = () => ({
  writerLimit: "100",
  title: "",
  desc: ""
});

export const createRoomReducer = (
  state = createEmpty(),
  action: ICreateRoomAction
) => {
  switch (action.type) {
    case SET_DESC: {
      return {
        ...state,
        desc: action.desc
      } as ICreateRoomState;
    }
    case SET_TITLE: {
      return {
        ...state,
        title: action.title
      } as ICreateRoomState;
    }
    case SET_WRITER_LIMIT: {
      return {
        ...state,
        writerLimit: action.writerLimit
      } as ICreateRoomState;
    }

    default:
      return state;
  }
};
