import {
  SET_CREATEROOM_DESC,
  SET_CREATEROOM_TITLE,
  SET_CREATEROOM_WRITERLIMIT,
  SET_CREATEROOM_GENRE,
  SET_CREATEROOM_COVERIMAGE,
  SET_CREATEROOM_TAGS,
  ICreateRoomAction,
  INIT_CREATEROOM_STATE
} from "../actions";

export interface ICreateRoomState {
  writerLimit: string;
  title: string;
  desc: string;
  genre: string;
  tags: string;
  coverImage: string;
}

const createEmpty = () => ({
  writerLimit: "100",
  title: "",
  desc: "",
  genre: "",
  tags: "",
  coverImage: ""
});

export const createRoomReducer = (
  state = createEmpty(),
  action: ICreateRoomAction
) => {
  switch (action.type) {
    case SET_CREATEROOM_DESC: {
      return {
        ...state,
        desc: action.desc
      } as ICreateRoomState;
    }
    case SET_CREATEROOM_TITLE: {
      return {
        ...state,
        title: action.title
      } as ICreateRoomState;
    }
    case SET_CREATEROOM_WRITERLIMIT: {
      return {
        ...state,
        writerLimit: action.writerLimit
      } as ICreateRoomState;
    }

    case SET_CREATEROOM_TAGS: {
      return {
        ...state,
        tags: action.tags
      } as ICreateRoomState;
    }

    case SET_CREATEROOM_GENRE: {
      return {
        ...state,
        genre: action.genre
      } as ICreateRoomState;
    }

    case SET_CREATEROOM_COVERIMAGE: {
      return {
        ...state,
        coverImage: action.coverImage
      }
    }
    case INIT_CREATEROOM_STATE: {
      return createEmpty();
    }
    default:
      return state;
  }
};
