import { IPasswordAction, SET_PASSWORD, SHOW_PASSWORD } from "../actions";

export interface IPasswordState {
    password: string;
    passwordVisibility: boolean;
    isPasswordError: boolean;
}

const createEmpty = () => ({
    password: "",
    passwordVisibility: false,
    isPasswordError: false,
});

export const passwordReducer = (state = createEmpty(), action: IPasswordAction) => {
    switch (action.type) {
        case SET_PASSWORD: {
            return {
                password: action.password,
                passwordVisibility: state.passwordVisibility,
                isPasswordError: !validatePassword(action.password),
            } as IPasswordState;
        }

        case SHOW_PASSWORD: {
            return {
                password: state.password,
                passwordVisibility: action.passwordVisibility,
                isPasswordError: state.isPasswordError,
            } as IPasswordState;
        }

        default:
            return state;
    }
};

const validatePassword = (password: string):boolean => {
    if (password.length <= 0 ) {
        return true;
    }
    if (password.length >= 6 && password.length <= 15) {
        return true;
    }
    return false;
}
