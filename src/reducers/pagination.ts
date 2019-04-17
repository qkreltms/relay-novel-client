import { IPaginationAction, SET_OFFSET, SET_NOVEL_TOTAL } from "../actions";

export interface IPaginationState {
  offset: number;
  total: number;
}

const createEmpty = () => ({
  offset: 0,
  total: 0
});

export const paginationReducer = (
  state = createEmpty(),
  action: IPaginationAction
) => {
  switch (action.type) {
    case SET_OFFSET: {
      return {
        ...state,
        offset: action.offset
      } as IPaginationState;
    }

    case SET_NOVEL_TOTAL: {
      return {
        ...state,
        total: action.total
      } as IPaginationState;
    }

    default:
      return state;
  }
};
