export const SET_WRITER_LIMIT = "SET_WRITER_LIMIT";
export const SET_TITLE = "SET_TITLE";
export const SET_DESC = "SET_DESC";

export interface ICreateRoomAction {
  writerLimit: string;
  title: string;
  desc: string;
  type: string;
}

export const setWriterLimit = (writerLimit: string) => {
  return {
    writerLimit,
    type: SET_WRITER_LIMIT
  } as ICreateRoomAction;
};

export const setTitle = (title: string) => {
  return {
    title,
    type: SET_TITLE
  } as ICreateRoomAction;
};

export const setDesc = (desc: string) => {
  return {
    desc,
    type: SET_DESC
  } as ICreateRoomAction;
};
