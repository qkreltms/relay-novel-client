import { IPaginationAction, SET_OFFSET } from "../actions";

export interface IPaginationState {
  offset: number;
}

const createEmpty = () => ({
  offset: 0
} as IPaginationState);

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

    default:
      return state;
  }
};
