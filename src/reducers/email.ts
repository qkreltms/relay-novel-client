import { IEmailAction, SET_EMAIL } from "../actions";

export interface IEmailState {
    email: string;
    isEmailError: boolean;
}

const createEmpty = () => ({
    email: "",
    isEmailError: false,
});

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const emailReducer = (state = createEmpty(), action: IEmailAction) => {
    switch (action.type) {
        case SET_EMAIL: {
            return {
                email: action.email,
                isEmailError: !validateEmail(action.email),
            } as IEmailState;
        }

        default:
            return state;
    }
};

const validateEmail = (email: string):boolean => {
    if (emailRegex.test(email)) {
        return true;
    }

    return false;
}
