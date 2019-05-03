export const SET_CREATEROOM_WRITERLIMIT = "SET_CREATEROOM_WRITERLIMIT";
export const SET_CREATEROOM_TITLE = "SET_CREATEROOM_TITLE";
export const SET_CREATEROOM_DESC = "SET_CREATEROOM_DESC";
export const SET_CREATEROOM_TAGS = "SET_CREATEROOM_TAGS";
export const SET_CREATEROOM_GENRE = "SET_CREATEROOM_GENRE";
export const SET_CREATEROOM_COVERIMAGE = "SET_CREATEROOM_COVERIMAGE";
export const INIT_CREATEROOM_STATE = "INIT_CREATEROOM_STATE";
export const SET_CREATEROOM_TITLE_ERROR = "SET_CREATEROOM_TITLE_ERROR";
export const SET_CREATEROOM_GENRE_ERROR = "SET_CREATEROOM_GENRE_ERROR";

export interface ICreateRoomAction {
  writerLimit: string;
  title: string;
  desc: string;
  type: string;
  genre: string;
  tags: string;
  coverImage: string;
  isTitleError: boolean;
  isGenreError: boolean;
}

export const setIsTitleError = (isTitleError: boolean) => {
  return {
    isTitleError,
    type: SET_CREATEROOM_TITLE_ERROR
  } as ICreateRoomAction;
}

export const setIsGenreError = (isGenreError: boolean) => {
  return {
    isGenreError,
    type: SET_CREATEROOM_GENRE_ERROR
  } as ICreateRoomAction;
}

export const initCreateRoomState = () => {
  return {
    type: INIT_CREATEROOM_STATE
  } as ICreateRoomAction;
}

export const setCreateRoomWriterLimit = (writerLimit: string) => {
  return {
    writerLimit,
    type: SET_CREATEROOM_WRITERLIMIT
  } as ICreateRoomAction;
};

export const setCreateRoomTitle = (title: string) => {
  return {
    title,
    type: SET_CREATEROOM_TITLE
  } as ICreateRoomAction;
};

export const setCreateRoomDesc = (desc: string) => {
  return {
    desc,
    type: SET_CREATEROOM_DESC
  } as ICreateRoomAction;
};
export const setCreateRoomCoverImage = (coverImage: string) => {
  return {
    coverImage,
    type: SET_CREATEROOM_COVERIMAGE
  } as ICreateRoomAction;
};

export const setCreateRoomGenre = (genre: string) => {
  return {
    genre,
    type: SET_CREATEROOM_GENRE
  } as ICreateRoomAction;
};

export const setCreateRoomTags = (tags: string) => {
  return {
    tags,
    type: SET_CREATEROOM_TAGS
  } as ICreateRoomAction;
};
