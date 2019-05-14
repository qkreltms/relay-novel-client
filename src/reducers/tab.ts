import { ITabAction, SET_TAB_PAGE_NUMBER } from "../actions";

export interface ITabState {
  pageNumber: number;
}

const createEmpty = () => ({
  pageNumber: 0
});

export const tabReducer = (state = createEmpty(), action: ITabAction) => {
  switch (action.type) {
    case SET_TAB_PAGE_NUMBER: {
      return {
        pageNumber: action.pageNumber
      } as ITabState;
    }

    default:
      return state;
  }
};
