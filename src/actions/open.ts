export const SET_OPEN = "SET_OPEN";

export interface IOpenAction {
  isDialogOpen: boolean;
  type: string;
}

export const setIsDialogOpen = (isDialogOpen: boolean) => {
  return {
    isDialogOpen,
    type: SET_OPEN
  } as IOpenAction;
};
