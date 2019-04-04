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
  writerLimit: "",
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
        desc: action.desc,
        title: state.title,
        writerLimit: state.writerLimit
      } as ICreateRoomState;
    }
    case SET_TITLE: {
      return {
        title: action.title,
        desc: state.desc,
        writerLimit: state.writerLimit
      } as ICreateRoomState;
    }
    case SET_WRITER_LIMIT: {
      return {
        writerLimit: action.writerLimit,
        desc: state.desc,
        title: state.title
      } as ICreateRoomState;
    }

    default:
      return state;
  }
};
