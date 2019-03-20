import { IPasswordAction, SET_PASSWORD, SHOW_PASSWORD } from "../actions";

export interface IPasswordState {
    password: string;
    passwordVisibility: boolean;
}

const createEmpty = () => ({
    password: "",
    passwordVisibility: false,
});

export const passwordReducer = (state = createEmpty(), action: IPasswordAction) => {
    switch (action.type) {
        case SET_PASSWORD: {
            return {
                password: action.password,
                passwordVisibility: state.passwordVisibility,
            } as IPasswordState;
        }

        case SHOW_PASSWORD: {
            return {
                password: state.password,
                passwordVisibility: action.passwordVisibility,
            } as IPasswordState;
        }

        default:
            return state;
    }
};
