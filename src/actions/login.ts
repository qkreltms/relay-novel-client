export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";

export interface ILoginAction {
    isLoggedIn: boolean;
    type: string;
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {
        isLoggedIn,
        type: SET_IS_LOGGED_IN,
    } as ILoginAction;
};
