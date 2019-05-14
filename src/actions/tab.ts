export const SET_TAB_PAGE_NUMBER = "SET_TAB_PAGE_NUMBER";

export interface ITabAction {
  type: string;
  pageNumber: number;
}

export const setPageNumber = (pageNumber: number) => {
  return {
    pageNumber,
    type: SET_TAB_PAGE_NUMBER
  } as ITabAction;
};
