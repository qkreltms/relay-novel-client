import { IOpenAction, SET_OPEN } from "../actions";

export interface IOpenState {
  isOpen: boolean;
}

const createEmpty = () => ({
  isOpen: false
});

export const openReducer = (state = createEmpty(), action: IOpenAction) => {
  switch (action.type) {
    case SET_OPEN: {
      return {
        isOpen: action.isOpen
      } as IOpenState;
    }

    default:
      return state;
  }
};
