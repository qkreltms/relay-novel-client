import { SET_IS_LOGGED_IN, ILoginAction } from "../actions";

export interface ILoginState {
    isLoggedIn: boolean;
}

const createEmpty = () => ({
    isLoggedIn: false,
});

export const loginReducer = (state = createEmpty(), action: ILoginAction) => {
    switch (action.type) {
        case SET_IS_LOGGED_IN: {
            return {
                isLoggedIn: action.isLoggedIn,
            } as ILoginState;
        }

        default:
            return state;
    }
};
