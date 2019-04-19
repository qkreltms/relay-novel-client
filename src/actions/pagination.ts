export const SET_OFFSET = "SET_OFFSET";

export interface IPaginationAction {
  offset: number;
  total: number;
  type: string;
}

export const setOffset = (offset: number) => {
  return {
    offset,
    type: SET_OFFSET
  } as IPaginationAction;
};

