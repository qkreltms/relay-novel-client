export const SET_OPEN = "SET_OPEN";

export interface IOpenAction {
    isOpen: boolean;
    type: string;
}

export const setIsOpen = (isOpen: boolean) => {
    return {
        isOpen,
        type: SET_OPEN,
    } as IOpenAction;
};
