import { IOpenAction, SET_OPEN } from "../actions";

export interface IOpenState {
  isDialogOpen: boolean;
}

const createEmpty = () => ({
  isDialogOpen: false
});

export const openReducer = (state = createEmpty(), action: IOpenAction) => {
  switch (action.type) {
    case SET_OPEN: {
      return {
        isDialogOpen: action.isDialogOpen
      } as IOpenState;
    }

    default:
      return state;
  }
};
